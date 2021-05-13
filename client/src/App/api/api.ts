import Token from "../types/token";
import User from "../types/user";

export default {
  loginUser: (
    username: User["username"],
    password: User["password"]
  ): Promise<Token> => {
    return fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(function (data) {
        let token: Token = {
          username: data.username,
          token: data.token,
        };

        return Promise.resolve(token);
      })
      .catch((err) => Promise.reject("Authentication Failed!"));
  },
  registerUser: (user: User): Promise<User> => {
    return fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({
        fullname: user.fullname,
        username: user.username,
        password: user.password,
        created_at: new Date().toUTCString(),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(function (data) {
        return Promise.resolve(data);
      })
      .catch((err) => Promise.reject("Register Failed!"));
  },
  isAuthenticated: (): boolean => {
    let token = localStorage.getItem("x-access-token") ? true : false;
    let expiresIn =
      parseInt(localStorage.getItem("x-access-token-expiration") || "") >
      Date.now();

    return token && expiresIn;
  },
};
