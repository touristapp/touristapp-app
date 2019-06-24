import React from 'react';
import Navigation from './src/components/Navigation';
import { colors } from './src/styles/themes/variables';
import { StateProvider } from './src/hooks/state';

const App = () => {
  /*Define default states here*/
  const initialState = {
    isLogged: true,
    currentScreen: 'viewAccount'
  };

  /*Define how states would be updated by some actions*/
  const reducer = (state, action) => {
    switch (action.type) {
      case 'authenticate':
        return (
        { ...state,
          isLogged: action.authenticate
        });
      case 'logout':
        return (
        {...state,
          isLogged: action.logout
        });
      case 'switchScreen':
        return(
        {...state,
          currentScreen: action.switch
        });
      default:
        return state;
    }
  };

  /*Wrap the App inside the state Context*/
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        <Navigation style={{backgroundColor: colors.SKY}}/>
    </StateProvider>
  );
}

export default App;
