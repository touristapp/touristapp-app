// React imports
import React, { useEffect } from 'react';

// Styles imports
import Style from '../../../styles/viewAccount';
import { colors } from '../../../styles/themes/variables';

// Hooks imports
import { useStateValue } from '../../../hooks/state';
import { Fetch, Storage, Snack } from '../../../tools';

// Components imorts
import Banner from '../../../components/Banner'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button, Caption, ActivityIndicator, Provider, ProgressBar, DataTable } from 'react-native-paper';
import EditInfos from '../EditInfos';
import EditVehicle from '../EditVehicle';
import EditPassword from '../EditPassword';

export default function ViewAccount() {
    const [{showSnack, isLoading, token, currentUser, userVehicle, vehicleFuel, progress}, dispatch ] = useStateValue();

    /**
    * @token
    * @ AUTHORIZE USER BY CHECKING TOKEN
    */
    useEffect(()=> {
      dispatch({type: 'progress', load: 0})
      dispatch({type: 'isLoading', wait: true});
      if (token==='') {
        Storage.retrieve('token').then( result => {
          Fetch.authorizeUser(result).then( auth =>
            dispatch({type:'token',retrieve:{token:result, data:auth.data} }));
        })
      }
    },[])

    /**
    * @currentUser
    * @ FETCH USER DATA
    */
    useEffect(()=> {
      if (token!=='' && currentUser.id===null) {
        if (!isLoading) dispatch({type: 'isLoading', wait: true});
        Fetch.getCurrentUser(token).then( async user =>
          dispatch({type: 'currentUser', define: user.data}) );
      }
    },[token])

    /**
    * @userVehicle
    * @ FETCH USER VEHICLE
    */
    useEffect(()=> {
      if (token!=='' && userVehicle.id===null && currentUser.VehicleId!==null) {
        Fetch.getUserVehicle(currentUser.VehicleId,token).then( vehicle =>
          dispatch({type: 'userVehicle', setVehicle: vehicle.data}) );
      } else dispatch({type: 'isLoading', wait: false});
    },[currentUser])

    /**
    * @vehicleFuel
    * @ FETCH VEHICLE FUEL
    */
    useEffect(()=> {
      if (token!=='' && vehicleFuel.id===null && currentUser.VehicleId!==null) {
        Fetch.getVehicleFuel(userVehicle.FuelId,token).then( fuel =>
          dispatch({type: 'vehicleFuel', setFuel: fuel.data}) );
        dispatch({type:'progress',load:progress+0.25});
      }
    },[userVehicle])

    /**
    * @progress
    * @ HANDLE PROGRESS BAR
    */
    useEffect(()=> {
      if (progress<1) {
        dispatch({type:'progress',load:progress+0.25});
      }
      dispatch({type: 'isLoading', wait: false});
    },[vehicleFuel]);

    /**
    * @isLogged
    * @ LOGOUT
    */
    const logout = () => {
      dispatch({type: 'resetState'});
      Storage.clear();
      Snack.warning('Logged out !',showSnack,dispatch);
    }

    return (
      <Provider>
        <Banner message="Mon compte"/>
        <ScrollView>
        {token==='' &&
          <View  style={Style.container}>
            <ActivityIndicator style={{alignSelf:'center'}} size='large' animating={true} color={colors.SEA} />
          </View>
        }
        {isLoading && currentUser.picture!=='' &&
          <View style={Style.container}>
            <Caption style={{color:colors.WHITE,fontSize:18,fontWeight:'bold'}}>Récupération des données...</Caption>
            <ProgressBar progress={progress} color={colors.SEA} style={{width: 300, height:30, borderRadius: 10, alignSelf:'center'}}/>
          </View>
        }
        {!isLoading && currentUser.picture!=='' &&
            <>
                <View style={Style.header}>
                  <Image style={Style.headerImage} source={require('../../../assets/accountbg_small.png')} />
                </View>
                <Image style={Style.avatar} source={{uri: currentUser.picture}}/>
                <View style={Style.body}>
                  <View style={Style.bodyContent}>
                    <Text style={Style.name}>{currentUser.name}</Text>

                  {/*********** INFORMATIONS **********/}
                    <DataTable style={{marginTop:20,flex:1}}>
                      <EditInfos />

                {/*********** VEHICLE **********/}
                      <EditVehicle />
                {/*********** PASSWORD **********/}
                      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                        <DataTable.Title>MA CONNEXION</DataTable.Title>
                      </DataTable.Header>
                      <DataTable.Row style={Style.datarow}>
                        <DataTable.Cell>Mot de passe</DataTable.Cell>
                        <DataTable.Cell>●●●●●●●●</DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row style={Style.datarow}>
                        <Button style={Style.editVehicle} icon="security" color={colors.SEA} mode="text" onPress={() => dispatch({ type: 'switchScreen', tab: 'AccountScreen', screen: 'editPassword' })}>
                            Modifier mon mot de passe
                        </Button>
                      </DataTable.Row>
                      <DataTable.Row style={Style.datarow}>
                        <Button style={Style.editVehicle} icon="remove-circle" color={colors.CARROT} mode="text" onPress={logout}>
                            Déconnexion
                        </Button>
                      </DataTable.Row>
                    </DataTable>

                  </View>
                </View>
              </>
              }
            </ScrollView>
      </Provider>
    )
}
