import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Style from '../../styles/account';
import { useStateValue } from '../../hooks/state'
import { BottomNavigation } from 'react-native-paper';

export default function Account() {
    const [{ isLogged }, dispatch ] = useStateValue(); // Get the login state, defined in App.js
    
    useEffect(() => {
      /* do something */
    }, [isLogged])

    return (
      <View style={Style.mainContainer}>
          <Text>You are on the Account Page</Text>
          {isLogged && (
            <Button  style={Style.button} icon="highlight-off" mode="contained" onPress={() => dispatch({
              type: 'logout',
              logout: { isLogged: false }
            })}>
               LOGOUT
            </Button>
          )}
      </View>
    )
}
