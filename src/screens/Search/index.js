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
import SearchResult from './SearchResult';

export default function Account() {
    const [{ isLogged, SearchScreen }, dispatch] = useStateValue();

    const renderSwitch = (SearchScreen) => {
        switch(SearchScreen) {
            case 'createRoute':
                return <CreateRoute/>
            case 'searchResult':
                return <SearchResult/>
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
              {renderSwitch(SearchScreen)}
        </View>
    )
    /*
    {isLogged && (
        this.renderSwitch(SearchScreen)
    )}
    {!isLogged && (
        <Disconnected/>
    )}
    */
}
