import { Container, Form, Button } from "react-bootstrap";
import Header from "../components/Header"
const SignIn = () => {
  return (
    <Container className="sign-up justify-content-md-center">
      <Header text="Sign in"/>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Sign in!
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
