import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
    };
  }

  onInputChange = ({ target: { value } }) => {
    this.setState(() => ({
      inputSearch: value,
    }), this.changeButtonDisabled);
  }

  changeButtonDisabled = () => {
    const { inputSearch } = this.state;
    const minCharacter = 2;
    this.setState(() => ({
      isButtonDisabled: inputSearch.length < minCharacter,
    }));
  }

  render() {
    const {
      inputSearch,
      isButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        Search
        <input
          data-testid="search-artist-input"
          type="text"
          value={ inputSearch }
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isButtonDisabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Search;
