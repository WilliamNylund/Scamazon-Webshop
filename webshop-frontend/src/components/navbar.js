import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import logo from "../assets/logo.png"
import registerModal from "./modals/registerModal";

const NavbarComponent = () => {
  
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logo"
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
          /> William's inn
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-info">Log in</Button>
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>,
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;
