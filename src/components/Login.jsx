import { Card, Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import '../App.css';
import React from 'react';
import { useState, useEffect } from "react";
import Edit from "./Edit";

function Login() {

  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  function login(){
    console.log("password:", password);
    if(password === "1111"){
      setLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  }

    return (
    <div>
      {loggedIn ? <Edit /> :
    <div style={{ width: '100%' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Card style={{ width: "20rem", margin: 'auto'}} className="shadow">
        <Card.Body>
        <Card.Title className="text-center mb-4">Enter Your Password</Card.Title>
        <Form>
            <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" onClick={login}>
            Submit
            </Button>
        </Form>
        </Card.Body>
      </Card>
      </div>
    </div> } 
    </div>
    );
  }
  
  export default Login;