import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount = () => {
    this.setState(() => ({ isLoading: true }), () => {
      getUser().then(({ name, email, description, image }) => {
        this.setState(() => ({
          name,
          email,
          description,
          image,
          isLoading: false,
        }));
      });
    });
  }

  render() {
    const { name, email, description, image, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading isLoading={ isLoading } /> : (
          <>
            <p>{ name }</p>
            <p>{ email }</p>
            <p>{ description }</p>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
