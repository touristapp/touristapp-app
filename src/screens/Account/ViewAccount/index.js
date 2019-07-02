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
import { View, Text, Image, ScrollView } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';

export default function ViewAccount() {
    const [{showSnack, isLoading, token, currentUser, userVehicle, vehicleFuel}, dispatch ] = useStateValue();

    /**
    * @ AUTHORIZE USER BY CHECKING TOKEN
    */
    useEffect(()=> {
      if (token==='') {
        Storage.retrieve('token').then( result => {
          Fetch.authorizeUser(result).then( auth =>
            dispatch({type: 'token', retrieve: { token: result, data: auth.data } }));
        });
      }
    },[])

    /**
    * @ FETCH USER DATA
    */
    useEffect(()=> {
      if (token!=='' && currentUser.id===null) {
        if (!isLoading) dispatch({type: 'isLoading', wait: true});
        Fetch.getCurrentUser(token).then( user =>
          dispatch({type: 'currentUser', define: user.data}) );
      }
    },[token])

    /**
    * @ FETCH USER VEHICLE
    */
    useEffect(()=> {
      if (token!=='' && userVehicle.id===null) {
        Fetch.getUserVehicle(currentUser.VehicleId,token).then( vehicle =>
          dispatch({type: 'userVehicle', setVehicle: vehicle.data}) );
      }
    },[currentUser])

    /**
    * @ FETCH VEHICLE FUEL
    */
    useEffect(()=> {
      if (token!=='' && vehicleFuel.id===null) {
        Fetch.getVehicleFuel(userVehicle.FuelId,token).then( user =>
          dispatch({type: 'vehicleFuel', setFuel: user.data}) );
        if (isLoading) dispatch({type: 'isLoading', wait: false});
      }
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
        <Banner message="Mon compte"/>
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
                </View>
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
      </>
    )
}
