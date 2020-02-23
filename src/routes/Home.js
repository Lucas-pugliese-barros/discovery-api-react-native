/* eslint-disable no-undef */
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import Item from '~/components/Item';
import HeartButton from '~/components/HeartButton';
import { SQL_CREATE_TABLE, SQL_INSERT_VALUES } from '~/config/db';
import { REMOTE, LIKE_API, LIST_REMOTE } from '~/config/metric';

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
    headerRight: <HeartButton />,
  };

  state = {
    items: [],
    loading: false,
  };

  async componentDidMount() {
    try {
      this.loading = true;
      console.time(REMOTE);
      const call = await fetch('https://www.googleapis.com/discovery/v1/apis');

      if (!call.ok) {
        throw Error('Erro na requisição');
      }

      const response = await call.json();
      console.timeEnd(REMOTE);

      const items = response.items.map(item => ({
        ...item,
        isFavorited: 0,
      }));
      console.time(LIST_REMOTE);

      this.setState({ loading: false });
      this.setState({ items });
    } catch (error) {
      console.log(error);
    }
  }

  storeData = (item, index) => {
    try {
      if (index === 0) console.time(LIKE_API);

      const db = SQLite.openDatabase('favorites.db', '1.0', '', -1);
      db.transaction(txn => {
        txn.executeSql(SQL_CREATE_TABLE, []);
        txn.executeSql(SQL_INSERT_VALUES, [
          item.id,
          item.kind,
          item.name,
          item.version,
          item.title,
          item.description,
          item.discoveryRestUrl,
          item.documentationLink,
          item.preferred,
          1,
        ]);
        if (index === 0) console.timeEnd(LIKE_API);
      });

      const { items } = this.state;
      const modifiedItems = items.map(stateItem => {
        if (stateItem.id === item.id) {
          return { ...stateItem, isFavorited: 1 };
        }
        return stateItem;
      });

      this.setState({ items: modifiedItems });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { items, loading } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {!loading && (
              <FlatList
                id="remoteFlatList"
                testID="remoteFlatList"
                data={items}
                horizontal={false}
                numColumns={1}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                  <Item action={this.storeData} position={index} item={item} />
                )}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
