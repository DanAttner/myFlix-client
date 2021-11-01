import React from "react";
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Col, Container, Navbar } from "react-bootstrap";

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  //Life cycle method to be used first
  //loads movie data from backend to movies array
  componentDidMount(){
    axios.get('https://dansflix.herokuapp.com/movies')
      .then(response => {
        console.log(response.data);
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

//function to change the state of selectedMovie 
//occurs when movie card is clicked
  setSelectedMovie(newSelectedMovie){
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //When a user logs in, updates user state to that user
  onLoggedIn(user){
    this.setState({
      user
    });
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register
    });
  }

  
  
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //register shit lmao!!!!!!!!!!!!!!!!!!!!!!!!
    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if there are no movies
    if (movies.length === 0) return <div className="main-view"></div>;

    //if we select a movie from the list
    if (selectedMovie){
      return(
        <Row className="justify-content-md-center">
          <Col md={8}>
            <MovieView movie={selectedMovie} 
              onBackClick={back => {this.setSelectedMovie(back);}} />
          </Col>
        </Row>
      )
    }   

    //default main view, shows a list of movie cards
    return (
      <div className="main-view">
        <Navbar>
          <Container fluid>
            <Navbar.Brand href="#"> myFlix </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <nav className="me-auto">
                why doesn't this work
                {/*<nav.link href="#"> link 1 </nav.link>*/}
              </nav>
            </Navbar.Collapse>  
          </Container>
        </Navbar>

        <div>
          <Container>
            <Row className="main-view justify-content-md-center"> 
              {movies.map(movie =>  (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie}
                  onMovieClick={(movie) => {this.setSelectedMovie(movie) }} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }

}