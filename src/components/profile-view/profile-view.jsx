import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';



export function ProfileView(props) {
  /*
  const [ fulluser, setFulluser ] = useState('');

  
  const getUser = () =>{
    const token = localStorage.getItem('token')
    axios.get(`https://dansflix.herokuapp.com/users/${this.user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data)
      setFulluser(response.data)
    })

  }
  getUser()

  */

  const FavoriteMovies = this.fulluser.favorites;

  const spitoutfavs = () =>{
    return FavoriteMovies.map(movie =>  (
      <Col md={3}>
        <MovieCard key={this.movie._id} movie={this.movie} />
      </Col>
    ))
  }


  

  return (
    <Container className="pt-5">
        <Row className="justify-content-md-center">
          {spitoutfavs}
        </Row>
    </Container>

  );
}

