import Card from 'react-bootstrap/Card';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext, useRef } from 'react';
import ConfirmationModal from '../Modals/ConfirmationModal';
import axios from 'axios';
const MyProductCard = ({ product, type, setTest }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(product.price);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const onPriceChange = (e) => {
    setNewPrice(e.target.value);
    e.target.value.length > 0
      ? setDisableButton(false)
      : setDisableButton(true);
  };

  const updatePrice = () => {
    const token = localStorage.getItem('token');
    const roundedPrice = parseFloat(newPrice).toFixed(2)
    console.log(roundedPrice);
    const url = 'http://127.0.0.1:8000/api/items/' + product.id + '/';
    axios
      .put(
        url,
        { price: roundedPrice },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        handleCloseConfirmation();
        setCurrentPrice(parseFloat(newPrice).toFixed(2));
        setNewPrice('');
      })
      .catch((e) => {
        console.log('unable to update price');
        handleCloseConfirmation();
      });
  };
  return (
    <div className="productCard">
      <Card>
        <Card.Body>
          <Card.Title className="product-title">
            <Row>
              <Col>{product.title}</Col>
              <Col className="text-end">{currentPrice} €</Col>
            </Row>
          </Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>Uploaded at {product.created_at}</Col>
            {type == 'onSale' && (
              <>
                <Col md="auto" className="text-end pr-0">
                  <Form.Control
                    size="sm"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="New price"
                    value={newPrice}
                    name="price"
                    onChange={onPriceChange}
                  />
                </Col>
                <Col md="auto" className="text-end pl-0">
                  <Button
                    size="sm"
                    onClick={handleShowConfirmation}
                    disabled={disableButton}>
                    Update price
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Card.Footer>
      </Card>
      <ConfirmationModal
        handleConfirm={updatePrice}
        show={showConfirmation}
        handleClose={handleCloseConfirmation}
        text={
          'Are you sure you wanna update the price of this item to ' +
          newPrice +
          ' €'
        }
      />
    </div>
  );
};
export default MyProductCard;
