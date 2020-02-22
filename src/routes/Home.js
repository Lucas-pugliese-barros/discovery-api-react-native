/* eslint-disable no-undef */
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, FlatList } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import Item from '~/components/Item';
import HeartButton from '~/components/HeartButton';
import { SQL_CREATE_TABLE, SQL_INSERT_VALUES } from '~/config/db';

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
  };

  /*
    Função executada quando o componente é montado.

    Executa uma requisição para a API do Google
    Adiciona o status 'isFavorited' para controlar cor do checkbox

    Não me preocupei em resetar os status ao voltar da tela de Favoritos
    para tela início. Imagino que a cada teste o aplicativo seja 'resetado'
  */
  async componentDidMount() {
    try {
      const call = await fetch('https://www.googleapis.com/discovery/v1/apis');

      if (!call.ok) {
        throw Error('Erro na requisição');
      }

      const response = await call.json();

      const items = response.items.map(item => ({
        ...item,
        isFavorited: 0,
      }));

      this.setState({ items });
    } catch (error) {
      console.tron.log(error);
    }
  }

  /*
    Adiciona o item no banco de dados do SQLite

    Se for seguir a lógica do Flutter, acho que seria isso:

    const COUNT = 0
    COUNT += 1 (ao final do db.transaction)
    se COUNT === 3 parar contagem
  */
  storeData = item => {
    try {
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
      });
      // Nessa parte do código o item já foi adicionado no banco de dados

      /*
        Aqui é mais estético... 
        É só um controle pra trocar a cor do checkbox
      */
      const { items } = this.state;
      const modifiedItems = items.map(stateItem => {
        if (stateItem.id === item.id) {
          return { ...stateItem, isFavorited: 1 };
        }
        return stateItem;
      });

      this.setState({ items: modifiedItems });
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
