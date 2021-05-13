import { Redirect, Route } from "react-router-dom";
import api from "./api";

export const PrivateRoute = ({
  component: Component,
  isAuth,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
