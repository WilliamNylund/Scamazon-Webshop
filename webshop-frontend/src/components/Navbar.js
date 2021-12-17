import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';

const NavbarComponent = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("checking for token");
    console.log(token);
    if (token) {
      setToken(token)
    }
    console.log(token);
  })

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
            Scamazon
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
