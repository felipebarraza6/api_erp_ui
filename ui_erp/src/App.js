// React
import React from "react";

// Auth Reducers
import { login_reducer } from "./reducers/auth.js";

// Containers
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./components/errors/NotFound.js";
import Lifting from "./containers/Lifting.js";
import { useLocation, Route, Switch } from "react-router-dom";
import { Card } from "antd";

// Create Contexts
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  access_token: null,
  user: null,
};

function App() {
  let location = useLocation();
  const [state, dispatch] = React.useReducer(login_reducer, initialState);

  React.useEffect(() => {
    const access_token = JSON.parse(
      localStorage.getItem("access_token") || null
    );
    const user = JSON.parse(localStorage.getItem("user") || null);

    if (user && access_token) {
      dispatch({
        type: "LOGIN",
        payload: {
          access_token,
          user,
        },
      });
    }
  }, [location]);

  const RenderLifting = () => {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/liftings/external"
            component={() => <Lifting is_external={true} />}
          />
          <Route
            exact
            path="/liftings/internal"
            component={() => <Lifting is_external={false} />}
          />
          <Route
            path="*"
            component={() => (
              <Card style={{ margin: "20px" }}>
                <NotFound is_external={true} />
              </Card>
            )}
          />
        </Switch>
      </>
    );
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {location.pathname.slice(0, 9) === "/liftings" ? (
        <RenderLifting />
      ) : !state.isAuthenticated ? (
        <Login />
      ) : (
        <Home />
      )}
    </AuthContext.Provider>
  );
}

export default App;
