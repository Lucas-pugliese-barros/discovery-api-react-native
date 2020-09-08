import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import 'react-native-console-time-polyfill';

const RouteApp = App();

AppRegistry.registerComponent(appName, () => RouteApp);
