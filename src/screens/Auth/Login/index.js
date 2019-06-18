import React, { useState, useEffect } from 'react';
import { View,ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import useInput from '../../../hooks/useInputs';
//import Style from '../../styles/footer'

export default function Login() {
    const email = useInput();
    const password = useInput();

    return (
      <View>
         <TextInput
          mode='outlined'
          label='Email'
          {...email}
         />
         <TextInput
          mode='outlined'
          label='Password'
          {...password}
         />
         <Button icon="send" mode="outlined" onPress={() => console.log('Pressed')}>
          LOGIN
         </Button>
      </View>
    )
}
