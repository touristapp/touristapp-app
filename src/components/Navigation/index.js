// React imports
import React, { useState, useEffect } from 'react';

// Style imports
import { colors } from '../../styles/themes/variables';

// Screens imports
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Account from '../../screens/Account';
import Auth from '../../screens/Auth';

// Hooks imports
import { useStateValue } from '../../hooks/state';

// Components imports
import { BottomNavigation, Snackbar, ActivityIndicator } from 'react-native-paper';

// Routes
const HomeRoute = () =>  {
  return <Home/>
};
const SearchRoute = () => <Search/>;
const AccountRoute = () => {
	 // Get the login state defined in App.js
   const [{isLogged}] = useStateValue();
   if (isLogged) {
     return <Account/>
   } else {
     return <Auth/>
   }
};

export default function Navigation() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
		{ key: 'home', title: 'Accueil', icon: 'home' },
		{ key: 'search', title: 'Recherches', icon: 'search' },
		{ key: 'account', title: 'Mon compte', icon: 'account-circle' }
    ]);
		const [{ showSnack, snackContent, isLoading }, dispatch] = useStateValue();

    useEffect(
			()=> {
				//console.log('<<<< index changed >>>>');
			}, [index]
    )

    const _handleIndexChange = index => setIndex(index);
    const _renderScene = BottomNavigation.SceneMap({ home: HomeRoute, search: SearchRoute, account: AccountRoute, })
    
    setMainViews = () => {
      dispatch({
        type: 'switchScreen',
        tab: 'HomeScreen',
        screen: 'viewHome'
      }) &&
      dispatch({
        type: 'switchScreen',
        tab: 'AccountScreen',
        screen: 'viewAccount'
      }) &&
      dispatch({
        type: 'switchScreen',
        tab: 'SearchScreen',
        screen: 'createRoute'
      })
    }

    return (
        <>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={_handleIndexChange}
            renderScene={_renderScene}
            barStyle={{backgroundColor: colors.COAL}}
            activeColor={colors.SKY}
            inactiveColor={colors.WHITE}
            onTabPress={() => setMainViews()}
          />
          <Snackbar
          visible={showSnack}
          onDismiss={() => dispatch({
              type: 'showSnackbar',
              showSnack: false
          })}
          action={{
            label: 'Close',
            onPress: () => {
              // onPress on the snackbar
            }
          }}
          duration={500}
          style={snackContent.style}
          theme={snackContent.theme}
          >
          {snackContent.message}
          </Snackbar>
        </>
    );
}
