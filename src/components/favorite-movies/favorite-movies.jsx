import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';



export function ProfileView(props) {
  const [ fulluser, setFulluser ] = useState('');

  const FavoriteMovies = movies.filter((movies) =>{
    console.log(this.state.FavoriteMovies.includes(m._id))
    return this.state.FavoriteMovies.includes(m._id)
  });

  const getUser = () =>{
    axios.get(`https://dansflix.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data)
      setFulluser(response.data)
    })

  }

  getUser()


  //PLZZZ FIXXXX 
  const handleSubmit = (e) => {
    e.preventDefault();
    /* 
    axios.post('https://dansflix.herokuapp.com/login', {
        username: username,
        password: password
    })
    .then(response => {
        console.log(response.data)
        const data = response.data;
        props.onLoggedIn(data);
    })
    .catch(error => {
        console.log('no such user')
        enableerr()
    });
    */
  };





  return (
    <Container className="pt-5">
        <Row className="justify-content-md-center">
            <Col md={9}>
                <CardGroup>
                    <Card className="profile card">
                        <Card.Body>
                            <Card.Title> {fulluser} </Card.Title>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    </Container>

  );
}

