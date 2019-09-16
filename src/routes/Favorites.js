/* eslint-disable no-undef */
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
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

  componentDidMount() {
    try {
      const db = SQLite.openDatabase('favorites.db', '1.0', '', -1);
      const items = [];
      db.transaction(txc => {
        txc.executeSql('SELECT * FROM `api`', [], (tx, res) => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < res.rows.length; i += 1) {
            items.push(res.rows.item(i));
          }
          this.setState({ items });
        });
      });
    } catch (error) {
      console.tron.log(error);
    }
  }

  componentWillUnmount() {
    const db = SQLite.openDatabase('favorites.db', '1.0', '', 1);
    db.transaction(txn => {
      txn.executeSql('delete from api', []);
    });
  }

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
