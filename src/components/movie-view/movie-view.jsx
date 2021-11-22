import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { connect } from 'react-redux';
import { setMovies  } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import { setFulluser } from '../../actions/actions';

//i need movieview to take in movies, onbackclick, and user so i can do my axios stuff.
export class MovieView extends React.Component {

  handleAddFav = (movieId) => {
    let favs = this.props.fulluser.favorites
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

    if (favs.includes(this.props.movie._id) == true){
      axios.delete(`https://dansflix.herokuapp.com/users/${localuser}/movies/${movieId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucessful deletion of movie ', response)
        this.props.setFulluser(response.data)
        this.props.setUser(response.data.username)
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
        this.props.setFulluser(response.data)
        this.props.setUser(response.data.username)
      })
      .catch(e => {
        console.log(' error adding fav', e)
      });
    }
  };


  render() {
    const { movie, onBackClick } = this.props;

    const isfavorite = (this.props.fulluser.favorites.includes(this.props.movie._id))


    return (

      <Container>
        <Row className="justify-content-md-center">
          <Col md={9}>
            <Card.Img crossOrigin="anonymous" variant="top" src={movie.imagepath}  />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
                <div>
                  Director: 
                  <Link to ={`/directors/${movie.director.name}`}>
                    <Button variant="link"> {movie.director.name}</Button>
                  </Link>
                </div>

                <div>
                  Genre: 
                  <Link to ={`/genres/${movie.genre.name}`}>
                    <Button variant="link">{movie.genre.name} </Button>
                  </Link>
                </div>

                <div>
                  <Button className='Add/Removefav' 
                    variant="secondary"
                    size="lg"
                    type="submit"
                    onClick={() => {this.handleAddFav(movie._id)}}> 
                    {isfavorite == true ?  <text> Remove from favorites </text> : <text> Add to favorites </text>}
                  </Button>

                </div>


            </Card.Body>
            <Button onClick={() => {onBackClick()}}  variant="link">Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    fulluser: state.fulluser,
    movies: state.movies
  }
}

export default connect(mapStateToProps, {setUser, setFulluser})(MovieView);