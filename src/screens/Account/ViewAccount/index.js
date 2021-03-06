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
import { View, Text, Image, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Button, Caption, ActivityIndicator, Provider, ProgressBar, DataTable } from 'react-native-paper';
import EditInfos from '../EditInfos';
import EditVehicle from '../EditVehicle';
import EditPassword from '../EditPassword';
import ImagePicker from "react-native-image-picker";

export default function ViewAccount() {
    const [{showSnack, isLoading, token, currentUser, userVehicle, vehicleFuel, progress, switchScreen}, dispatch ] = useStateValue();

    /**
    * @currentUser
    * @ UPDATE USER PROFILE PICTURE
    */
    const chooseImage = () => {
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        }
      };
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel || response.customButton) {
          Snack.warning('Édition annulée !',showSnack,dispatch);
        } else if (response.error) {
          Snack.danger('Erreur lors de l\'édition d\'image !',showSnack,dispatch);
        } else {
          let updatedUser = currentUser;
          Fetch.postPicture(currentUser.id, createFormData(response), token).then( res => {
            let oldImageUri = currentUser.picture;
            updatedUser.picture = res.imageUrl;
            dispatch({type: 'currentUser', define: updatedUser});
            try{
              Fetch.deletePicture(oldImageUri.replace("https://touristapps3.s3.eu-west-3.amazonaws.com/", ""), token)
            }
            catch(err){
              Snack.danger('Erreur lors de l\'édition d\'image !',showSnack,dispatch);
            }
          })
        }
    })
  }

    /**
    * @photo
    * @ FORMATS DATA FOR IMAGEPICKER API
    */
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
          <View style={Style.header}>
            <Image style={Style.headerImage} source={require('../../../assets/accountbg_small.png')} />
          </View>
          <TouchableOpacity style={Style.touchable} onPress = {chooseImage} >
            {currentUser.picture!=='' &&
              <Image style={Style.avatar} source={{uri: currentUser.picture}} />
            }
          </TouchableOpacity>
          <View style={Style.body}>
            <View style={Style.bodyContent}>
              <Text style={Style.name}>{currentUser.name}</Text>
              <DataTable style={{marginTop:20,flex:1}}>

                <EditInfos />
                <EditVehicle />
                <EditPassword />

              </DataTable>
            </View>
          </View>
      </ScrollView>
      </Provider>
    )
}
