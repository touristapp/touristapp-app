// React imports
import React, { useState, useEffect, useLayoutEffect } from 'react';

// Style imports
import Style from '../../styles/navigation';
import { colors } from '../../styles/themes/variables';

// Screens imports
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Account from '../../screens/Account';
import Auth from '../../screens/Auth';
import Disconnected from '../../screens/Disconnected';

// Hooks imports
import { useStateValue } from '../../hooks/state';

// Components imports
import { View } from 'react-native';
import { BottomNavigation, Snackbar, ActivityIndicator, Caption, ProgressBar } from 'react-native-paper';

// Routes
const homeRoute = isLogged => isLogged ? Home : Disconnected;
const searchRoute = isLogged => isLogged ? Search : Auth;
const accountRoute = isLogged => isLogged ? Account : Auth;

export default function Navigation() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'search', title: 'Itinéraire', icon: 'airplanemode-active' },
		  { key: 'home', title: 'Mes voyages', icon: 'card-travel' },
		  { key: 'account', title: 'Mon compte', icon: 'account-circle' }
    ]);
		const [{ token, isLoading, showSnack, snackContent, isLogged, currentUser, userVehicle, vehicleFuel, progress }, dispatch] = useStateValue();

    /**
    * @token
    * @ AUTHORIZE USER BY CHECKING TOKEN
    */
    useEffect(()=>{
      console.log('CALL AUTH');
      dispatch({type: 'isLoading',wait: true});
      dispatch({type:'progress',load:0});
      if (token==='') {
        Storage.retrieve('token').then( result => {
          if (result!==undefined && result!==null) {
            Fetch.authorizeUser(result).then( auth => {
              dispatch({type:'token',retrieve:{token:result, data:auth.data} });
              dispatch({type: 'isLogged',status: true});
            })
          } else {
            dispatch({type: 'isLoading', wait: false});
          }
          dispatch({type:'progress',load:progress+0.25});
        });
      }
    },[])

    /**
    * @currentUser
    * @ FETCH USER DATA
    */
    useEffect(()=> {
      console.log('CALL USER');
      if (token!=='' && currentUser.id===null) {
        if (!isLoading) dispatch({type: 'isLoading', wait: true});
        Fetch.getCurrentUser(token).then( async user => {
          dispatch({type: 'currentUser', define: user.data});
          if(user.data.VehicleId===null) dispatch({type:'progress',load:1});
        });
        dispatch({type:'progress',load:progress+0.25});
      }
    },[token])

    /**
    * @userVehicle
    * @ FETCH USER VEHICLE
    */
    useEffect(()=> {
      console.log('CALL USER');
      if (token!=='' && currentUser.VehicleId!==null && userVehicle.id===null) {
        if (!isLoading) dispatch({type: 'isLoading', wait: true});
        Fetch.getUserVehicle(currentUser.VehicleId,token).then( vehicle => {
          dispatch({type: 'userVehicle', setVehicle: vehicle.data});
        });
        dispatch({type:'progress',load:progress+0.25});
      }
    },[currentUser])

    /**
    * @vehicleFuel
    * @ FETCH VEHICLE FUEL
    */
    useEffect(()=> {
      console.log('CALL FUEL');
      if (token!=='' && currentUser.VehicleId!==null && userVehicle.Fueld!==null && vehicleFuel.id===null) {
        if (!isLoading) dispatch({type: 'isLoading', wait: true});
        Fetch.getVehicleFuel(currentUser.VehicleId,token).then( fuel => {
          dispatch({type: 'vehicleFuel', setFuel: fuel.data})
        });
        dispatch({type:'progress',load:progress+0.25});
      }
    },[userVehicle])

    /**
    * @progress
    * @ HANDLE PROGRESS BAR
    */
    useEffect(()=> {
      if (progress>=1) {
        return dispatch({type: 'isLoading', wait: false});
      }
    },[progress]);

    const _handleIndexChange = index => setIndex(index);

    const _renderScene = BottomNavigation.SceneMap({ home: homeRoute(isLogged), search: searchRoute(isLogged), account: accountRoute(isLogged), })

    return (
        <>
          {isLoading &&
            <>
            {token==='' &&
              <View  style={Style.container}>
                <ActivityIndicator style={{alignSelf:'center'}} size='large' animating={true} color={colors.SEA} />
              </View>
            }
            {token!=='' &&
              <View style={Style.container}>
                <Caption style={{color:colors.WHITE,fontSize:18,fontWeight:'bold'}}>Récupération des données...</Caption>
                <ProgressBar progress={progress} color={colors.SEA} style={{width: 300, height:30, borderRadius: 10, alignSelf:'center'}}/>
              </View>
            }
            </>
          }
          {!isLoading && currentUser.id!==null &&
            <>
            <BottomNavigation
              navigationState={{ index, routes }}
              onIndexChange={_handleIndexChange}
              renderScene={_renderScene}
              barStyle={{backgroundColor: colors.COAL}}
              activeColor={colors.SKY}
              inactiveColor={colors.WHITE}
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
          }
        </>
    );
}
