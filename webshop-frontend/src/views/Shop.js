
import { Container } from "react-bootstrap";
import Products from "../components/Products";
import Header from "../components/Header";
const Shop = () => {
  return (
    <Container className="container-fluid">
      <Header text="Shop" />
      <Products />
    </Container>
  );
}
export default Shop;
