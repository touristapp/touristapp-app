import React, { useState, useEffect } from 'react';
import { View,ScrollView, Image } from 'react-native';
import { Title, TextInput, Button } from 'react-native-paper';
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state'
import { colors } from '../../../styles/themes/variables'
import Style from '../../../styles/login'

export default function Login() {
    const email = useInput();
    const password = useInput();
    const [{ isLogged }, dispatch ] = useStateValue(); // Get the login state, defined in App.js

    return (
      <View style={Style.main}>
        <Image source={require('../../../assets/logo.png')} style={Style.image} />
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
           <Button  style={Style.button} icon="send" mode="contained" onPress={() => dispatch({
             type: 'authenticate',
             authenticate: { isLogged: true }
           })}>
              LOGIN
           </Button>
       </View>
      </View>
    )
}
