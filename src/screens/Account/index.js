import React from 'react';
import { View, Text } from 'react-native';
import Style from '../../styles/account';

export default class Account extends React.Component {
    render() {
        return (
            <View style={Style.mainContainer}>
                <Text>You are on the Account Page</Text>
            </View>
        );
    }
}