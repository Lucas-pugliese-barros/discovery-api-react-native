import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Item from '~/components/Item';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Lista de APIs',
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
      const call = await fetch('https://www.googleapis.com/discovery/v1/apis');

      if (!call.ok) {
        throw Error('Erro na requisição');
      }

      const response = await call.json();

      const items = response.items.map(item => ({
        ...item,
        isFavorited: false,
      }));

      this.setState({ items });
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillUnmount() {
    try {
      await AsyncStorage.setItem('items', JSON.stringify([]));
    } catch (error) {
      console.tron.log(error);
    }
  }

  alreadyInStorage = async item => {
    try {
      const storedItems = await this.getData('items');

      if (storedItems.find(el => el.id === item.id)) {
        return true;
      }

      return false;
    } catch (error) {
      console.tron.log(error);
    }
  };

  storeData = async item => {
    try {
      const { items } = this.state;
      const storedItems = await this.getData('items');

      const already = await this.alreadyInStorage(item);

      if (!already) {
        const modifiedItem = { ...item, isFavorited: true };
        const mergeItems = [...storedItems, modifiedItem];
        await AsyncStorage.setItem('items', JSON.stringify(mergeItems));

        const modifiedItems = items.map(stateItem => {
          if (stateItem.id === item.id) {
            return { ...stateItem, isFavorited: true };
          }
          return stateItem;
        });

        this.setState({ items: modifiedItems });
      } else {
        const filteredItems = storedItems.filter(el => el.id !== item.id);
        await AsyncStorage.setItem('items', JSON.stringify(filteredItems));

        const modifiedItems = items.map(stateItem => {
          if (stateItem.id === item.id) {
            return { ...stateItem, isFavorited: false };
          }
          return stateItem;
        });

        this.setState({ items: modifiedItems });
      }
    } catch (error) {
      console.tron.log(error);
    }
  };

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
                <Item action={this.storeData} position={index} item={item} />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
