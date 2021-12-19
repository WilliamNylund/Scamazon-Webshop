import { Container, Button, Modal, ModalBody } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
const ConfirmationModal = ({handleConfirm, handleClose, show, text}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="justify-content-md-center">
      {text}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
