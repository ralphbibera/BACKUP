import { Container, Col, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../Stylesheets/Post.css";
import CommentForm from "./CommentForm";

const Post = () => {
  const { postId } = useParams();

  const { isLoading, posts } = useSelector(
    (state) => ({ isLoading: state.post.isLoading, posts: state.post.posts }),
    shallowEqual
  );

  const currentPost =
    posts.length > 0 && posts.find((pst) => pst.postId === postId);

  if (isLoading) {
    return <div>Loading Post</div>;
  }

  if (!isLoading && currentPost === undefined) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>NO POST FOUND</h1>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div className="main_body">
      <div className="content-container-1">
        <h1 className="content-title" style={{ fontStyle: "5vw" }}>
          {currentPost.postData.title}
        </h1>
        <p className="content-author-date" style={{ fontStyle: "1vw" }}>
          By {currentPost.postData.author} |{" "}
          {new Date(
            currentPost.postData.date.seconds * 1000
          ).toLocaleDateString("en-US", { timeZone: "UTC" })}
        </p>
        <img src={currentPost.postData.image} />
        <p className="content-paragraph" style={{ fontStyle: "3vw" }}>
          {currentPost.postData.description}
        </p>
        <CommentForm/>
      </div>
    </div>
  );
};

export default Post;
