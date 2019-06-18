import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../screens/Home'
import Login from '../screens/Auth/Login'

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    }
},
{
    initialRouteName: 'Login',
    headerMode: 'float',
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#000',
        },
    },
});

export default createAppContainer(AppNavigator);
