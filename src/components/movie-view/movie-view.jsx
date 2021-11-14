import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

//i need movieview to take in movies, onbackclick, and user so i can do my axios stuff.
//it was working before i added user. 
export class MovieView extends React.Component {
  constructor(){
    super();
    this.state = {
      AddorRemove: null
    }
  }
  
  componentDidMount(){
    let favs = this.props.fulluser.favorites
    let movieId = this.props.movie._id


    if (favs.indexOf(movieId) >= 0){
      console.log(' movie ID already exists in favorites')
      this.setRemove()
    }
    else{
      console.log(' movie ID does not  exist in favorites')
      this.setAdd()
    }
  }


  setAdd = () =>{
    this.setState({
      AddorRemove: "Add to favorites"
    })
    console.log(this.AddorRemove)
  }

  setRemove = () =>{
    this.setState({ AddorRemove: "Remove from favorites"
    })
    console.log(this.AddorRemove)
  }

  /*
  onLoggedOut= () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      fulluser: null,
      log: "login",
      reg: "register"
    });
  }
*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddFav(this.props.movie._id);
    window.open('/', '_self');
  };

  render() {
    const { movie, onBackClick, fulluser, user, AddorRemove } = this.props;

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
                  <Button className='Add/Removefav' href={`/`}
                    variant="secondary"
                    size="lg"
                    type="submit"
                    onClick={this.handleSubmit}> 
                    {this.state.AddorRemove}
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
