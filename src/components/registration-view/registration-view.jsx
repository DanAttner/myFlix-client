import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [errmessage, setErrmessage] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://dansflix.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birthday: Birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
      enableerr()
      //if there is an error here, send some red text to the render
      //set the redtext to be blank at start up with the startup component.

    });
  };

  function enableerr(){
    setErrmessage(true)
    console.log('here')
  }

  function errgate(){
    if (errmessage){
      return( 
      <div>
        <div className="red"> * Username must be alphanumeric and at least 5 characters</div>
        <div className="red"> * Password must be at least 8 characters</div>
        <div className="red"> * Email must be valid e-mail</div>
        <div className="red"> * Birthday must be valid date</div> 
      </div>
      )
    }
  } 

  return (

    <Container fluid className="registerContainer pt-5" >     
      <Row className="justify-content-md-center">
        <Col md={9}>
          <CardGroup>
            <Card className="register-Card">
              <Card.Body>
                <Card.Title className="text-center">Welcome to myFlix</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
            
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength="8"
                    placeholder="Password must be 8 or more characters" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Please enter a valid e-mail" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control 
                    className="mb-3" 
                    type="date" 
                    value={Birthday} 
                    onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                  
                  <Button className="registerButton" 
                  variant="secondary" 
                  size="lg" 
                  type="submit" 
                  onClick={handleSubmit}>
                      Register
                  </Button>
                  
                </Form>
              </Card.Body>
            </Card>
        </CardGroup>
        <div>
          { errgate() }
        </div>
        </Col>
      </Row>
    </Container>

  );
}

