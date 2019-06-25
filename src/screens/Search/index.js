// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/search';

// Screens imports
import CreateRoute from './CreateRoute';
import Disconnected from '../Disconnected';

// Hooks imports
import { useStateValue } from '../../hooks/state'

// Components imports
import { View } from 'react-native';

export default function Account() {
    const [{ isLogged, SearchScreen }, dispatch] = useStateValue();

    renderSwitch = (SearchScreen) => {
        switch(SearchScreen) {
            case 'createRoute':
                return <CreateRoute/>
            default:
                dispatch({
                    type: 'switchScreen',
                    tab: 'SearchScreen',
                    screen: 'createRoute'
                })
        }
    }

    return (
        <View style={Style.mainContainer}>
            {isLogged && (
                this.renderSwitch(SearchScreen)
            )}
            {!isLogged && (
                <Disconnected/>
            )}
        </View>
    )
}