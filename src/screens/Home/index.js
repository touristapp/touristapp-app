// React imports
import React from 'react';

// Style imports
import Style from '../../styles/home';

// Components imports
import { View, Text } from 'react-native';

export default class Home extends React.Component {
    render() {
        return (
            <View style={Style.mainContainer}>
                <Text>You are on the Home Page</Text>
            </View>
        );
    }
}
