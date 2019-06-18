import React from 'react';
import AppNavigator from './src/navigation';

export default class App extends React.Component {
  render() {
    return (
        <AppNavigator ref={navigatorRef => this.navigatorRef = navigatorRef} />
    );
  }
}
