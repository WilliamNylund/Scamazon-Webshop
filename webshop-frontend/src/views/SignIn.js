import { Container, Form, Button, Alert } from "react-bootstrap";
import Header from "../components/Header";
import { useState, setState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    let request = axios.post("http://127.0.0.1:8000/api/token/login/", { email: email, password: password });
    request.then((res) => {
      const token = res.data.auth_token;
      localStorage.setItem("token", token);
      navigate("/shop");
    });
    request.catch((e) => {
      setErrorMsg('Unable to log in with provided credentials')
      // TODO please try again or reset password?
    });
  };

  return (
    <Container className="sign-up justify-content-md-center">
      <Header text="Sign in" />
      {errorMsg && (
      <Alert  variant='danger'>
        {errorMsg}
      </Alert>
      )}
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={updateEmail}
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
        <Button variant="primary" onClick={() => handleSubmit()}>
          Sign in!
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
