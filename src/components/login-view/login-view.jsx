import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';



export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#"> myFlix </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#"> link 1 </Nav.Link>
                        <Nav.Link href="#"> link 2 </Nav.Link>
                        <Nav.Link href="#"> link 3 </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

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
            </Col>
        </Row>
    </Container>

  );
}

LoginView.propTypes={
    onLoggedIn: PropTypes.func.isRequired
}