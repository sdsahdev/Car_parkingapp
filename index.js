/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-reanimated';

import App from './App';
// import App from './src2/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
