import Card from "react-bootstrap/Card";
import logo from "../assets/logo.png"
const Products = (props) => {
  const {product} = props;
  return (
    <div className="productCard">
      <Card>
        <Card.Body>
          <Card.Title className="product-title">{product.title}</Card.Title>
          <Card.Text>
            {product.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        {product.price} €
      </Card.Footer>
      </Card>
    </div>
  );
};
export default Products;
