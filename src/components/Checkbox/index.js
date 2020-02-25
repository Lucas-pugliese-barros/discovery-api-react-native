import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

const Checkbox = ({ selected, onPress, color, ...props }) => (
  <TouchableOpacity {...props} style={styles.checkBox} onPress={onPress}>
    <Icon
      size={20}
      color={selected ? color : '#8F8F8F'}
      name={selected ? 'check-box' : 'check-box-outline-blank'}
    />
  </TouchableOpacity>
);

Checkbox.propTypes = {
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};

Checkbox.defaultProps = {
  color: '#CCDD38',
};

export default Checkbox;
