import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    console.log('movieview reached')

    return (

      <Container>
        <Row className="justify-content-md-center">
          <Col md={9}>
            <Card.Img crossOrigin="anonymous" variant="top" src={movie.imagepath}  />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Button onClick={() => {onBackClick()}} variant="link">Back</Button>

              <Link to ={`/directors/${movie.director.name}`}>
                <Button variant="link"> {movie.director.name}</Button>
              </Link>

              <Link to ={`/genres/${movie.genre.name}`}>
                <Button variant="link">{movie.genre.name} </Button>
              </Link>

              


            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}

//movie is an object prop and isrequired
//  so is the movie title, description, and image path
//So is the onMovieClick function
MovieView.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagepath: PropTypes.string.isRequired
  }).isRequired
};