import React, { useEffect } from 'react';
import { colors } from '../../../styles/themes/variables';
import Style from '../../../styles/login';
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state'
import { Fetch, Snack, Storage } from '../../../tools';
import Banner from '../../../components/Banner';
import { View, Image } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

export default function Login() {
    const email = useInput();
    const password = useInput();
    const [{ isLogged, showSnack }, dispatch] = useStateValue();

    useEffect(()=>{
      Promise.resolve(Storage.retrieve('token'))
        .then( (token) => {
          if (token!==undefined && token!==null) dispatch({type: 'isLogged',status: true})
        });
    })

    const login = async () => {
        const url = "https://touristapi.herokuapp.com/api/auth/login"
        const body = JSON.stringify({email: email.value, password: password.value})
        if(email.value != "" && password.value != "") {
          const response = await Fetch.post(url, body);
          if(response.status !== 200) {
              Snack.danger("Wrong email or password!",showSnack,dispatch);
          } else {
              const responseJSON = await response.json()
              await Storage.store({
                email: email.value,
                password: password.value,
                token: responseJSON.meta.token
              });
              dispatch({type: 'isLogged',status: true});
          }
        } else {
            Snack.danger("Nickname and password can't be empty!",showSnack,dispatch);
        }
    }

    return (
    <>
      <Banner message="Login"/>
  		<View style={Style.main}>
  			<Image source={require('../../../assets/logo-notext.png')} style={Style.image} />
  			<View style={Style.form}>
  				<Title style={Style.title}>touristapp</Title>
  				<TextInput
  					style={Style.input}
  					mode='outlined'
  					label='Email'
  					{...email}
  				/>
  				<TextInput
  					style={Style.input}
  					mode='outlined'
  					label='Password'
            secureTextEntry={true}
  					{...password}
  				/>
  				<Button
  					style={Style.button}
  					icon="send"
  					mode="contained"
  					onPress={login}>
            CONNEXION
  				</Button>
          <Button
              style={Style.button2}
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
  		</View>
    </>
    )
}
