// React imports
import React, { useEffect } from 'react';

// Styles imports
import { colors, snacks } from '../../../styles/themes/variables';
import Style from '../../../styles/login';

// Hooks imports
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state'

// Components imports
import Banner from '../../../components/Banner';
import { View, Image } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

export default function Login() {
    const email = useInput();
    const password = useInput();
    const [{ showSnack }, dispatch] = useStateValue();

    //console.log(snacks.SUCCESS);

    useEffect(() => {
      // do something
    }, [email.value, password.value])

    /*// TODO: onClick, connect to DB, check credentials, and store in Storage using tools/asyncstorage.js */

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
  					onPress={() => {
              dispatch({
    						type: 'isLogged',
    						status: true
  					  });
              dispatch({
                type: 'snackContent',
                setSnack:  {
            			style: snacks.SUCCESS.style,
                  theme: snacks.SUCCESS.theme,
            			message: 'Connexion réussie !'
            		}
              });
              dispatch({
                type: 'showSnackbar',
                snack: !showSnack
              });
            }}>
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
