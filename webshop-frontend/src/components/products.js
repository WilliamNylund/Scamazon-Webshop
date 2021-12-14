import CardGroup from "react-bootstrap/CardGroup";
import ProductCard from "./productCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

const Products = () => {
  return (
      /*
    <Container className="product">
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          </Col>
        ))}
      </Row>
    </Container>
    */

    <Container>
        <Row>
            <Col>col1</Col>
            <Col>col2</Col>
            <Col>col3</Col>
        </Row>

    </Container>
  );
};
export default Products;
