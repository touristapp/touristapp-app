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
    * @ MAKES A FIRST INIT FETCH SUITE
    */
    useEffect(()=>{
      reloadFetches();
    },[])

    /**
    * @progress
    * @ HANDLE PROGRESS BAR
    */
    useEffect(()=> {
      if (progress>=1) {
        return dispatch({type: 'isLoading', wait: false});
      }
    },[progress]);

    /**
    * @isLoading
    * @ HANDLE LOADING IF EVERYTHING IS WELL FETCHED
    */
    useEffect(()=> {
        if (isLogged && currentUser.id!==null) {
          if ((currentUser.VehicleId===null) ||
             (userVehicle.id!==null && vehicleFuel!==undefined && vehicleFuel.id!==null)) {
            dispatch({type: 'isLoading', wait: false});
          }
        } else {
          dispatch({type: 'isLoading', wait: true});
          reloadFetches();
        }
      },[isLogged,currentUser,userVehicle,vehicleFuel])

    /**
    * @token
    * @currentUser
    * @userVehicle
    * @vehicleFuel
    * @ FETCHES ALL USER DATAS NEEDED
    */
    const reloadFetches = () => {
      dispatch({type:'progress',load:0});
      if (token==='') {
        Storage.retrieve('token').then( result => {

          if (result!==undefined && result!==null) {
            Fetch.authorizeUser(result).then( auth => {
              const authentication = {token: result, decoded: auth.data.decoded};
              dispatch({type:'progress',load:0.25});
              dispatch({type:'token',retrieve:{token:result, data:auth.data} });
              dispatch({type: 'isLogged',status: true});

              Fetch.getCurrentUser(authentication).then( user => {
                dispatch({type:'progress',load:0.50});
                dispatch({type: 'currentUser', define: user.data});
                if(user.data.VehicleId===null) dispatch({type:'progress',load:1});

                Fetch.getUserVehicle(user.data.VehicleId,authentication).then( vehicle => {
                  dispatch({type:'progress',load:0.75});
                  dispatch({type: 'userVehicle', setVehicle: vehicle.data});

                  Fetch.getVehicleFuel(user.data.VehicleId,authentication).then( fuel => {
                    dispatch({type:'progress',load:1});
                    dispatch({type: 'vehicleFuel', setFuel: fuel.data})
                  })
                })
              });
            });
          } else {
           dispatch({type: 'isLoading', wait: false});
          }
        });
      }
    }

    const _handleIndexChange = index => setIndex(index);

    const _renderScene = BottomNavigation.SceneMap({ home: homeRoute(isLogged), search: searchRoute(isLogged), account: accountRoute(isLogged), })

    return (
        <>
            {isLoading &&
              <>
              {token==='' && isLoading===true &&
                <View  style={Style.container}>
                  <ActivityIndicator style={{alignSelf:'center'}} size='large' animating={true} color={colors.SEA} />
                </View>
              }
              {token!=='' && isLoading===true &&
                <View style={Style.container}>
                  <Caption style={{color:colors.WHITE,fontSize:18,fontWeight:'bold'}}>Récupération des données...</Caption>
                  <ProgressBar progress={progress} color={colors.SEA} style={{width: 300, height:30, borderRadius: 10, alignSelf:'center'}}/>
                </View>
              }
              </>
            }
            {!isLoading &&
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
