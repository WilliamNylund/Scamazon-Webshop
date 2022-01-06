import Navbar from 'react-bootstrap/Navbar';
import { Container, Button, Dropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import ConfirmationModal from './Modals/ConfirmationModal';
import CartOffcanvas from './CartOffcanvas';
import { BsCart2, BsGearFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const NavbarComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const signOut = () => {
    setUser(null);
    removeServerToken();
    localStorage.removeItem('token');
    setShowConfirmation(false);
    navigate('/shop');
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
            />{' '}
            Scamazon
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text>
                Welcome, <strong>{user.username}</strong>
              </Navbar.Text>

              <Dropdown align={{ xs: 'start' }}>
                <Dropdown.Toggle
                  className="bg-dark border-0 p-0"
                  id="dropdown-basic">
                  <IconContext.Provider
                    value={{ color: '#00704A', size: '1.5em' }}>
                    <BsGearFill className="clickable button-group" />
                  </IconContext.Provider>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      navigate('/myitems');
                    }}>
                    My items
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      navigate('/account');
                    }}>
                    Reset password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleShowConfirmation}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <IconContext.Provider value={{ color: '#00704A', size: '1.5em' }}>
                <BsCart2
                  className="clickable button-group"
                  onClick={handleShowCart}
                />
              </IconContext.Provider>
            </>
          ) : (
            <>
              <Link to="/signup" className="pr-2">
                <Button
                  className="button-group"
                  variant="outline-primary"
                  size="sm">
                  Sign up
                </Button>
              </Link>

              <Link to="/signin" className="pl-2">
                <Button
                  className="button-group"
                  variant="outline-primary"
                  size="sm">
                  Sign in
                </Button>
              </Link>
            </>
          )}
          <CartOffcanvas show={showCart} handleClose={handleCloseCart} />
        </Navbar.Collapse>
      </Container>
      <ConfirmationModal
        handleConfirm={signOut}
        show={showConfirmation}
        handleClose={handleCloseConfirmation}
        text={'Are you sure you wanna sign out?'}
      />
    </Navbar>
  );
};
export default NavbarComponent;

const removeServerToken = async () => {
  const token = localStorage.getItem('token');
  axios
    .post(
      'http://127.0.0.1:8000/api/token/logout/',
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log('user logged out succesfully');
    })
    .catch((e) => {
      console.log('Couldnt find user');
    });
};
//8f1597b46769e81ffd3884f19104c10d8e7f8594
