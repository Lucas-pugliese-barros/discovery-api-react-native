import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, Text, StatusBar } from 'react-native';

const FavoritesScreen = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Favorites</Text>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default FavoritesScreen;
