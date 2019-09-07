import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Item from '~/components/Item';

export default class FavoritesScreen extends Component {
  static navigationOptions = {
    title: 'Favoritos',
    headerStyle: {
      backgroundColor: '#8BC24A',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    items: [],
  };

  async componentDidMount() {
    try {
      const items = await this.getData('items');
      this.setState({ items });
    } catch (error) {
      console.tron.log(error);
    }
  }

  getData = async key => {
    try {
      const val = await AsyncStorage.getItem(key);

      if (val !== null) {
        return JSON.parse(val);
      }

      return [];
    } catch (error) {
      console.tron.log(error);
    }
  };

  render() {
    const { items } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <FlatList
              data={items}
              horizontal={false}
              numColumns={1}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
                <Item position={index} item={item} />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
