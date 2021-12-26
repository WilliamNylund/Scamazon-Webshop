import { Button, Row, Col, Offcanvas } from "react-bootstrap";
import { BsCart2, BsXLg } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const CartOffcanvas = ({show, handleClose}) => {
  const user = useContext(UserContext);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState("0");

  const calculateCartTotal = () => {
    if (cart && Object.keys(cart).length > 0) {
      let priceTotal = 0;
      Object.keys(cart).map((id, i) => {
        priceTotal += parseFloat(cart[id].price)
      });

      setTotal(priceTotal.toFixed(2));
    } else {
      setTotal("0");
    }
  };

  const populateCart = async () => {
    let storageCart = JSON.parse(localStorage.getItem("cart")) || {};
    if (Object.keys(storageCart).length > 0) {
      storageCart = await addWarningTexts(storageCart);
      localStorage.setItem("cart", JSON.stringify(storageCart));
    }
    setCart(storageCart);
  };

  const removeProduct = (productId) => {
    const storageCart = JSON.parse(localStorage.getItem("cart")) || {};
    delete storageCart[productId]
    localStorage.setItem("cart", JSON.stringify(storageCart));
    setCart(storageCart);
  };

  const pay = () => {
    setCart({});
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" onEntering={populateCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h3>Shopping Cart</h3></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
              <Col xs="6"><strong>Total:</strong></Col>
              <Col xs="4">{total} €</Col>
              <Col xs="2"></Col>
            </Row>
            <Row>
              <Col xs={{ span: 4, offset: 6 }} className="mt-1">
                <Button
                  size="sm"
                  onClick={pay}
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

const addWarningTexts = async (cart) => {
  let filterString = 'ids=';
  Object.keys(cart).map((id, i) => {
    if (i == 0) {
      filterString += id
    } else {
      filterString += ","+id
    }
  });

  const request = await getProducts(filterString);
  request.data.map((product, index) => {
    if (product.price != cart[product.id].price) {
      console.log("price changed");
      cart[product.id].warningText = 'The price of this item has changed to ' + product.price
    }
  });
  return cart
}

const getProducts = async (filterString) => {
  let request = axios.get(
    `http://127.0.0.1:8000/api/items/?${filterString}`
  );
  return request;
};

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
