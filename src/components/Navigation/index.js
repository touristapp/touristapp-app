import React, { useState, useEffect } from 'react';
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
    if (isLogged.isLogged) {
        return <Account />
    } else {
        return <Login />
    }
};

export default function Footer() {
    const [{ isLogged }, dispatch ] = useStateValue(); // Get the login state, defined in App.js
    const [index,setIndex] = useState(0);
    const [routes,setRoutes] = useState([
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'search', title: 'Search', icon: 'search' },
      { key: 'account', title: 'Account', icon: 'account-circle' }
    ]);

    useEffect(
      ()=> {
        //console.log('<<<< index changed >>>>');
      },[index]
    )

    const _handleIndexChange = index => setIndex(index);

    const _renderScene = BottomNavigation.SceneMap({ home: HomeRoute, search: SearchRoute, account: AccountRoute, })

    return (
      <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={_handleIndexChange}
          renderScene={_renderScene}
          barStyle={{backgroundColor: colors.COAL}}
          activeColor={colors.SKY}
          inactiveColor={colors.WHITE}
      />
    );
}
