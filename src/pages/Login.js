import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.changeButtonDisabled = this.changeButtonDisabled.bind(this);

    this.state = {
      loginName: '',
      isButtonDisabled: true,
      isLoading: false,
      isLogged: false,
    };
  }

  onInputChange({ target: { value } }) {
    this.setState({
      loginName: value,
    }, this.changeButtonDisabled);
  }

  onHandleClick(loginName) {
    this.setState({ isLoading: true }, () => {
      createUser({ name: loginName }).then(() => {
        this.setState({ isLogged: true, isLoading: false });
      });
    });
  }

  changeButtonDisabled() {
    const { loginName } = this.state;
    const minCharacter = 3;
    this.setState({
      isButtonDisabled: loginName.length < minCharacter,
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
      <div>
        {isLogged ? <Redirect to="/search" /> : (
          <div data-testid="page-login">
            {isLoading ? <Loading /> : (
              <>
                <input
                  type="text"
                  placeholder="Nome"
                  data-testid="login-name-input"
                  onChange={ this.onInputChange }
                  value={ loginName }
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isButtonDisabled }
                  onClick={ () => this.onHandleClick(loginName) }
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;
