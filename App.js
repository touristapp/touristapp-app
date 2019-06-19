import React from 'react';
import Navigation from './src/components/Navigation';
import { colors } from './src/styles/themes/variables';

export default class App extends React.Component {
  render() {
    return (
      <Navigation style={{backgroundColor: colors.SKY}}/>
    );
  }
}
