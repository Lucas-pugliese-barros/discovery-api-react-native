/* eslint-disable no-undef */
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import Item from '~/components/Item';
import { LOCAL } from '~/config/metric';

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
    loading: false,
  };

  componentDidMount() {
    try {
      this.setState({ loading: true });
      const db = SQLite.openDatabase('favorites.db', '1.0', '', -1);
      const items = [];
      db.transaction(txc => {
        console.time(LOCAL);
        txc.executeSql('SELECT * FROM `api`', [], (tx, res) => {
          console.timeEnd(LOCAL);
          for (let i = 0; i < res.rows.length; i += 1) {
            items.push(res.rows.item(i));
          }
          this.setState({ items });
          this.setState({ loading: false });

          tx.executeSql('DELETE FROM `api`', []);
        });
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  render() {
    const { items, loading } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {!loading && (
              <FlatList
                id="favoritesFlatList"
                testID="favoritesFlatList"
                data={items}
                horizontal={false}
                numColumns={1}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                  <Item position={index} item={item} />
                )}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
