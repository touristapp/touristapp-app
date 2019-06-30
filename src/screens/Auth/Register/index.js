// React imports
import React, { useEffect } from 'react';

// Styles imports
import { colors } from '../../../styles/themes/variables';
import Style from '../../../styles/login';

// Hooks imports
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state';
import { Fetch, Snack } from '../../../tools';

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
                            Snack.success('Account successfully created !',showSnack,dispatch);
                        } else {
                          Snack.danger('Email is not valid !',showSnack,dispatch);
                        }
                    } else {
                      Snack.danger('Nickname size must be greater than 5 and Password than 7 !',showSnack,dispatch);
                    }
                } else {
                  Snack.danger('Nickname and Password must be different !',showSnack,dispatch);
                }
            } else {
              Snack.danger('Passwords must be equals !',showSnack,dispatch);
            }
        } else {
          Snack.danger('You must fill all inputs !',showSnack,dispatch);
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
  					onPress={register}>
  					CRÉER UN COMPTE
  				</Button>
  			</View>
  		</View>
    </>
    )
}
