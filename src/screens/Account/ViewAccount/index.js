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
    const [{showSnack, isLoading, currentUser, userVehicle}, dispatch ] = useStateValue();

    useEffect(() => {
      if(currentUser.id===null) {
        Promise.resolve(Storage.retrieve('token'))
          .then( async (token) => {
            dispatch({type:'isLoading',wait:true});
            if (token!==undefined && token!==null) {
              dispatch({type: 'isLoading',wait: true});
              const url = "https://touristapi.herokuapp.com/api/auth/authorize"
              const body = JSON.stringify({token: token})
              const response = await Fetch.post(url, body);
              const json = Promise.resolve(response.json()).then(async res =>{
                dispatch({type:'isLoading',wait:true});
                if(response.status === 200) {
                  const user = await Fetch.get(
                    `https://touristapi.herokuapp.com/api/user/${res.data.decoded.id}`,
                    token
                  );
                  const jsonUser = Promise.resolve(user.json()).then(async rs =>{
                    dispatch({type:'isLoading',wait:true});
                    if(response.status === 200) {
                      const vehicle = await Fetch.get(
                        `https://touristapi.herokuapp.com/api/vehicle/${rs.data.VehicleId}`,
                        token
                      );
                      const jsonVehicle = Promise.resolve(vehicle.json()).then(async r =>{
                        dispatch({type: 'isLoading',wait: false});
                        dispatch({type: 'currentUser',define: rs.data})
                        if (r!==null) dispatch({type: 'userVehicle',setVehicle: r.data})
                      })
                    }
                  });
                }
              });
            }
          }).catch(err=>dispatch({type: 'isLoading',wait:false}));
        }
    }, []);

    const logout = () => {
      dispatch({
          type: 'isLogged',
          status: false
      });
      Snack.warning('Logged out !',showSnack,dispatch);
      Storage.clear();
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
                            Consommation : {userVehicle.conso}
                        </Text>
                        <Text>
                            FuelId : {userVehicle.FuelId}
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
