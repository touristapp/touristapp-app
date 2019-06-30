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
import { View, Text, Image } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';

export default function ViewAccount() {
    const [{showSnack, isLoading, currentUser}, dispatch ] = useStateValue();

    useEffect(() => {
        Promise.resolve(Storage.retrieve('token'))
          .then( async (token) => {
            if (token!==undefined && token!==null) {
              dispatch({type: 'isLoading',wait: true});
              const url = "https://touristapi.herokuapp.com/api/auth/authorize"
              const body = JSON.stringify({token: token})
              const response = await Fetch.post(url, body);
              const json = Promise.resolve(response.json()).then(async res =>{
                if(response.status === 200) {
                  const user = await Fetch.get(
                    `https://touristapi.herokuapp.com/api/user/${res.data.decoded.id}`,
                    token
                  );
                  const jsonUser = Promise.resolve(user.json()).then(async rs =>{
                    dispatch({type: 'currentUser',define: rs.data})
                  });
                }
              });
            }
          });
        dispatch({type: 'isLoading',wait: false});
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
          <View style={Style.mainContainer}>
            {isLoading &&
              <ActivityIndicator size='large' animating={true} color={colors.SEA} />
            }
            {!isLoading &&
            <>
            <View style={Style.infoContainer}>
                <View style={Style.imageContainer}>
                    <Image
                        style={Style.profileImage}
                        source={{uri: 'https://avatars1.githubusercontent.com/u/1349186?s=180&v=4'}}
                    />
                </View>
                <View>
                    <Text style={Style.boldCenteredText}>{currentUser.name}</Text>
                    <Text style={Style.email}>{currentUser.email}</Text>
                </View>
                <View style={Style.carContainer}>
                    <Text style={Style.boldCenteredText}>{currentUser.VehicleId}</Text>
                    <View style={Style.subCarContainer}>
                        <Text>
                            Consommation :
                        </Text>
                        <Text>
                            Carburant :
                        </Text>
                    </View>
                </View>
                <Button
                    style={Style.edit}
                    icon="edit"
                    mode="contained"
                    onPress={() => dispatch({
                        type: 'switchScreen',
                        tab: 'AccountScreen',
                        screen: 'editAccount'
                    })}>
                    Editer mes informations
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
        </View>
      </>
    )
}
