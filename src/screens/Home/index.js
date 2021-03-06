// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/home';

// Screens imports
import ViewHome from './ViewHome';
import MyTravels from './MyTravels';
import MyStats from './MyStats'
import MySearches from './mySearches';
import Disconnected from '../Disconnected';

// Hooks imports
import { useStateValue } from '../../hooks/state'

// Components imports
import { View } from 'react-native';


export default function Home() {
    const [{ isLogged, HomeScreen }, dispatch] = useStateValue();

    const renderSwitch = (HomeScreen) => {
        switch(HomeScreen) {
            case 'viewHome':
                return <ViewHome/>
            case 'myTravels':
                return <MyTravels/>
            case 'myStats':
                return <MyStats/>
            case 'mySearches':
                return <MySearches/>
            default:
                dispatch({
                    type: 'switchScreen',
                    tab: 'HomeScreen',
                    screen: 'viewHome'
                })
        }
    }

    return (
      <>
          {!isLogged && (
              <Disconnected/>
          )}
          {isLogged && (
            <View style={Style.mainContainer}>
              {renderSwitch(HomeScreen)}
            </View>
          )}
      </>
    )
}
