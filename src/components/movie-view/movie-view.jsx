import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imagePath} /> 
        </div>

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>

        {/*button to set selected movie to null. therefore taking us back to main view*/}
        <button onClick={() => {onBackClick(null);}}>Back</button>

       </div>
    );
  }
}

//movie is an object prop and isrequired
//  so is the movie title, description, and image path
//So is the onMovieClick function
MovieView.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};