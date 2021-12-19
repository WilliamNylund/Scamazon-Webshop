import { Container, Form, Button, Alert } from "react-bootstrap";
import Header from "../components/Header";
import { useState, setState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [userCreated, setUserCreated] = useState(false);

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRePassword = (e) => setRePassword(e.target.value);

  const handleSubmit = () => {
    let request = axios.post("http://127.0.0.1:8000/api/users/", {
      email: email,
      username: username,
      password: password,
      re_password: rePassword,
    });
    request.then((res) => {
      setUserCreated(true);
    });
    request.catch((e) => {
      setErrorMsg("Unable to register");
      // TODO please try again or reset password?
    });
  };

  return (
    <Container className="sign-up justify-content-md-center">
      <Header text="Sign up" />
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {userCreated ? (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>
            Welcome {username}, please proceed to sign in.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link to="/signin">
              <Button variant="primary">Sign in</Button>
            </Link>
          </div>
        </Alert>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={updateEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              onChange={updateUsername}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={updatePassword}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Retype password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="rePassword"
              onChange={updateRePassword}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Sign up!
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default SignUp;
