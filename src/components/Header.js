import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount = () => {
    getUser().then(({ name }) => {
      this.setState(() => ({ userName: name, isLoading: false }));
    });
  }

  render() {
    const {
      userName,
      isLoading,
    } = this.state;

    return (
      <header data-testid="header-component">
        <span>cabeçalho</span>
        {isLoading ? <Loading isLoading={ isLoading } /> : (
          <div data-testid="header-user-name">{ userName }</div>
        )}
      </header>
    );
  }
}

export default Header;
