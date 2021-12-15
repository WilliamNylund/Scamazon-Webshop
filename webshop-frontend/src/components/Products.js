import CardGroup from "react-bootstrap/CardGroup";
import ProductCard from "./ProductCard.js";
import Header from "./Header.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

const Products = () => {
  return (
    <Container className="products">
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <ProductCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Products;
