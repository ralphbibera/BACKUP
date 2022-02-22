import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { auth } from "../config/firebase";
import { loginUser } from "../redux/actionCreators/authActionCreators";
import Login from "./Auth/Login/Login";
import Dashboard from "./Dashboard";

function Admin() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user == null) {
        //user is not loggedin
        history.push("/admin/login");
        return;
      }
      const data = {
        user: user.providerData[0],
        id: user.uid,
      };

      dispatch(loginUser(data));
      history.push("/admin/dashboard");
    });
  }, []);

  return (
    <Switch>
      <Route exact path={path} component={() => <h1>Admin Home Page</h1>} />
      <Route path={path + "/login"} component={() => <Login />} />
      <Route path={path + "/dashboard"} component={() => <Dashboard />} />
    </Switch>
  );
}

export default Admin;
