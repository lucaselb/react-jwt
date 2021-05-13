import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import "./App.module.scss";
import { Stack, Link } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import api from "./api";

function App() {
  const [isAuth, setAuth] = useState<boolean>();

  useEffect(() => {
    const auth = api.isAuthenticated();
    setAuth(auth);
    if (!auth) clearLocalStorage();
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-access-token-expiration");
    localStorage.removeItem("username");
  };

  const logout = () => {
    clearLocalStorage();
    document.location.reload();
  };

  return (
    <Router>
      <Stack direction="column">
        <Stack
          direction="row"
          backgroundColor="#292b2c"
          spacing={5}
          padding={5}
          // align="center"
          justifyContent="space-between"
          color="white"
        >
          <Link href={"/"}>Home</Link>
          <Stack spacing={5} align="center" direction={["column", "row"]}>
            {!isAuth && (
              <Stack direction="row" spacing={5}>
                <Link href={"/login"}>Login</Link>
                <Link href={"/signup"}>Sign Up</Link>
              </Stack>
            )}
            {isAuth && (
              <Link href={"/"} onClick={logout}>
                Logout
              </Link>
            )}
          </Stack>
        </Stack>
        <Stack direction="column" h="100vh">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={() => (isAuth ? <Home /> : <Login />)}
            />
            <Route
              exact
              path="/signup"
              render={() => (isAuth ? <Home /> : <SignUp />)}
            />
          </Switch>
        </Stack>
      </Stack>
    </Router>
  );
}

export default App;
