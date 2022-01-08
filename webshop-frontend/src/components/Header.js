import { Container } from 'react-bootstrap';

const Header = (props) => {
  return (
    <Container className="header-container">
      <h3>{props.text}</h3>
    </Container>
  );
};

export default Header;
