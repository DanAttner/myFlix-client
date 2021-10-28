import React from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Inception description would go here', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Shawshank description would go here', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'Gladiator description would go here', ImagePath: '...'}
      ],
      selectedMovie: null
    }
  }


  setSelectedMovie(newSelectedMovie){
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  
  
  render() {
    const { movies, selectedMovie } = this.state;

    //if there are no movies
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    //if we select a movie from the list
    if (selectedMovie){
      return <MovieView movie={selectedMovie} 
        onBackClick={back => {this.setSelectedMovie(back);}} />;
    } 

    //default main view
    else {
      return (
        <div className="main-view">
          {movies.map(movie =>  <MovieCard key={movie._id} movie={movie}
          onMovieClick={(movie) => {this.setSelectedMovie(movie) }} />)}
        </div>
      );
    }
  }


}