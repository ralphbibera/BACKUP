import "../../Stylesheets/table.css";
import { Button, Col, Form, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { shallowEqual, useDispatch } from "react-redux";
import {
  doPost,
  fetchPosts,
  setLoading,
} from "../../../redux/actionCreators/postActionCreators";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const AddPost = () => {
  const { user, userId } = useSelector(
    (state) => ({ user: state.auth.user, userId: state.auth.user_id }),
    shallowEqual
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description || !author) {
      return toast.warning("Please fill all fields");
    }

    if (!image || image === undefined) {
      return toast.warning("Please select an image");
    }

    if (description.length < 100) {
      return toast.warning("Description shout be at least 100 characters");
    }

    if (title.trim().split(" ").length < 2) {
      return toast.warning("Title at least 2 words");
    }

    if (image.size > 5242880) {
      return toast.warning("Max 5MB FOR IMAGE");
    }

    const data = {
      title: title,
      category: category.split(","),
      author: author,
      date: new Date(),
      description: description,
      image: "",
      comments: [],
      createdBy: userId,
    };

    dispatch(doPost(data, image, setProgress));
    dispatch(setLoading(true));
    history.push("/admin/dashboard/manage-post");
  };
  return (
    <div>
      <Col className="mx-auto">
        {progress > 0 && progress < 100 ? (
          <>
            <h1>Uploading Post {progress} %</h1>
            <ProgressBar now={progress} max={100} />
          </>
        ) : progress === 100 ? (
          <>
            <h1>Post Uploaded Successfully </h1>
          </>
        ) : (
          <Form onSubmit={handleSubmit} className="p-4">
            <Form.Group controlId="name" className="my-2">
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="categories" className="my-2">
              <Form.Control
                type="text"
                name="categories"
                placeholder="Categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="author" className="my-2">
              <Form.Control
                type="text"
                name="author"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="desc" className="my-2">
              <textarea
                name="desc"
                placeholder="Description"
                rows="10"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="file" className="my-2">
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="btn" className="my-2">
              <Button
                type="submit"
                variant={"dark"}
                bg="dark"
                className="form-control"
              >
                Add Post
              </Button>
            </Form.Group>
          </Form>
        )}
      </Col>
    </div>
  );
};

export default AddPost;
