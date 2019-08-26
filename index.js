import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

const RouteApp = App();

AppRegistry.registerComponent(appName, () => RouteApp);
