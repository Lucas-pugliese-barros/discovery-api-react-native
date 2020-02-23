import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const HeartButton = ({ navigation: { navigate } }) => (
  <TouchableHighlight
    style={styles.container}
    underlayColor="#fff"
    onPress={() => navigate('Favorites')}
    id="heartButton"
    testID="heartButton"
  >
    <Image source={require('~/config/like.png')} style={styles.image} />
  </TouchableHighlight>
);

HeartButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(HeartButton);
