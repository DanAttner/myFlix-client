import React from "react";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from "../profile-view/profile-view";


export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      user: null,
      fulluser: null,
      log: 'login',
      reg: 'register'
    }
  }

  //Life cycle method to be used first
  //allows user to stay logged in
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken)
    }
    if (localStorage.getItem('token')){
      this.setState({
        log: "logout",
        reg: ""
        }
      )
    }
  }



  //gets movies if auth is good
  getMovies(token){
    console.log(token);
    axios.get('https://dansflix.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    });
  }

  //When a user logs in, updates user state to that user
  onLoggedIn(authData){
    this.setState({
      user: authData.user.username,
      fulluser: authData,
      log: "logout",
      reg: ""
    });

    //storeing user session token and userlogin info in browser (username, hashed pass, ID )
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      log: "login",
      reg: "register"
    });
  }

  render() {
    const { movies, user, log, reg, fulluser } = this.state;

    //default main view, shows a list of movie cards
    return (
      

      //#### NAVBAR #####
      <Router>
        <div className="main-view">
            <Navbar bg="dark" variant="dark" expland="lg" fixed="top">
              <Container fluid>
                <Navbar.Brand href={`/`}> myFlix </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href={`/users/${user}`}> Profile </Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link href={`/`} onClick={this.onLoggedOut}> {log} </Nav.Link>
                    <Nav.Link href={`/register/`} onClick={this.onLoggedOut}> {reg} </Nav.Link>
                  </Nav>
                </Navbar.Collapse>  
              </Container>
            </Navbar>

          <div>
            <Container className="pt-5">
              <Row className="main-view justify-content-md-center pt-3"> 
                <Route exact path="/" render={() => {
                  //##### MAINVIEW #######
                  // If there is no user, the LoginView is rendered. 
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  if (user) return movies.map(movie =>  (
                    <Col md={3}>
                      <MovieCard key={movie._id} movie={movie} />
                    </Col>
                  ))
                }} />

                <Route path="/register" render={() => {
                  //##### REGISTER #######
                  if (user) return <Redirect to="/" />
                    return <Col>
                      <RegistrationView />
                    </Col>
                  }} />


                <Route path="/movies/:movieId" render={({ match, history }) => {
                  //##### MOVIEVIEW ######
                  // If there is no user, the LoginView is rendered.
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>

                  return <Col md={8}>
                    <MovieView movie={movies.find(m => 
                      m._id === match.params.movieId)} 
                      onBackClick={() => history.goBack()} />
                  </Col>
                }} />

                <Route path="/directors/:name" render={({ match, history }) => {
                  //##### DIRECTORVIEW ######
                  // If there is no user, the LoginView is rendered.
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                    <DirectorView director={movies.find(movie =>
                      movie.director.name === match.params.name).director}
                      onBackClick={() => history.goBack()} />
                  </Col>
                 }} />

                <Route path="/genres/:name" render={({ match, history }) => {
                  //##### GENREVIEW ######
                  // If there is no user, the LoginView is rendered.
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                    <GenreView genre={movies.find(movie => 
                      movie.genre.name === match.params.name).genre}
                      onBackClick={() => history.goBack()} />
                  </Col>
                }} />


                <Route path="/users/:username" render={(history) => {
                  //##### PROFILEVIEW ######
                  // If there is no user, the LoginView is rendered.
                  if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                    <ProfileView fulluser={fulluser} movies={movies}
                    onBackClick={() => history.goBack()}/>
                  </Col>
                }} />
              </Row>
            </Container>
          </div>
        </div>
      </Router>
    );
  }

}