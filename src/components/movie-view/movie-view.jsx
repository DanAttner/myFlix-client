import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (

      <Container>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top"  >
            <Container fluid>
                <Navbar.Brand href="#"> myFlix </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#"> link 1 </Nav.Link>
                        <Nav.Link href="#"> link 2 </Nav.Link>
                        <Nav.Link href="#"> link 3 </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Row className="justify-content-md-center">
          <Col md={9}>
            <Card.Img variant="top" src={movie.imagePath} alt="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Button onClick={() => {onBackClick(null);}} variant="link">Back</Button>
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
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};