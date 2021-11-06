import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    console.log('directorview reached')

    return (

      <Container>
        <Row className="justify-content-md-center">
          <Col md={9}>
            <Card.Body>
              <Card.Title>{genre.name}</Card.Title>
              <Card.Text>{genre.description}</Card.Text>
              <Button onClick={() => {onBackClick()}} variant="link">Back</Button>

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
GenreView.propTypes={
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};