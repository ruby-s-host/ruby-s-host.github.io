import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import { createProject } from "../ORM";

function NewProjectModal(props) {
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    function create(){
      let project = {
        description: description,
        name: name,
        link: link
      }

      createProject(project).then(() => {
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
      <h4>Description</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
      </Form.Group>
      <h4>Link</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={link} onChange={(e) => setLink(e.target.value)}/>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={create}>Create</Button>
    </Modal.Footer>
  </Modal>
    );
}

export default NewProjectModal;