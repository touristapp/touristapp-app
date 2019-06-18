import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../screens/Home'

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
},
{
    initialRouteName: 'Home',
    headerMode: 'float',
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#000',
        },
    },
});

export default createAppContainer(AppNavigator);