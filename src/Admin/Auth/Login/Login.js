import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../config/firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actionCreators/authActionCreators";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass) return toast.info("Please fill All Fields");

    if (pass.length < 8)
      return toast.info("Password must have 8 characters or greater");

    auth
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        const data = {
          user: user.user.providerData[0],
          id: user.user.uid,
        };

        dispatch(loginUser(data));
        toast.success("Loggedin Successfully");
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        toast.error("Invalid email or password");
      });
  };

  return (
    <Container>
      <Row>
        <h1>LOGIN</h1>
      </Row>
      <Col>
        <Form onSubmit={handleSubmit}>
      
          <Form.Group controlId="fullEmailBasicForm" className="my-2">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fullPasswordBasicForm" className="my-2">
            <Form.Control
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fullSubmitBasicForm" className="mt-5">
            <Button type="submit" variant="secondary" className="form-control">
              Login
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
