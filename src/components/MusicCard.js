import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      isChecked: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { album: { trackId } } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      isChecked: favorites.some((favorite) => favorite.trackId === trackId),
    }, () => this.setState({ isLoading: false }));
  }

  onInputChange({ target }) {
    const { album, updateFavorites } = this.props;
    this.setState({ isChecked: target.checked, isLoading: true }, () => {
      if (target.checked) {
        addSong(album).then(() => this.setState({ isLoading: false }));
      } else {
        removeSong(album).then(() => this.setState({ isLoading: false }));
      }
      if (updateFavorites) updateFavorites();
    });
  }

  render() {
    const {
      album: { trackName, previewUrl, trackId },
    } = this.props;

    const {
      isChecked,
      isLoading,
    } = this.state;

    return (
      <div>
        {isLoading ? <Loading /> : (
          <>
            <span>{ trackName }</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ `cardFavorite-${trackId}` }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ `cardFavorite-${trackId}` }
                type="checkbox"
                onChange={ this.onInputChange }
                checked={ isChecked }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  updateFavorites: PropTypes.func,
};

MusicCard.defaultProps = {
  updateFavorites: () => {},
};

export default MusicCard;
