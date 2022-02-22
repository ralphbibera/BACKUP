import "../../Stylesheets/table.css";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import AddPost from "./AddPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { fetchPosts } from "../../../redux/actionCreators/postActionCreators";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const ManagePost = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, posts } = useSelector(
    (state) => ({
      isLoading: state.post.isLoading,
      posts: state.post.posts,
      userId: state.auth.user_id,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchPosts());
    }
  }, [isLoading, dispatch]);

  const myPosts = posts;

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <div className="top-buttons container d-flex justify-content-between">
            <Link to="/admin/dashboard/manage-post/addpost">
              <button>New Post</button>
            </Link>
          </div>
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IMAGE</th>
                  <th>TITLE</th>
                  <th colSpan={2}>ACTIONS</th>
                </tr>
              </thead>
            </table>
            {isLoading ? (
              <h1 className="text-center my-5">Loading...</h1>
            ) : (
              myPosts.map((pst, index) => (
                <table key={index}>
                  <tbody style={{ fontsize: "15px" }}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Button onClick={()=> history.push('/blog/'+pst.postId)}>
                          <img id="post-img" src={pst.postData.image} />
                        </Button>
                      </td>
                      <td>{pst.postData.title}</td>
                      <td>
                        <Button className="action-buttons edit-btn">
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button className="action-buttons delete-btn">
                          Archive
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))
            )}
          </div>
        </Route>
        <Route path={path + "/addpost"}>
          <AddPost />
        </Route>
      </Switch>
    </div>
  );
};

export default ManagePost;
