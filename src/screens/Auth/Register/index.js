// React imports
import React, { useEffect } from 'react';

// Styles imports
import { colors } from '../../../styles/themes/variables';
import Style from '../../../styles/register';

// Hooks imports
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state';
import { Fetch, Snack } from '../../../tools';

// Components imports
import Banner from '../../../components/Banner';
import { View, Image, ScrollView } from 'react-native';
import { Title, TextInput, Button, ActivityIndicator } from 'react-native-paper';

export default function Register() {
    const nickname = useInput();
    const email = useInput();
    const password = useInput();
    const passwordConfirmation = useInput();
    const [{ isLogged, showSnack, isLoading }, dispatch] = useStateValue();

    const register = async () => {
        dispatch({type: 'isLoading',wait: true});
        if (nickname.value != "" && email.value != "" && password.value != "" && passwordConfirmation.value != "") {
            if (password.value == passwordConfirmation.value) {
                if (nickname.value != password.value) {
                    if (nickname.value.length > 5 && password.value.length > 7) {
                        if (/\S+@\S+\.\S+/.test(email.value)) {

                            Fetch.register({
                                  name: nickname.value,
                                  email: email.value,
                                  password: password.value,
                                  passwordConfirmation : passwordConfirmation.value
                              });

                            dispatch({type: 'isLoading',wait: false});
                            dispatch({type: 'switchScreen',tab: 'AuthScreen',screen: 'login'});
                            Snack.success('Création du compte réussie  !',showSnack,dispatch);
                        } else {
                          Snack.danger('Email invalide !',showSnack,dispatch);
                        }
                    } else {
                      Snack.danger('Nickname doit être > 5, Password doit être > 7 !',showSnack,dispatch);
                    }
                } else {
                  Snack.danger('Nickname et Password doivent être differents !',showSnack,dispatch);
                }
            } else {
              Snack.danger('Passwords doivent être identiques !',showSnack,dispatch);
            }
        } else {
          Snack.danger('Tous les champs sont requis !',showSnack,dispatch);
        }
        dispatch({type: 'isLoading',wait: false});
    }

    return (
    <View>
      <Banner message="Créer un compte"/>
  		<ScrollView contentContainerStyle={Style.main}>
        {isLoading &&
          <ActivityIndicator style={Style.loader} size='large' animating={true} color={colors.SEA} />
        }
        {!isLoading &&
        <>
  			<Image source={require('../../../assets/logo-notext.png')} style={Style.image} />
  			<View style={Style.form}>
  				<Title style={Style.title}>touristapp</Title>
  				<TextInput
            style={Style.input}
            autoCapitalize = 'none'
            autoCorrect = {false}
  					mode='outlined'
  					label='Nickname'
  					{...nickname}
  				/>
          <TextInput
  					style={Style.input}
            autoCapitalize = 'none'
            autoCorrect = {false}
            mode='outlined'
  					label='Email'
  					{...email}
  				/>
          <TextInput
  					style={Style.input}
            autoCapitalize = 'none'
            autoCorrect = {false}
            mode='outlined'
  					label='Password'
            secureTextEntry={true}
  					{...password}
  				/>
  				<TextInput
  					style={Style.input}
            autoCapitalize = 'none'
            autoCorrect = {false}
            mode='outlined'
  					label='Password confirmation'
            secureTextEntry={true}
  					{...passwordConfirmation}
  				/>
  				<Button
  					style={Style.button2}
  					icon="send"
  					mode="contained"
  					onPress={register}>
  					CRÉER UN COMPTE
  				</Button>
          <Button
  					style={Style.button}
  					icon="cancel"
  					mode="contained"
  					onPress={()=> dispatch({type: 'switchScreen',tab: 'AuthScreen',screen: 'login'})}>
  					ANNULER
  				</Button>
  			</View>
        </>}
  		</ScrollView>
    </View>
    )
}
