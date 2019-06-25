// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/disconnected';

// Components imorts
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';

export default function Disconnected() {   
    return (
        <>
            <View style={Style.mainContainer}>
                <Title style={Style.text}>Vous êtes déconnecté</Title>
                <Image
                    source={require('../../assets/sad.png')}
                />
            </View>
        </>
    )
}