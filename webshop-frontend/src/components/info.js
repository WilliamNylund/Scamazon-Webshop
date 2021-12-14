import Navbar from "react-bootstrap/Navbar";
import { Container, Button, ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";
const InfoComponent = () => {
  return (
    <Container className="justify-content-md-center">
      <StatisticsComponent />
      <PopulateComponent />
      <TermsAndConditionsComponent />
    </Container>
  );
};

const StatisticsComponent = () => {
  return (
    <Container className="info-item justify-content-md-center">
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

const PopulateComponent = () => {
  return (
    <Container className="info-item justify-content-md-center">
      <a href="asd">populate database</a>
    </Container>
  );
};

const TermsAndConditionsComponent = () => {
  return (
    <Container className="info-item justify-content-md-center">
      <p>By going to the store you accept blbalb</p>
      <Link to="/shop">
        <Button size="lg">Go to shop</Button>
      </Link>
    </Container>
  );
};

export default InfoComponent;
