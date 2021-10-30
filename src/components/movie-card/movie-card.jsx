import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" 
      onClick={() => {onMovieClick(movie);}}>
          {movie.title}</div>;
  }
}

//movie is an object prop and isrequired
//  so is the movie title, description, and image path
//So is the onMovieClick function
MovieCard.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired}).isRequired,
  onMovieClick: PropTypes.func.isRequired
};