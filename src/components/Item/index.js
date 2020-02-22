import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@react-native-community/checkbox';

import { View, Text } from 'react-native';

import styles from './styles';
import { LIST_REMOTE } from '~/config/metric';

export default class Item extends Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      isFavorited: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    action: PropTypes.func,
  };

  static defaultProps = {
    action: () => {},
  };

  componentDidMount() {
    const { position } = this.props;

    if (position === 3) {
      console.tron.timeEnd(LIST_REMOTE);
    }
  }

  render() {
    const { item, position, action } = this.props;

    return (
      <View style={styles.container} key={item.id}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>
              {position} {item.id || item.name}
            </Text>
          </View>
          <View>
            <CheckBox
              value={item.isFavorited === 1}
              onValueChange={() => action(item, position)}
              tintColors={{ true: '#CCDD38' }}
            />
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }
}
