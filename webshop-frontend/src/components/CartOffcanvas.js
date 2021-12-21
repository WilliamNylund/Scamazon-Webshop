import { Button, Row, Col, Offcanvas } from "react-bootstrap";
import { BsCart2, BsXLg } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const CartOffcanvas = ({show, handleClose}) => {
  const user = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("0");


  const navigate = useNavigate();

  const calculateCartTotal = () => {
    if (cart && cart.length > 0) {
      setTotal(
        cart
          .map((product) => parseFloat(product.price))
          .reduce((total, price) => total + price)
          .toFixed(2)
      );
    } else setTotal("0");
  };

  const populateCart = () => {
    const storageCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storageCart);
  };

  const removeProduct = (productId) => {
    const storageCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = storageCart.findIndex((product) => product.id == productId);
    console.log(index);
    if (index > -1) {
      storageCart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(storageCart));
    setCart(storageCart);
  };

  useEffect(() => {
    calculateCartTotal();
    console.log("calc total");
  }, [cart]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" onEntering={populateCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h3>Shopping Cart</h3></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {cart.map((product, index) => (
              <Row className="shopping-cart-row">
                <Col xs="6">{product.title}</Col>
                <Col xs="4">{product.price} € </Col>
                <Col xs="2">
                  <BsXLg
                    className="clickable"
                    onClick={() => removeProduct(product.id)}
                  />
                </Col>
              </Row>
            ))}
            <Row className="shopping-cart-bottom-line">
              <Col xs="6"><strong>Total:</strong></Col>
              <Col xs="4">{total} €</Col>
              <Col xs="2"></Col>
            </Row>
            
            <Row>
              <Col xs={{ span: 4, offset: 6 }} className="mt-1">
                <Button
                  size="sm"
                  onClick={() => {
                    
                  }}
                >
                  Pay
                </Button>
              </Col>
            </Row>
        </Offcanvas.Body>
      </Offcanvas>
  )
};

export default CartOffcanvas;
/*
{
      id: 570,
      title: "Kiwi",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: "2.85",
      created_at: "19.12.2021 18:49",
      owner: 121,
    },
    {
      id: 569,
      title: "Soy sauce",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: "2.12",
      created_at: "19.12.2021 18:49",
      owner: 121,
    },
    {
      id: 568,
      title: "Meatballs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: "2.79",
      created_at: "19.12.2021 18:49",
      owner: 121,
    },
*/
