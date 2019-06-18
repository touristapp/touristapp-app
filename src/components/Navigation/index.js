import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { colors } from '../../themes/variables';
import Home from '../../screens/Home'
import Search from '../../screens/Search'
import Account from '../../screens/Account';

const HomeRoute = () => <Home />;
const SearchRoute = () => <Search />;
const AccountRoute = () => {
    //todo: remove '|| true' and get from context if the user isLogged or not
    if ({/*isLogged*/} || true) {
        return <Account />
    } else {
        return <Login />
    }
};

export default class Navigation extends React.Component {
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
