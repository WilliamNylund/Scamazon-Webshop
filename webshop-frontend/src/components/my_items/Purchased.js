import Header from "../Header";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import MyProductCard from "./MyProductCard.js";

const Purchased = () => {
  const [products, setProducts] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    getProducts()
      .then((res) => {
        const PurchasedProducts = ordersToProducts(res.data);
        if (PurchasedProducts.length > 0) {
          setProducts(PurchasedProducts);
        } else {
          setAlertMsg("No purchased items. Head to the shop!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container className="container-fluid my-items-container">
      <Header text="Purchased" />
      <Row xs={1} md={2} className="g-4">
        {products.map((product, index) => (
          <Col key={product.id.toString()}>
            <MyProductCard key={product.id.toString()} product={product} />
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

export default Purchased;

const getProducts = async () => {
  const token = localStorage.getItem("token");
  let request = axios.get(`http://127.0.0.1:8000/api/orders/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return request;
};

const ordersToProducts = (orders) => {
  let products = [];
  for (let i in orders) {
    products.push(...orders[i].items);
  }
  return products;
};
