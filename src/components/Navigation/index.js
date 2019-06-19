import React, {createContext, useContext, useReducer} from 'react';
import { BottomNavigation } from 'react-native-paper';
import { colors } from '../../styles/themes/variables';
import Home from '../../screens/Home'
import Search from '../../screens/Search'
import Account from '../../screens/Account';
import Login from '../../screens/Auth/Login'
import Storage from '../../tools/asyncstorage.js'
import { useStateValue } from '../../hooks/state'

const HomeRoute = () => <Home />;
const SearchRoute = () => <Search />;
const AccountRoute = () => {
    const [{ isLogged }, dispatch ] = useStateValue(); // Get the login state, defined in App.js

    if (isLogged) {
        return <Account />
    } else {
        return <Login />
    }
};

export default class Footer extends React.Component {
    state = {
        index: 0,
        routes: [
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'search', title: 'Search', icon: 'search' },
        { key: 'account', title: 'Account', icon: 'account-circle' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        search: SearchRoute,
        account: AccountRoute,
    });

    render() {
      return (
        <BottomNavigation
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
            barStyle={{backgroundColor: colors.COAL}}
            activeColor={colors.SKY}
            inactiveColor={colors.WHITE}
        />
        );
    }
}
