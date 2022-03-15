import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      collectionName: '',
      albums: [],
    };
  }

  componentDidMount = () => {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((musics) => (
      this.setState(() => (
        {
          artistName: musics[0].artistName,
          collectionName: musics[0].collectionName,
          albums: musics,
        }
      ))));
  }

  render() {
    const
      {
        artistName,
        collectionName,
        albums,
      } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <h5 data-testid="artist-name">{artistName}</h5>
        <span data-testid="album-name">{collectionName}</span>
        {
          albums.map(({ previewUrl, trackId, trackName }) => (
            previewUrl && (
              <MusicCard
                previewUrl={ previewUrl }
                key={ trackId }
                trackName={ trackName }
              />
            )
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
export default Album;
