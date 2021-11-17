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


  handleAddFav = (movieId) => {
    let favs = this.props.fulluser.favorites
    let token = localStorage.getItem('token');
    let localuser = localStorage.getItem('user')

    if (favs.indexOf(movieId) >= 0){
      axios.delete(`https://dansflix.herokuapp.com/users/${localuser}/movies/${movieId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log('sucessful deletion of movie ', response)
        this.props.getUser(token, localuser)
        this.setAdd()
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
        this.props.getUser(token, localuser)
        this.setRemove()
      })
      .catch(e => {
        console.log(' error adding fav', e)
      });
    }
  };

/*  toggleAddorRemove(){
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
*/

  setAdd = () =>{
    this.setState({
      AddorRemove: "Add to favorites"
    })
    console.log('set state to add fav ', this.state.AddorRemove)
  }

  setRemove = () =>{
    this.setState({ AddorRemove: "Remove from favorites"
    })
    console.log('set state to remove fav ', this.state.AddorRemove)
  }


 /* handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddFav(this.props.movie._id);
    this.toggleAddorRemove();
  };
*/
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
                  <Button className='Add/Removefav' 
                    variant="secondary"
                    size="lg"
                    type="submit"
                    onClick={() => {this.handleAddFav(movie._id)}}> 
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

let mapStateToProps = state => {
  return {
    user: state.user,
    fulluser: state.fulluser
  }
}

export default connect(mapStateToProps, {setUser, setFulluser})(MovieView);