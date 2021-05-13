var express = require("express");
var app = express();
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
var pool;
dotenv.config();

var port = process.env.PORT || 5000;

var whitelist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = { origin: true };
	} else {
		corsOptions = { origin: false };
	}
	callback(null, corsOptions);
};

// const buildPath = path.join(__dirname, "/client/build/");
// app.use(express.static(buildPath));
app.use(cors());
app.use(express.json());

if (process.env.ENVIRONMENT == "production") {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
} else {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
}

pool.on("error", (err, client) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

app.post("/api/users", cors(corsOptionsDelegate), function (req, res) {
	pool.connect((err, client, release) => {
		if (err) res.status(400).send("Error connecting to the database");
		client
			.query("SELECT * from users WHERE username=$1 AND password=$2", [
				req.body.username,
				req.body.password,
			])
			.then((response) => {
				release();
				let user = response.rows;

				if (user.length) {
					let token_payload = {
						name: user[0].username,
						password: user[0].password,
					};
					let token = jwt.sign(token_payload, "jwt_secret_password", {
						expiresIn: "2h",
					});
					let response = {
						message: "Token Created, Authentication Successful!",
						token: token,
						username: user[0].username,
					};

					res.status(200).send(response);
				} else {
					res.status(403).send("Authentication failed.");
				}
			})
			.catch((e) => {
				release();
				res.status(400).send(e);
			});
	});
});

app.post("/api/user", cors(corsOptionsDelegate), function (req, res) {
	pool.connect((err, client, release) => {
		if (err) res.status(400).send("Error connecting to the database");
		client
			.query(
				"INSERT INTO users(username, password, created_at) VALUES($1, $2, $3) RETURNING *",
				[req.body.username, req.body.password, req.body.created_at]
			)
			.then((response) => {
				release();
				res.status(200).send(response.rows);
			})
			.catch((e) => {
				release();
				res.status(400).send(e);
			});
	});
});

app.get(
	"/api/test",
	cors(corsOptionsDelegate),
	middleware,
	function (req, res) {
		pool.connect((err, client, release) => {
			if (err) res.status(400).send("Error connecting to the database");
			client
				.query("SELECT * from users")
				.then((response) => {
					release();
					res.status(200).send(response.rows);
				})
				.catch((e) => {
					release();
					res.status(400).send(e);
				});
		});
	}
);

// app.get("*", function (req, res) {
// 	res.sendFile("index.html", {
// 		root: path.join(buildPath),
// 	});
// });

app.listen(port, function () {
	console.log("App listening on port " + port);
});
