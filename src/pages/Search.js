import React, { Component } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.changeButtonDisabled = this.changeButtonDisabled.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);

    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
      isLoading: false,
      artistName: '',
      artists: [],
    };
  }

  onInputChange({ target: { value } }) {
    this.setState({ inputSearch: value }, this.changeButtonDisabled);
  }

  onHandleClick() {
    const { inputSearch } = this.state;
    this.setState({
      isLoading: true,
      artistName: inputSearch,
      inputSearch: '',
    }, async () => {
      this.changeButtonDisabled();
      const artists = await searchAlbumsAPI(inputSearch);
      this.setState({ isLoading: false, artists });
    });
  }

  changeButtonDisabled() {
    const { inputSearch } = this.state;
    const minCharacter = 2;
    this.setState({
      isButtonDisabled: inputSearch.length < minCharacter,
    });
  }

  render() {
    const {
      inputSearch,
      isButtonDisabled,
      isLoading,
      artistName,
      artists,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <input
              data-testid="search-artist-input"
              type="text"
              value={ inputSearch }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.onHandleClick }
            >
              Procurar
            </button>
          </div>
        )}
        {artistName && <p>{ `Resultado de álbuns de: ${artistName}` }</p>}
        {!artists.length ? <p>Nenhum álbum foi encontrado</p> : (
          artists.map((artist) => (
            <Card key={ artist.collectionId } { ...artist } />
          ))
        )}
      </div>
    );
  }
}

export default Search;
