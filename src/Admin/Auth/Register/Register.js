import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {  useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../config/firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../redux/actionCreators/authActionCreators";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass || !fullName || !confirmPass)
      return toast.info("Please fill All Fields");

    if (pass.length < 8)
      return toast.info("Password must have 8 characters or greater");

    if (pass !== confirmPass) return toast.info("Passwords do not match");

    // register user
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: fullName,
          })
          .then(() => {
            const user = auth.currentUser;
            //add data to redux

            const data = {
              user: user.providerData[0],
              id: user.uid,
            };

            dispatch(loginUser(data));
            toast.success("Registered Successfully");
            history.push("/admin/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <h1>REGISTER USER</h1>
      </Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullNameBasicForm" className="my-2">
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group controlId="fullConfirmPasswordBasicForm" className="my-2">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fullSubmitBasicForm" className="mt-5">
            <Button type="submit" variant="secondary" className="form-control">
              Register
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Container>
  );
};

export default Register;
