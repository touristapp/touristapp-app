import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Title, TextInput, Button, ActivityIndicator } from 'react-native-paper';

import { colors } from '../../../styles/themes/variables';
import Style from '../../../styles/login';
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state'
import { Fetch, Snack, Storage } from '../../../tools';
import Banner from '../../../components/Banner';

export default function Login() {
    const email = useInput();
    const password = useInput();
    const [{ isLogged, showSnack, isLoading, token, progress }, dispatch] = useStateValue();

    useEffect(()=>dispatch({type: 'isLoading',wait: false}),[isLogged])

    useEffect(()=>{
      if (token==='') {
        Storage.retrieve('token').then( result => {
          if (result!==undefined && result!==null) {
            dispatch({type: 'isLoading',wait: true});
            Fetch.authorizeUser(result).then( auth =>
              dispatch({type:'token',retrieve:{token:result, data:auth.data} }));
            dispatch({type: 'isLogged',status: true});
          }
        });
      }
    })

    const login = async () => {
      if (email.value==='' || password.value==='') return Snack.danger("Tous les champs sont requis !",showSnack,dispatch);
      dispatch({type: 'isLoading',wait: true});
      Fetch.login({email:email.value, password:password.value})
        .then( async response => {
          if(response.error!==undefined) {
            dispatch({type: 'isLoading',wait: false});
            Snack.danger(response.error.message+'!',showSnack,dispatch);
          } else {
            await Storage.store({
              email: email.value,
              password: password.value,
              token: response.meta.token
            })
            dispatch({type: 'isLoading',wait: false});
            dispatch({type: 'isLogged',status: true});
            Snack.success("Connexion réussie !",showSnack,dispatch);
          }
      });
    }

    return (
        <>
            <Banner message="Login"/>
        		<View style={Style.main}>
              {isLoading &&
                <ActivityIndicator size='large' animating={true} color={colors.SEA} />
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
          					label='Email'
          					{...email}
          				/>
          				<TextInput
          					style={Style.input}
          					mode='outlined'
                    label='Password'
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    secureTextEntry={true}
          					{...password}
          				/>
          				<Button
          					style={Style.button2}
          					icon="send"
          					mode="contained"
          					onPress={login}>
                    CONNEXION
          				</Button>
                  <Button
                      style={Style.button}
                      icon="assignment-ind"
                      mode="contained"
                      onPress={() => dispatch({
                          type: 'switchScreen',
                          tab: 'AuthScreen',
                          screen: 'register'
                      })}>
                      Créer un compte
                  </Button>
          			</View>
                </>}
        		</View>
        </>
    )
}
