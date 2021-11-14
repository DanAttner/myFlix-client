import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [errmessage, setErrmessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://dansflix.herokuapp.com/login', {
        username: username,
        password: password
    })
    .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
    })
    .catch(error => {
        console.log('no such user')
        enableerr()
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
        <div className="red"> * Invalid username or password </div> 
      </div>
      )
    }
  } 

  return (
    <Container className="pt-5">
        <Row className="justify-content-md-center">
            <Col md={9}>
                <CardGroup>
                    <Card className="login-card">
                        <Card.Body>
                            <Card.Title className="text-center">Welcome to myFlix</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
                            
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        placeholder="Enter a username" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control 
                                        className="mb-3"
                                        type="password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        minLength="8"
                                        placeholder="Password must be 8 or more characters" />
                                </Form.Group>
                                <Button className="loginButton"
                                variant="primary"
                                size="lg" 
                                type="submit" 
                                onClick={handleSubmit}>
                                    Login
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

const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
  });
  
  export default connect(null, mapDispatchToProps)(LoginView);