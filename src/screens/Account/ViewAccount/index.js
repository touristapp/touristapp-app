// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/viewAccount';

// Hooks imports
import { useStateValue } from '../../../hooks/state';
import { snacks } from '../../../styles/themes/variables';

// Components imorts
import Banner from '../../../components/Banner'
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';

export default function ViewAccount() {
    const [{showSnack}, dispatch ] = useStateValue();

    return (
      <>
        <Banner message="Mon compte"/>
          <View style={Style.mainContainer}>
            <View style={Style.infoContainer}>
                <View style={Style.imageContainer}>
                    <Image
                        style={Style.profileImage}
                        source={{uri: 'https://avatars1.githubusercontent.com/u/1349186?s=180&v=4'}}
                    />
                </View>
                <View>
                    <Text style={Style.boldCenteredText}>Majdi</Text>
                    <Text style={Style.email}>majdi.toumi@mhirba.com</Text>
                </View>
                <View style={Style.carContainer}>
                    <Text style={Style.boldCenteredText}>Ma voiture</Text>
                    <View style={Style.subCarContainer}>
                        <Text>
                            7L/100km
                        </Text>
                        <Text>
                            Diesel
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
                    onPress={() => {
                      dispatch({
                        type: 'isLogged',
                        status: false
                    });
                    dispatch({
                      type: 'snackContent',
                      setSnack:  {
                  			style: snacks.DANGER.style,
                        theme: snacks.DANGER.theme,
                        message: 'Déconnexion réussie !'
                      },
                    });
                    dispatch({
                      type: 'showSnackbar',
                      snack: !showSnack
                    });
                  }}>
                    Déconnexion
                </Button>
            </View>
        </View>
      </>
    )
}
