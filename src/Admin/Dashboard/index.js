import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Register from "../Auth/Register/Register";
import NavbarComponent from "./NavBar/NavbarComponent";
import ManagePost from "./ManagePost/ManagePost";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    auth.signOut();
    dispatch(logoutUser());
    toast.success("Logged out Successfully");
    history.push("/admin/login");
  };

  return (
    <div>
      <NavbarComponent />
      <div className="main">
        <Switch>
          <Route exact path={path}>
            <h1>DASHBOARD ADMIN</h1>
            <button type="button" onClick={logout}>
              LOGOUT
            </button>
            <Link to="/admin/dashboard/adduser">Add User</Link>
          </Route>
          <Route
            path={path + "/manage-post"}
            component={() => <ManagePost /> }
          />
          <Route path={path + "/adduser"} component={() => <Register />} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
