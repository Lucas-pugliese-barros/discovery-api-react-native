import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@react-native-community/checkbox';

import { View, Text } from 'react-native';

import styles from './styles';

const Item = ({ position, item, action }) => {
  return (
    <View style={styles.container} key={item.id}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>
            {position} {item.id}
          </Text>
        </View>
        <View>
          <CheckBox
            value={item.isFavorited === true}
            onValueChange={() => action(item)}
            tintColors={{ true: '#CCDD38' }}
          />
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      {__DEV__ && (
        <Text>
          {item.isFavorited === true ? 'Favoritado' : 'Não favoritado'}
        </Text>
      )}
    </View>
  );
};

Item.propTypes = {
  position: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    isFavorited: PropTypes.bool,
  }).isRequired,
  action: PropTypes.func.isRequired,
};

export default Item;
