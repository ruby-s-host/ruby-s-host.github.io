import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import { getAbout, updateAbout } from "../ORM";

function EditAboutModal(props) {
    const [prev, setPrev] = useState('');
    const [id, setId] = useState(0);

    function update(){
        updateAbout(id, prev).then(() => {
            props.refresh();
        });
        props.onHide();
    }

    useEffect(() => {
        getAbout().then(data => {
            setId(data.id);
            setPrev(data.text);
    });
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
       Edit About Me
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>About Me</h4>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} value={prev} onChange={(e) => setPrev(e.target.value)}/>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={update}>Update</Button>
    </Modal.Footer>
  </Modal>
    );
}

export default EditAboutModal