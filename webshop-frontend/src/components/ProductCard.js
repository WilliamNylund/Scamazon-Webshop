import Card from "react-bootstrap/Card";
import logo from "../assets/logo.png"
const Products = () => {
  return (
    <div className="productCard">
      <Card>
        <Card.Img variant="top" src={logo} width="100px" height="100px"/>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
      </Card>
    </div>
  );
};
export default Products;
