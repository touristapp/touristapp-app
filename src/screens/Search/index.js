// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/search';

// Components imports
import { View, Text } from 'react-native';

export default class Search extends React.Component {
    render() {
        return (
            <View style={Style.mainContainer}>
                <Text>You are on the Search Page</Text>
            </View>
        );
    }
}