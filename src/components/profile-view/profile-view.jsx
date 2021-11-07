import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';


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
  console.log("profile view ", props)
  const favoriteMovies = props.fulluser.favorites;

  const movies = props.movies;


  const spitoutfavs = () =>favoriteMovies.map(movieId =>  { 
    const movie = movies.find((movie) => movie._id === movieId);
    return <Col md={3}>
      <MovieCard key={movie._id} movie={movie} />
    </Col>
    })
  


  

  return (
    <Container className="pt-5">
        <Row className="justify-content-md-center">
          {spitoutfavs()}
        </Row>
    </Container>

  );
}

