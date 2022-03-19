import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.updateFavorites = this.updateFavorites.bind(this);

    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.updateFavorites();
  }

  async updateFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favorites.map((favorite) => (
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
