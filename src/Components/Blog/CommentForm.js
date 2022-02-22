import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";

const CommentForm = () => {
  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <form>
      {isLoggedIn ? (
        <>
          <p>Leave a Comment</p>
          <div className="form-group">
            <textarea className="form-control" placeholder="Comment..." />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn btn-primary"
              value="Add Comment"
            />
          </div>
        </>
      ) : (
        <>
          <p>Leave a Comment</p>
          <div className="form-group d-flex">
            <input type="text" className="form-control" placeholder="Name" />
            <input type="text" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <textarea className="form-control" placeholder="Comment..." />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn btn-primary"
              value="Add Comment"
            />
          </div>
        </>
      )}
    </form>
  );
};

export default CommentForm;
