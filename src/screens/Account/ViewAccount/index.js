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
import { Button, Caption, ProgressBar, DataTable } from 'react-native-paper';

export default function ViewAccount() {
    const [{showSnack, isLoading, token, currentUser, userVehicle, vehicleFuel, progress}, dispatch ] = useStateValue();

    /**
    * @ AUTHORIZE USER BY CHECKING TOKEN
    */
    useEffect(()=> {
      dispatch({type: 'isLoading', wait: true});
      if (token==='') {
        Storage.retrieve('token').then( result => {
          Fetch.authorizeUser(result).then( auth =>
            dispatch({type:'token',retrieve:{token:result, data:auth.data} }) );
        })
      } else {
        dispatch({type: 'isLoading', wait: false});
      }
    },[])

    /**
    * @ HANDLE PROGRESS BAR
    */
    useEffect(()=>dispatch({type:'progress',load:isLoading? progress+0.25 : 0}),[isLoading])

    /**
    * @ FETCH USER DATA
    */
    useEffect(()=> {
      if (token!=='' && currentUser.id===null) {
        if (!isLoading) dispatch({type: 'isLoading', wait: true});
        Fetch.getCurrentUser(token).then( user =>
          dispatch({type: 'currentUser', define: user.data}) );
      }
      dispatch({type: 'progress', load: progress+0.25})
    },[token])

    /**
    * @ FETCH USER VEHICLE
    */
    useEffect(()=> {
      if (token!=='' && userVehicle.id===null) {
        Fetch.getUserVehicle(currentUser.VehicleId,token).then( vehicle =>
          dispatch({type: 'userVehicle', setVehicle: vehicle.data}) );
      }
      dispatch({type: 'progress', load: progress+0.25})
    },[currentUser])

    /**
    * @ FETCH VEHICLE FUEL
    */
    useEffect(()=> {
      if (token!=='' && vehicleFuel.id===null) {
        Fetch.getVehicleFuel(userVehicle.FuelId,token).then( user => {
          dispatch({type: 'vehicleFuel', setFuel: user.data});
          dispatch({type: 'isLoading', wait: false});
        });
      }
      dispatch({type: 'progress', load: progress+0.25})
    },[userVehicle])

    /**
    * @ LOGOUT
    */
    const logout = () => {
      Storage.clear();
      Snack.warning('Logged out !',showSnack,dispatch);
      dispatch({type: 'isLogged',status: false});
    }

    return (
      <>
        {isLoading && currentUser.picture!=='' &&
          <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
            <Caption style={{color:colors.WHITE,fontSize:18,fontWeight:'bold'}}>Please wait, we prepare your account...</Caption>
            <ProgressBar progress={progress} color={colors.SEA} style={{width: 300, height:30, borderRadius: 10}}/>
          </View>
        }
        {!isLoading && currentUser.picture!=='' &&
          <>
            <Banner message="Mon compte"/>
            <ScrollView contentContainerStyle={Style.container}>
                <View style={Style.header}></View>
                <Image style={Style.avatar} source={{uri: currentUser.picture}}/>
                <View style={Style.body}>
                  <View style={Style.bodyContent}>
                    <Text style={Style.name}>{currentUser.name}</Text>

                    <DataTable style={{marginTop:20,flex:1}}>
                      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:20, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                        <DataTable.Title style={{marginLeft:10}}>MES INFORMATIONS</DataTable.Title>
                      </DataTable.Header>
                      <DataTable.Row style={Style.datarow}>
                        <DataTable.Cell>Pseudo</DataTable.Cell>
                        <DataTable.Cell>{currentUser.name}</DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row style={Style.datarow}>
                        <DataTable.Cell>Email</DataTable.Cell>
                        <DataTable.Cell>{currentUser.email}</DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row style={Object.assign({borderBottomRightRadius:20},Style.datarow)}>
                        <Button style={Style.editVehicle} icon="person-pin" color={colors.SEA} mode="text" onPress={() => dispatch({ type: 'switchScreen', tab: 'AccountScreen', screen: 'editInfos' })}>
                            Modifier mes informations
                        </Button>
                      </DataTable.Row>

                      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                        <DataTable.Title style={{marginLeft:10}}>MON VÉHICULE</DataTable.Title>
                      </DataTable.Header>
                      <DataTable.Header style={{backgroundColor:colors.CREAM}}>
                        <DataTable.Title>Nom</DataTable.Title>
                        <DataTable.Title numeric>Consommation</DataTable.Title>
                        <DataTable.Title numeric>Carburant</DataTable.Title>
                      </DataTable.Header>
                      <DataTable.Row style={Style.datarow}>
                        <DataTable.Cell>{userVehicle.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{userVehicle.conso} L/100</DataTable.Cell>
                        <DataTable.Cell numeric>{vehicleFuel.carbonFootprint} {vehicleFuel.unit}</DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row style={Style.datarow}>
                        <Button style={Style.editVehicle} icon="directions-car" color={colors.SEA} mode="text" onPress={() => dispatch({ type: 'switchScreen', tab: 'AccountScreen', screen: 'editVehicle' })}>
                            Modifier mon véhicule
                        </Button>
                      </DataTable.Row>


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
            </ScrollView>
          </>
        }
      </>
    )
}

/*
<ScrollView contentContainerStyle={Style.mainContainer}>
  {isLoading && currentUser.picture==='' &&
    <ActivityIndicator size='large' animating={true} color={colors.SEA} style={{marginVertical: 100}}/>
  }
  {!isLoading && currentUser.picture!=='' &&
    <>
    <View style={Style.infoContainer}>
        <View style={Style.imageContainer}>
          <Image
              style={Style.profileImage}
              source={{uri: currentUser.picture}}
          />
          <Button icon="add-a-photo" mode="contained" style={Style.buttonPhoto} onPress={() => console.log('Pressed')}>
            Modifier
          </Button>
        </View>
        <View>
            <Text style={Style.boldCenteredText}>{currentUser.name}</Text>
            <Text style={Style.email}>{currentUser.email}</Text>
            <Button
                style={Style.editInfos}
                icon="edit"
                mode="contained"
                onPress={() => dispatch({
                    type: 'switchScreen',
                    tab: 'AccountScreen',
                    screen: 'editInfos'
                })}>
                Modifier mes informations
            </Button>
            <Button
                style={Style.editPassword}
                icon="lock"
                mode="contained"
                onPress={() => dispatch({
                    type: 'switchScreen',
                    tab: 'AccountScreen',
                    screen: 'editPassword'
                })}>
                Modifier mon mot de passe
            </Button>
        </View>
        <View style={Style.carContainer}>
            <Text style={Style.boldCenteredText}>{userVehicle.name}</Text>
            <View style={Style.subCarContainer}>
                <Text>
                    Consommation : {userVehicle.conso}L/100
                </Text>
                <Text>
                    {vehicleFuel.name} ({vehicleFuel.carbonFootprint}T/an)
                </Text>
            </View>
            <Button
                style={Style.editVehicle}
                icon="directions-car"
                mode="contained"
                onPress={() => dispatch({
                    type: 'switchScreen',
                    tab: 'AccountScreen',
                    screen: 'editVehicle'
                })}>
                Modifier mon véhicule
            </Button>
        </View>
        <Button
            style={Style.disconnect}
            icon="exit-to-app"
            mode="contained"
            onPress={logout}>
            Déconnexion
        </Button>
    </View>
    </>}
</ScrollView>
*/
