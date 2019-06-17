import {AppRegistry} from 'react-native';
// ignore errors
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

import App from './src/App';
import {name as appName} from './app.json';



AppRegistry.registerComponent(appName, () => App);
