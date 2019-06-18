import React from 'react';
import { View, Text } from 'react-native';
import Style from '../../styles/search';

export default class Search extends React.Component {
    render() {
        return (
            <View style={Style.mainContainer}>
                <Text>You are on the Search Page</Text>
            </View>
        );
    }
}