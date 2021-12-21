import { Container, Form, Button, Alert } from "react-bootstrap";
import Header from "../components/Header";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    axios
      .post("http://127.0.0.1:8000/api/token/login/", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        const token = res.data.auth_token;
        localStorage.setItem("token", token);
        const userResponse = await getUser()
        setUser(userResponse.data);
        navigate("/shop");
      })
      .catch((e) => {
        setErrorMsg("Unable to sign in with provided credentials");
        // TODO please try again or reset password?
      });
  };

  return (
    <Container className="form-input justify-content-md-center">
      <Header text="Sign in" />
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
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
        <Button variant="primary" onClick={handleSubmit}>
          Sign in!
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;

const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("no token found");
  }

  const request = axios.get("http://127.0.0.1:8000/api/users/me", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return request;
};
