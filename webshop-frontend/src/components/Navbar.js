import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {useState} from 'react';

const NavbarComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand>
          <Link to="/shop">
            <img
              alt="logo"
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{" "}
            William's inn
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/signup" className="pr-2">
            <Button className="button-group" variant="outline-primary" size="sm">
              Sign up
            </Button>
          </Link>

          <Link to="/signin" className="pl-2">
            <Button className="button-group" variant="outline-primary" size="sm">
              Log in
            </Button>
          </Link>
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>,
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;
