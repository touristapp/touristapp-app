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

export default function Register() {
    const nickname = useInput();
    const email = useInput();
    const password = useInput();
    const passwordConfirmation = useInput();
    const [{ showSnack }, dispatch] = useStateValue();

    /*// TODO: onClick, connect to DB, check credentials, and store in Storage using tools/asyncstorage.js */

    return (
    <>
      <Banner message="Créer un compte"/>
  		<View style={Style.main}>
  			<Image source={require('../../../assets/logo-notext.png')} style={Style.image} />
  			<View style={Style.form}>
  				<Title style={Style.title}>touristapp</Title>
  				<TextInput
  					style={Style.input}
  					mode='outlined'
  					label='Nickname'
  					{...nickname}
  				/>
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
  				<TextInput
  					style={Style.input}
  					mode='outlined'
  					label='Password confirmation'
            secureTextEntry={true}
  					{...passwordConfirmation}
  				/>
  				<Button
  					style={Style.button}
  					icon="send"
  					mode="contained"
  					onPress={() => {
              dispatch({
    						type: 'switchScreen',
    						tab: 'AuthScreen',
    						screen: 'login'
              });
              dispatch({
                type: 'snackContent',
                setSnack:  {
            			style: snacks.SUCCESS.style,
                  theme: snacks.SUCCESS.theme,
            			message: 'Compte créé !'
            		}
              });
              dispatch({
                type: 'showSnackbar',
                snack: !showSnack
              });
            }}>
  					CRÉER UN COMPTE
  				</Button>
  			</View>
  		</View>
    </>
    )
}
