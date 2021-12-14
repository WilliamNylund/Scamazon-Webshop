import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Link to="/shop">
        <Navbar.Brand>
          <img
            alt="logo"
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
          /> William's inn
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Link to="/signup"><Button variant="outline-info">Sign up</Button></Link>
        <Link to="/signin"><Button variant="outline-info">Log in</Button></Link>
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>,
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;
