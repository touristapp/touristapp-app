// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/home';

// Screens imports
import ViewHome from './ViewHome';
import MyTravels from './MyTravels';
import Disconnected from '../Disconnected';

// Hooks imports
import { useStateValue } from '../../hooks/state'

// Components imports
import { View } from 'react-native';

export default function Home() {
    const [{ isLogged, HomeScreen }, dispatch] = useStateValue();

    renderSwitch = (HomeScreen) => {
        switch(HomeScreen) {
            case 'viewHome':
                return <ViewHome/>
            case 'myTravels':
                return <MyTravels/>
            default:
                dispatch({
                    type: 'switchScreen',
                    tab: 'HomeScreen',
                    screen: 'viewHome'
                })
        }
    }

    return (
        <View style={Style.mainContainer}>
            {isLogged && (
                this.renderSwitch(HomeScreen)
            )}
            {!isLogged && (
                <Disconnected/>
            )}
        </View>
    )
}