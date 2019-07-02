// React imports
import React, {useEffect} from 'react';

// Styles imports
import Style from '../../styles/account';
import { colors } from '../../styles/themes/variables';

// Screens imports
import ViewAccount from './ViewAccount';

// Hooks imports
import { useStateValue } from '../../hooks/state'

// Components imports
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function Account() {
    const [{ isLogged, AccountScreen, isLoading, progress }, dispatch] = useStateValue();

    useEffect(()=>{},[])

    const renderSwitch = (AccountScreen) => {
        switch(AccountScreen) {
            case 'viewAccount':
                return <ViewAccount/>
            default:
                dispatch({
                    type: 'switchScreen',
                    tab: 'AccountScreen',
                    screen: 'viewAccount'
                })
        }
    }

    return (
        <View style={Style.mainContainer}>
          {!isLogged &&
            <ActivityIndicator size='large' animating={true} color={colors.SEA} />
          }
          {isLogged && (
            renderSwitch(AccountScreen)
          )}
        </View>
    )
}
