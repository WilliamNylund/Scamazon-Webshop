import Card from "react-bootstrap/Card";
import logo from "../assets/logo.png";
import { Row, Col, Button, Tooltip, Overlay } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useContext, useRef } from "react";

const Products = ({ product }) => {
  const { user } = useContext(UserContext);
  const [showToolTip, setShowToolTip] = useState(false)
  const target = useRef(null);
  
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (inCart()) {
      console.log("product already exists in cart");
      setShowToolTip(true);
      setTimeout(() => {
        setShowToolTip(false);
      }, 1500)
      return;
    }
    cart[product.id] = (product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const inCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if(cart.hasOwnProperty(product.id)){
      return true;
    }
    return false;
  };

  return (
    <div className="productCard">
      <Card>
        <Card.Body>
          <Card.Title className="product-title">
            <Row>
              <Col>
                {product.title}
              </Col>
              <Col className="text-end">{product.price} €</Col>
            </Row>
          </Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>Uploaded at {product.created_at}</Col>
            {user &&
              (user.id != product.owner ? (
                <Col className="text-end">
                  <Button
                    size="sm"
                    id={"add-" + product.id}
                    onClick={addToCart}
                    ref={target}
                  >
                    Add to cart
                  </Button>
                  <Overlay
                    show={showToolTip}
                    placement="right"
                    target={target.current}
                    variant="danger"
                  >
                    <Tooltip variant="danger">
                      Item is already in your cart
                    </Tooltip>
                  
                  </Overlay>
                </Col>
              ) : (
                <Col className="text-end">This product is uploaded by you.</Col>
              ))}
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default Products;
