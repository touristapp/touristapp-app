/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';

// ignore specific yellowbox warnings
YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);

export default function Main() {
  return (
    <PaperProvider>
        <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
