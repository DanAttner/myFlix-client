import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;
    console.log('directorview reached')

    return (

      <Container>
        <Row className="justify-content-md-center">
          <Col md={9}>
            <Card.Body>
              <Card.Title>{director.name}</Card.Title>
              <Card.Text>{director.bio}</Card.Text>
              <Button onClick={() => {onBackClick()}} variant="link">Back</Button>


            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes={
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired
  }).isRequired
};