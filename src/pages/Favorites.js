import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
    };
  }

  updateFavorites = () => {
    getFavoriteSongs().then((favorites) => {
      this.setState(() => ({ favoriteSongs: [...favorites] }));
    });
  }

  componentDidMount = () => {
    this.updateFavorites();
  }

  render() {
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {
          favoriteSongs.map((favorite) => (
            <MusicCard
              key={ favorite.trackId }
              album={ favorite }
              updateFavorites={ this.updateFavorites }
            />
          ))
        }
      </div>
    );
  }
}

export default Favorites;
