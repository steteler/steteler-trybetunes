import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isButtonDisabled: true,
      isLoading: false,
      isLogged: false,
    };
  }

  onInputChange = ({ target: { value } }) => {
    this.setState(() => ({
      loginName: value,
    }), this.changeButtonDisabled);
  }

  changeButtonDisabled = () => {
    const { loginName } = this.state;
    const minCharacter = 3;
    this.setState(() => ({
      isButtonDisabled: loginName.length < minCharacter,
    }));
  }

  onHandleClick = (loginName) => {
    this.setState({ isLoading: true }, () => {
      createUser({ name: loginName })
        .then(() => (
          this.setState({ isLoading: false, isLogged: true })
        ));
    });
  }

  render() {
    const {
      loginName,
      isButtonDisabled,
      isLoading,
      isLogged,
    } = this.state;
    return (
      <div data-testid="page-login">
        {isLogged && <Redirect to="/search" />}
        {isLoading ? <Loading loading={ isLoading } /> : (
          <form>
            <input
              id="userName"
              type="text"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
              value={ loginName }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ () => this.onHandleClick(loginName) }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
