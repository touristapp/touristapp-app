// React imports
import React, { useEffect } from 'react';

// Styles imports
import { colors, snacks } from '../../../styles/themes/variables';
import Style from '../../../styles/login';

// Hooks imports
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state'
import Fetch from '../../../tools/fetch'

// Components imports
import Banner from '../../../components/Banner';
import { View, Image } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

export default function Register() {
    const nickname = useInput();
    const email = useInput();
    const password = useInput();
    const passwordConfirmation = useInput();
    const [{ isLogged, showSnack }, dispatch] = useStateValue();

    const register = async () => {
        if (nickname.value != "" && email.value != "" && password.value != "" && passwordConfirmation.value != "") {
          console.log(password);
          console.log(passwordConfirmation);
            if (password.value == passwordConfirmation.value) {
                if (nickname.value != password.value) {
                    if (nickname.value.length > 5 && password.value.length > 7) {
                        if (/\S+@\S+\.\S+/.test(email.value)) {
                            const url = "https://touristapi.herokuapp.com/api/auth/register";
                            const body = JSON.stringify({
                                name: nickname.value,
                                email: email.value,
                                password: password.value,
                                passwordConfirmation : passwordConfirmation.value
                            });
                            const response = await Fetch.post(url,body);
                            dispatch({type: 'switchScreen',tab: 'AuthScreen',screen: 'login'});
                            dispatch({type: 'showSnackbar',snack: !showSnack});
                            dispatch({type: 'snackContent', setSnack:{style:snacks.SUCCESS.style,theme: snacks.SUCCESS.theme,message: 'Account successfully created !'}});
                        } else {
                          dispatch({type: 'showSnackbar',snack: !showSnack});
                          dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: 'Email is not valid !'}});
                        }
                    } else {
                      dispatch({type: 'showSnackbar',snack: !showSnack});
                      dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: 'Nickname size must be greater than 5 and Password than 7 !'}});
                    }
                } else {
                  dispatch({type: 'showSnackbar',snack: !showSnack});
                  dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: 'Nickname and Password must be different !'}});
                }
            } else {
              dispatch({type: 'showSnackbar',snack: !showSnack});
              dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: 'Passwords must be equals !'}});
            }
        } else {
          dispatch({type: 'showSnackbar',snack: !showSnack});
          dispatch({type: 'snackContent', setSnack:{style:snacks.DANGER.style,theme: snacks.DANGER.theme,message: 'You must fill all inputs !'}});
        }
    }

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
  					onPress={register/*() => {
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
            }*/}>
  					CRÉER UN COMPTE
  				</Button>
  			</View>
  		</View>
    </>
    )
}
