import Header from "../Header";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import MyProductCard from "./MyProductCard.js";

const OnSale = () => {
  const [products, setProducts] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res.data.length > 0) {
          setProducts(res.data);
        } else {
          setAlertMsg("You have no items on sale currently");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container className="container-fluid my-items-container">
      <Header text="On sale" />
      <Row xs={1} md={2} className="g-4">
        {products.map((product, index) => (
          <Col key={product.id.toString()}>
            <MyProductCard key={product.id.toString()} product={product} type="onSale"/>
          </Col>
        ))}
      </Row>
      {alertMsg && (
        <Row className="justify-content-center mt-4">
          <Col md="auto">{alertMsg}</Col>
        </Row>
      )}
    </Container>
  );
};

export default OnSale;

const getProducts = async () => {
  const token = localStorage.getItem("token");
  let request = axios.get(`http://127.0.0.1:8000/api/my-items/?sale=true`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return request;
};
