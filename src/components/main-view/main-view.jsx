import React from "react";
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
  
  
  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if there are no movies
    if (movies.length === 0) return <div className="main-view"></div>;

    //if we select a movie from the list
    if (selectedMovie){
      return <MovieView movie={selectedMovie} 
        onBackClick={back => {this.setSelectedMovie(back);}} />;
    } 

    //default main view, shows a list of movie cards
    return (
      <div className="main-view"> 
        {movies.map(movie =>  <MovieCard key={movie._id} movie={movie}
        onMovieClick={(movie) => {this.setSelectedMovie(movie) }} />)}
      </div>
    );
  }

}