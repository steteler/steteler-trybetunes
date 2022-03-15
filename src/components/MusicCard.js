/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  onInputChange = () => {
    const { album } = this.props;
    this.setState(({ isChecked }) => ({ isChecked: !isChecked, isLoading: true }), () => (
      addSong(album).then(() => (
        this.setState(() => ({ isLoading: false }))
      ))
    ));
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
            <span>{ album.trackName }</span>
            <audio data-testid="audio-component" src={ album.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="cardFavorite">
              Favorita
              <input
                data-testid={ `checkbox-music-${album.trackId}` }
                id="cardFavorite"
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
