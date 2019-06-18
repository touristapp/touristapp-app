import React from 'react';
import { View, Text, Button } from 'react-native';
import Style from '../../../styles/account';

export default class EditAccount extends React.Component {
    render() {
        return (
            <View style={Style.mainContainer}>
                <Button title="Save changes" onPress={() => this.props.switchScreen('viewAccount')}/>
            </View>
        )
    }
}