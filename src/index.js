import './config/ReactotronConfig';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '~/routes/Home';
import FavoritesScreen from '~/routes/Favorites';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Favorites: { screen: FavoritesScreen },
});

const App = () => createAppContainer(MainNavigator);

export default App;
