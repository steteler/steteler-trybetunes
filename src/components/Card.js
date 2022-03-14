import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const
      {
        // artistId,
        artistName,
        collectionId,
        collectionName,
        // collectionPrice,
        artworkUrl100,
        // releaseDate,
        // trackCount,
      } = this.props;

    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h2>{ collectionName }</h2>
        <p>{ artistName }</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          { collectionId }
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default Card;
