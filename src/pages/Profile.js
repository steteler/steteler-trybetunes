import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    const {
      name,
      email,
      description,
      image,
    } = await getUser();

    this.setState({
      name,
      email,
      description,
      image,
      isLoading: false,
    });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <p>{ name }</p>
            <p>{ email }</p>
            <p>{ description }</p>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <br />
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
