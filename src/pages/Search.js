import React, { Component } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
      isLoading: false,
      artistName: '',
      album: [],
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

  onHandleClick = () => {
    const { inputSearch } = this.state;
    this.setState(() => ({
      isLoading: true,
      artistName: inputSearch,
      inputSearch: '',
    }), () => (
      searchAlbumsAPI(inputSearch)
        .then((album) => (
          this.setState(() => ({ isLoading: false, album }))
        ))));
  }

  render() {
    const {
      inputSearch,
      isButtonDisabled,
      isLoading,
      artistName,
      album,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        Search
        {isLoading ? <Loading isLoading={ isLoading } /> : (
          <div>
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
              onClick={ this.onHandleClick }
            >
              Procurar
            </button>
          </div>
        )}
        {artistName && <h3>{ `Resultado de álbuns de: ${artistName}` }</h3>}
        {!album.length ? <p>Nenhum álbum foi encontrado</p> : (
          album.map((artist) => (
            <Card key={ artist.collectionId } { ...artist } />
          ))
        )}
      </div>
    );
  }
}

export default Search;
