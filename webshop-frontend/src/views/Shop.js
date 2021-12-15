
import { Container } from "react-bootstrap";
import Products from "../components/Products";
import Header from "../components/Header";
const Shop = () => {
  return (
    <Container className="container-fluid">
    <Header text="Shop"/>

    <div className="shop">
      <div className='product-container'>
          <Products/>
      </div>
    </div>
    </Container>
  );
}
export default Shop;
