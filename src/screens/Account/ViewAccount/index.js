import React from 'react';
import { View, Text, Button } from 'react-native';
import Style from '../../../styles/account';

export default class ViewAccount extends React.Component {
    render() {
        return (
            <View style={Style.mainContainer}>
                <Text>You are on the Account Page</Text>
                <Button title="Edit profile" onPress={() => this.props.switchScreen('editAccount')}/>
            </View>
        )
    }
}