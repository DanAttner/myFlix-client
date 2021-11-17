import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';
import { setMovies  } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import { setFulluser } from '../../actions/actions';

import { Link } from "react-router-dom";

export class FavMovieCard extends React.Component {




  render() {
    const { movie, fulluser } = this.props;


    

    return (
      <Card>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.imagepath}  />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Link to ={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}


let mapStateToProps = state => {
  return {movies: state.movies,
          user: state.user,
          fulluser: state.fulluser}
}

export default connect(mapStateToProps, {setMovies, setUser, setFulluser} )(FavMovieCard);