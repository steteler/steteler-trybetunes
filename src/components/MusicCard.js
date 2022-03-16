/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const { album: { trackId } } = this.props;
    this.setState(() => ({ isLoading: true }), () => (
      getFavoriteSongs().then((favorites) => {
        this.setState({
          isChecked: favorites.some((favorite) => favorite.trackId === trackId),
        }, () => this.setState(() => ({ isLoading: false })));
      })
    ));
  }

  onInputChange = ({ target }) => {
    const { album } = this.props;
    this.setState(() => ({ isLoading: true, isChecked: target.checked }), () => {
      if (target.checked) {
        addSong(album).then(() => this.setState(() => ({ isLoading: false })));
      } else {
        removeSong(album).then(() => this.setState(() => ({ isLoading: false })));
      }
    });
  }

  render() {
    const {
      album,
    } = this.props;

    const {
      isChecked,
      isLoading,
    } = this.state;

    return (
      <div>
        {isLoading ? <Loading isLoading={ isLoading } /> : (
          <>
            <span>{album.trackName}</span>
            <audio data-testid="audio-component" src={ album.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ `cardFavorite-${album.trackId}` }>
              Favorita
              <input
                data-testid={ `checkbox-music-${album.trackId}` }
                id={ `cardFavorite-${album.trackId}` }
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
  album: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
