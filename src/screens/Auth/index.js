// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/auth';

// Screens imports
import Login from './Login';
import Register from './Register';

// Hooks imports
import { useStateValue } from '../../hooks/state'

// Components imports
import { View } from 'react-native';

export default function Auth() {
    const [{ isLogged, AuthScreen }, dispatch] = useStateValue();

    console.log(`1 : ${AuthScreen}`);

    const renderSwitch = (AuthScreen) => {
        switch(AuthScreen) {
            case 'login':
                return <Login/>
            case 'register':
                return <Register/>
            default:
                dispatch({
                    type: 'switchScreen',
                    tab: 'AuthScreen',
                    screen: 'login'
                })
        }
    }

    console.log(`2 : ${AuthScreen}`);


    return (
        <View style={Style.mainContainer}>
          {renderSwitch(AuthScreen)}
        </View>
    )
}
