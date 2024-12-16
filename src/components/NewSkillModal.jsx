import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import { createSkill } from "../ORM";

function NewSkillModal(props) {
    const [prev, setPrev] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    function create(){
      let skill = {
        image: image,
        name: name
      }

      createSkill(skill).then(() => {
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
       Add new Skill
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Name</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <h4>Image url</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={image} onChange={(e) => setImage(e.target.value)}/>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={create}>Create</Button>
    </Modal.Footer>
  </Modal>
    );
}

export default NewSkillModal;