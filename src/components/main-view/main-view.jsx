import React from "react";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col, NavLink } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";

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
      this.getUser(accessToken, localStorage.getItem('user'))
    }
    if (localStorage.getItem('token')){
      this.setState({
        log: "logout",
        reg: ""
        }
      )
    }
  }

  getUser(token, user){
    axios.get(`https://dansflix.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        fulluser: response.data
      });
    })

  }

  //function to add favorite
  handleAddFav = (movieId) => {
    let favs = this.state.fulluser.favorites
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

    if (favs.indexOf(movieId) >= 0){
      axios.delete(`https://dansflix.herokuapp.com/users/${localuser}/movies/${movieId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucessful deletion of movie ', response)
      })
      .catch(e => {
        console.log(' error deleting  fav', e)
      });
    }
    else{
      axios.post(`https://dansflix.herokuapp.com/users/${localuser}/movies/${movieId}`, {}, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucessful add movie post ', response)
      })
      .catch(e => {
        console.log(' error adding fav', e)
      });
    }
  };
  
  //func to handle updateing user info
  handleUpdateUser= (username,password,email) => {
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

    console.log('bbbbbbbbbbbb' + username + password + email)

    axios.put(`https://dansflix.herokuapp.com/users/${localuser}`, {
      username: username,
      password: password,
      email: email,
      birthday: this.state.fulluser.birthday
    },
    {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('sucsessful update of user info  ', response);
 //     window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error updateing the user', e)

    });
  }



  //gets movies if auth is good
  getMovies(token){
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
    console.log('login ', {
      user: authData.user.username,
      log: "logout",
      reg: ""
    })
    this.setState({
      user: authData.user.username,
      fulluser: authData.user,
      log: "logout",
      reg: ""
    });

    //storeing user session token and userlogin info in browser (username, hashed pass, ID )
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut= () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      fulluser: null,
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
          <React.Fragment>
            <Navbar bg="dark" variant="dark" expland="lg" fixed="top">
              <Container fluid>
                <Navbar.Brand href={`/`}> myFlix </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <NavLink className="navbutton" to={`/users/${user}`}  > Profile </NavLink>
                  </Nav>
                  <Nav>
                    <NavLink className="navbutton" to="/" onClick={this.onLoggedOut}> {log} </NavLink>
                    <NavLink className="navbutton" to="/register/" onClick={this.onLoggedOut}> {reg} </NavLink>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </React.Fragment>

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
                      handleAddFav={movieId => this.handleAddFav(movieId)}
                      user={user} fulluser={fulluser}
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
                    handleUpdateUser={(username,password,email) => this.handleUpdateUser(username,password,email)}
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