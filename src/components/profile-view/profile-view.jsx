import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';


export function ProfileView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [errmessage, setErrmessage] = useState(false);

  console.log("profile view ", props)
  const favoriteMovies = props.fulluser.favorites;

  const movies = props.movies;

  //update user info func call
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('aaaaaaaaaaaaaaaaaaaaa' + username + password + email)
    props.handleUpdateUser(username, password, email);
    enableerr()
  };

  function enableerr(){
    setErrmessage(true)
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



  spitoutfavs = () => favoriteMovies.map(movieId =>  { 
    const movie = movies.find((movie) => movie._id === movieId);
    return <Col md={5}>
      <MovieCard key={movie._id}  movie={movie} />
    </Col>
    })

    
  

  

  return (
    <Container className="pt-5">
        <Row>
          <Col md={6}>
            <CardGroup>
              <Card className="userinfo-card">
                <Card.Body>
                  <Card.Title className="text-center">Your Info</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">Name: {props.fulluser.username}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted text-center">E-mail: {props.fulluser.email}</Card.Subtitle>            
                </Card.Body>
              </Card>
            </CardGroup>
            <div>
              { errgate() }
            </div>
          </Col>   
          <Col md={6}>
            <CardGroup>
              <Card className="updateinfo-card">
                <Card.Body>
                  <Card.Title className="text-center">Update</Card.Title>
                    <Form>
                      <Form.Group controlId="changeUsername">
                          <Form.Label>Username:</Form.Label>
                          <Form.Control 
                              type="text" 
                              onChange={e => setUsername(e.target.value)}
                              required
                              placeholder="" />
                      </Form.Group>

                      <Form.Group controlId="changePassword">
                          <Form.Label>Password:</Form.Label>
                          <Form.Control 
                              type="password" 
                              onChange={e => setPassword(e.target.value)}
                              required
                              minLength="8"
                              placeholder="" />
                      </Form.Group>

                      <Form.Group controlId="changeEmail">
                          <Form.Label>Email:</Form.Label>
                          <Form.Control 
                              className="mb-3"
                              type="email" 
                              onChange={e => setEmail(e.target.value)}
                              required
                              placeholder="" />
                      </Form.Group>

                      <Button className="updateButton"
                        variant="primary"
                        size="lg" 
                        type="submit" 
                        onClick={handleSubmit}
                      > Update
                      </Button>
                      </Form>          
                </Card.Body>
              </Card>
            </CardGroup>
          </Col> 
        </Row>

        <Row className="justify-content-md-center">
          {this.spitoutfavs()}
        </Row>

        <Button onClick={() => {onBackClick()}} variant="link">Back</Button>
    </Container>

  );
}

