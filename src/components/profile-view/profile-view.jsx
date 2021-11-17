import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './profile-view.scss';

import { connect } from 'react-redux';
import { setMovies  } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import { setFulluser } from '../../actions/actions';

import { useHistory } from 'react-router-dom';
import { FavMovieCard } from '../fav-movie-card/fav-movie-card';


export function ProfileView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ errmessage, setErrmessage] = useState(false);

  console.log("profile view ", props)
  const favoriteMovies = props.fulluser.favorites;
  const movies = props.movies;
  const history = useHistory();


  //func to handle updateing user info
  handleUpdateUser= (username,password,email) => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

   if(username.length >= 5 && password.length >= 8 ) {
      console.log('your past the length check doing put now ');
      axios.put(`https://dansflix.herokuapp.com/users/${localuser}`, {
        username: username,
        password: password,
        email: email,
        birthday: props.fulluser.birthday
      },
      {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucsessful update of user info  ', response.data);
        props.getUser(token, username) 
      })
      .catch(e => {
        console.log('error updateing the user', e)
        enableerr()

      });
    }
    else{
      console.log('you failed the update test, you lose, you get nothing, goodday sir');
      enableerr()
   }
   

  }

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

  const removefav = (movieId) => {
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

    if (favoriteMovies.indexOf(movieId) >= 0){
      axios.delete(`https://dansflix.herokuapp.com/users/${localuser}/movies/${movieId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucessful deletion of movie ', response)
        props.getUser(token, localuser)
      })
      .catch(e => {
        console.log(' error deleting  fav', e)
      });
    }
  }




  const spitoutfavs = () => favoriteMovies.map(movieId =>  { 
    const movie = movies.find((movie) => movie._id === movieId);
    return <Col md={4}>
      <div className="favoriteMoviesList">
        <FavMovieCard key={movie._id}  movie={movie} />
        <Button className="unfavoriteMovieButton text-center" variant="secondary" onClick={() => {removefav(movie._id) }} >Remove Favorite</Button>
      </div>
    </Col>
    })

  

  return (
    <Container className="pt-5">
        <Row className="mb-5">
          <Col>
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
          <Col md={8}>
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
                        variant="success"
                        size="lg" 
                        type="button" 
                        onClick={() => {handleUpdateUser(username, password, email)}}
                      > Update
                      </Button>
                      </Form>          
                </Card.Body>
              </Card>
            </CardGroup>
            <Button onClick={() => {history.goBack()}}  variant="link">Back</Button>
          </Col> 
        </Row>
        <Row className="justify-content-md-center">
          <Col >
            <h3 className="text-center"> Favorite Movies </h3> 
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          {spitoutfavs()}
        </Row>

    </Container>

  );
}

let mapStateToProps = state => {
  return {
    user: state.user,
    fulluser: state.fulluser
  }
}

export default connect(mapStateToProps, {setUser, setFulluser})(ProfileView);