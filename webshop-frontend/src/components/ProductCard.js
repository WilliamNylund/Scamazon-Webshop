import Card from 'react-bootstrap/Card';
import { Row, Col, Button, Tooltip, Overlay } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';
import { useState, useContext, useRef, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const { user } = useContext(UserContext);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const target = useRef(null);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (inCart()) {
      setTooltipText('Item is already in your cart');
      setShowTooltip(true);
    } else {
      cart[product.id] = product;
      localStorage.setItem('cart', JSON.stringify(cart));
      setTooltipText('Added to cart!');
    }
    setShowTooltip(true);
  };

  const inCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart.hasOwnProperty(product.id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setTimeout(() => {
      setShowTooltip(false);
    }, 1500);
  }, [showTooltip]);

  return (
    <div className="productCard">
      <Card>
        <Card.Body>
          <Card.Title className="product-title">
            <Row>
              <Col>{product.title}</Col>
              <Col className="text-end">{product.price} €</Col>
            </Row>
          </Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>Uploaded at {product.created_at}</Col>
            {user &&
              (user.id != product.owner ? (
                <Col className="text-end">
                  <Button
                    size="sm"
                    id={'add-' + product.id}
                    onClick={addToCart}
                    ref={target}>
                    Add to cart
                  </Button>
                  <Overlay
                    show={showTooltip}
                    placement="right"
                    target={target.current}>
                    <Tooltip>{tooltipText}</Tooltip>
                  </Overlay>
                </Col>
              ) : (
                <Col className="text-end">This product is uploaded by you.</Col>
              ))}
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default ProductCard;
