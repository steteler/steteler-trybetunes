import React, { Component } from 'react';
import PropType from 'prop-types';

class Loading extends Component {
  render() {
    const { isLoading } = this.props;

    return (
      <div>
        {isLoading && <h1>Carregando...</h1>}
      </div>
    );
  }
}

Loading.propTypes = {
  isLoading: PropType.bool.isRequired,
};

export default Loading;
