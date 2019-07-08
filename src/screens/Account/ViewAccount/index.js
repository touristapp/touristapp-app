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
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { Button, Caption, Provider, ProgressBar, DataTable } from 'react-native-paper';
import EditInfos from '../EditInfos';
import EditVehicle from '../EditVehicle';
import EditPassword from '../EditPassword';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import ImagePicker from "react-native-image-picker";

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
        console.log('Stopping : '+progress);
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

    const chooseImage = () => {
      // TODO: names for Menu
      const options = {
        title: 'Select Avatar',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log("Fetching post request to add an image");
          let updatedUser = currentUser;
          Fetch
            .postPicture(currentUser.id, createFormData(response), token.token)
            .then( res => {
              let oldImageUri = currentUser.picture;
              updatedUser.picture = res.imageUrl;
              dispatch({type: 'currentUser', define: updatedUser});
              try{
                Fetch.deletePicture(oldImageUri.replace("https://touristapps3.s3.eu-west-3.amazonaws.com/", ""), token.token)
              }
              catch(err){
                console.log("ERROR in proceeding to delete image: ", err.message)
              }
            })
            .then( () => {
            })
            .catch(err => console.log(`ERROR in fetching new image: ${err}`));
        }
    })
  }

    const createFormData = (photo) => {
      const data = new FormData();
    
      data.append("image", {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      });
      return data;
    };

    return (
      <Provider>
        {isLoading && currentUser.picture!=='' &&
          <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
            <Caption style={{color:colors.WHITE,fontSize:18,fontWeight:'bold'}}>Récupération des données...</Caption>
            <ProgressBar progress={progress} color={colors.SEA} style={{width: 300, height:30, borderRadius: 10}}/>
          </View>
        }
        {!isLoading && currentUser.picture!=='' &&
          <>
            <Banner message="Mon compte"/>
            <ScrollView contentContainerStyle={Style.container}>
                <View style={Style.header}>
                        <Image style={Style.headerImage} source={require('../../../assets/accountbg_small.png')} />
                </View>
                <TouchableOpacity style={Style.touchable} onPress = {chooseImage} >
                    <Image  style={Style.avatar} source={{uri: currentUser.picture}} />
                </TouchableOpacity>
                <View style={Style.body}>
                  <View style={Style.bodyContent}>
                    <Text style={Style.name}>{currentUser.name}</Text>

                  {/*********** INFORMATIONS **********/}
                    <DataTable style={{marginTop:20,flex:1}}>
                      <EditInfos />

                {/*********** VEHICLE **********/}
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
            </ScrollView>
          </>
        }
      </Provider>
    )
}
