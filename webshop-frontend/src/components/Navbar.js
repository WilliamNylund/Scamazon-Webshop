import Navbar from "react-bootstrap/Navbar";
import { Container, Button, Modal } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import ConfirmationModal from "./Modals/ConfirmationModal";

const NavbarComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  

  const signOut = () => {
    setUser(null);
    removeServerToken();
    localStorage.removeItem("token");
    setShow(false)
    navigate("/shop");
  };

  useEffect(() => {}, []);

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
          {user ? (
            <>
              <Navbar.Text>
                Signed in as: <a href="#login">{user.username}</a>
              </Navbar.Text>

              <Button
                className="button-group"
                variant="outline-primary"
                size="sm"
                onClick={handleShow}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup" className="pr-2">
                <Button
                  className="button-group"
                  variant="outline-primary"
                  size="sm"
                >
                  Sign up
                </Button>
              </Link>

              <Link to="/signin" className="pl-2">
                <Button
                  className="button-group"
                  variant="outline-primary"
                  size="sm"
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
      <ConfirmationModal
        handleConfirm={signOut}
        show={show}
        handleClose={handleClose}
        text={"Are you sure you wanna sign out?"}
      />
    </Navbar>
  );
};
export default NavbarComponent;

const removeServerToken = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  axios
    .post(
      "http://127.0.0.1:8000/api/token/logout/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("user logged out succesfully");
    })
    .catch((e) => {
      console.log("Couldnt find user");
    });
};
//8f1597b46769e81ffd3884f19104c10d8e7f8594
