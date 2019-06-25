// React imports
import React, { useEffect } from 'react';

// Styles imports
import { colors } from '../../../styles/themes/variables'
import Style from '../../../styles/login'

// Hooks imports
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state'

// Components imports
import { View, Image } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';

export default function Login() {
    const email = useInput();
    const password = useInput();
    const [{ showSnack }, dispatch] = useStateValue();

    useEffect(() => {
      // do something
    }, [email.value, password.value])

    /*// TODO: onClick, connect to DB, check credentials, and store in Storage using tools/asyncstorage.js */

    return (
		<View style={Style.main}>
			<Image source={require('../../../assets/logo-notext.png')} style={Style.image} />
			<View style={Style.form}>
				<Title style={Style.title}>Login</Title>
				<TextInput
					style={Style.input}
					mode='outlined'
					label='Email'
					{...email}
				/>
				<TextInput
					style={Style.input}
					selectionColor={colors.FIRE}
					mode='outlined'
					label='Password'
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
              type: 'showSnackbar',
              snack: !showSnack
            })
          }}>
					CLICK TO LOGIN
				</Button>
			</View>
		</View>
    )
}
