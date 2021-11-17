import React from "react";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col, NavLink } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { setMovies  } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import { setFulluser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from "../profile-view/profile-view";


class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      log: 'login',
      reg: 'register'
    }
  }

  //Life cycle method to be used first
  //allows user to stay logged in
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
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
      localStorage.setItem('user', response.data.username);
      this.props.setUser(response.data.username)
      this.props.setFulluser(response.data)
    })
    .catch( e=> {
      console.log('error getting user ', e)
      console.log('the username you tried and fucking failed is ', user)
    })
    console.log('this is full user after getUser  ', this.props.fulluser)

  }


  //function to add favorite
  handleAddFav = (movieId) => {
    let favs = this.props.fulluser.favorites
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

    if (favs.indexOf(movieId) >= 0){
      axios.delete(`https://dansflix.herokuapp.com/users/${localuser}/movies/${movieId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucessful deletion of movie ', response)
        this.getUser(token, localuser)
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
        this.getUser(token, localuser)
      })
      .catch(e => {
        console.log(' error adding fav', e)
      });
    }
  };
  




  //gets movies if auth is good
  getMovies(token){
    axios.get('https://dansflix.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error){
      console.log(error);
    });
  }

  //When a user logs in, updates user state to that user
  onLoggedIn(authData){

    this.props.setUser(authData.user.username)
    this.props.setFulluser(authData.user)
    this.setState({
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

    this.props.setUser(null);
    this.props.setFulluser(null);

    this.setState({
      log: "login",
      reg: "register"
    });
  }

  render() {
    const { log, reg } = this.state;
    let { movies, user, fulluser } = this.props;


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
                    <NavLink className="navbutton pl-3" to="/register/" onClick={this.onLoggedOut}> {reg} </NavLink>
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

                  return <MoviesList movies={movies} />
                  }}/>

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
                      getUser={(token, user) => this.getUser(token, user)}
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
                    getUser={(token, user) => this.getUser(token, user)}
                    onBackClick={() => history.goBack()} />
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

let mapStateToProps = state => {
  return {movies: state.movies,
          user: state.user,
          fulluser: state.fulluser}
}

export default connect(mapStateToProps, {setMovies, setUser, setFulluser} )(MainView);