import { Button, Row, Col, Offcanvas, Alert } from 'react-bootstrap';
import { BsXLg } from 'react-icons/bs';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const CartOffcanvas = ({ show, handleClose }) => {
  const user = useContext(UserContext);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState('0');
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateCartTotal = () => {
    if (cart && Object.keys(cart).length > 0) {
      let priceTotal = 0;
      Object.keys(cart).map((id, i) => {
        priceTotal += parseFloat(cart[id].price);
      });

      setTotal(priceTotal.toFixed(2));
    } else {
      setTotal('0');
    }
  };

  const populateCart = async () => {
    let storageCart = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(storageCart);
  };

  const removeProduct = (productId) => {
    const storageCart = JSON.parse(localStorage.getItem('cart')) || {};
    delete storageCart[productId];
    localStorage.setItem('cart', JSON.stringify(storageCart));
    setCart(storageCart);
  };

  const emptyCart = () => {
    setCart({});
    localStorage.removeItem('cart');
  };

  const pay = () => {
    //const productIds = Object.keys(cart);
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://127.0.0.1:8000/api/orders/',
        { cart: cart },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setShowSuccess(true);
        window.setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        emptyCart();
      })
      .catch((e) => {
        if (e.response.status == 300) {
          addWarningLabels(e.response.data);
        } else {
          console.log(e.message);
        }
      });
  };

  const addWarningLabels = (warnings) => {
    let tempCart = JSON.parse(JSON.stringify(cart)); //Creating a deep copy of cart so that the component re-renders
    for (let id in warnings) {
      if (warnings[id].exists) {
        tempCart[id].warningText =
          'Price of this item has been updated from ' +
          tempCart[id].price +
          ' €';
        tempCart[id].price = warnings[id].new_price;
      } else {
        tempCart[id].warningText =
          'This item is no longer available, please remove from cart';
      }
    }
    localStorage.setItem('cart', JSON.stringify(tempCart));
    setCart(tempCart);
  };

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      onEntering={populateCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h3>Shopping Cart</h3>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {Object.keys(cart).length > 0 && (
          <Row>
            <Col xs={{ span: 4, offset: 6 }}>
              <Button variant="link" size="sm" onClick={emptyCart}>
                Remove all
              </Button>
            </Col>
          </Row>
        )}
        {Object.keys(cart).map((id, index) => (
          <>
            <Row className="shopping-cart-row">
              <Col xs="6">{cart[id].title}</Col>
              <Col xs="4">{cart[id].price} € </Col>
              <Col xs="2">
                <BsXLg
                  className="clickable"
                  onClick={() => removeProduct(id)}
                />
              </Col>
            </Row>
            <Row className="shopping-cart-line">
              <Col xs="12">{cart[id].warningText}</Col>
            </Row>
          </>
        ))}
        <Row className="shopping-cart-bottom-line">
          <Col xs="6">
            <strong>Total:</strong>
          </Col>
          <Col xs="6">{total} €</Col>
        </Row>
        {Object.keys(cart).length > 0 && (
          <Row>
            <Col xs={{ span: 4, offset: 6 }} className="mt-1">
              <Button size="sm" onClick={pay}>
                Pay
              </Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col xs="12">
            {showSuccess && (
              <Alert variant="success">Purchase successful</Alert>
            )}
          </Col>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
