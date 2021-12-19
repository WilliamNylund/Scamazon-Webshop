import Card from "react-bootstrap/Card";
import logo from "../assets/logo.png";
import { Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";

const Products = ({product}) => {
  const { user, setUser } = useContext(UserContext);

  const addToCart = () => {
    console.log(product.id);
  }

  return (
    <div className="productCard">
      <Card>
        <Card.Body>
          <Card.Title className="product-title">
            <Row>
              <Col>{product.title} {product.owner}</Col>
              <Col className="text-end">{product.price} €</Col>
            </Row>
          </Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>Uploaded at {product.created_at}</Col>
            {user && (user.id != product.owner) ? (
            <Col className="text-end"><Button size="sm" onClick={addToCart}>Add to cart</Button></Col>
            ) : (
            <Col className="text-end">This product is uploaded by you.</Col>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default Products;
