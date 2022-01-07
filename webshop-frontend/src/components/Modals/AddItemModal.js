import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AddItemModal = ({ setProducts }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://127.0.0.1:8000/api/items/',
        {
          title: title,
          description: description,
          price: price,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setShowSuccess(true);
        window.setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        setProducts((oldProducts) => [...oldProducts, res.data]);
        //clear input fields
        setTitle('');
        setDescription('');
        setPrice('');
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  //
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add item for sale
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-md-center">
          <Container className="form-input justify-content-md-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  name="title"
                  onChange={updateTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="textarea"
                  placeholder="Enter description"
                  value={description}
                  name="description"
                  onChange={updateDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPrice">
                <Form.Label>Price €</Form.Label>
                <Form.Control
                  required
                  type="number"
                  step="0.50"
                  min="0"
                  placeholder="Enter price"
                  value={price}
                  name="price"
                  onChange={updatePrice}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {showSuccess && (
            <Alert variant="success">Item successfully added</Alert>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddItemModal;
