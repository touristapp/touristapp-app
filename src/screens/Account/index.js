// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/account';

// Screens imports
import ViewAccount from './ViewAccount';
import EditInfos from './EditInfos';
import EditVehicle from './EditVehicle';
import EditPassword from './EditPassword';

// Hooks imports
import { useStateValue } from '../../hooks/state'

// Components imports
import { View } from 'react-native';

export default function Account() {
    const [{ isLogged, AccountScreen }, dispatch] = useStateValue();

    const renderSwitch = (AccountScreen) => {
        switch(AccountScreen) {
            case 'viewAccount':
                return <ViewAccount/>
            case 'editInfos':
                return <EditInfos/>
            case 'editVehicle':
                return <EditVehicle/>
            case 'editPassword':
                return <EditPassword/>
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
          {isLogged && (
              renderSwitch(AccountScreen)
          )}
        </View>
    )
}
