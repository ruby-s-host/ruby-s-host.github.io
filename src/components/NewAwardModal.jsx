import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import { createAward } from "../ORM";

function NewAwardModal(props) {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    function create(){
      let award = {
        description: description,
        title: name,
      }

      createAward(award).then(() => {
        props.refresh();
      });
      props.onHide();
    }

    useEffect(() => {
    }, []);

    return(
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       Add new Award
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Title</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <h4>Description</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={create}>Create</Button>
    </Modal.Footer>
  </Modal>
    );
}

export default NewAwardModal;