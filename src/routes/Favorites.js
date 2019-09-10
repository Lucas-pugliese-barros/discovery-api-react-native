import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Text,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

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
      const db = SQLite.openDatabase('test.db', '1.0', '', 1);
      // eslint-disable-next-line no-unused-vars
      const items = [];
      db.transaction(txc => {
        txc.executeSql('SELECT * FROM `api`', [], (tx, res) => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < res.rows.length; ++i) {
            items.push(res.rows.item(i));
          }
          this.setState({ items });
        });
      });
    } catch (error) {
      console.tron.log(error);
    }
  }

  render() {
    const { items } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text>{items.length}</Text>
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
