// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/disconnected';

// Components imorts
import Banner from '../../components/Banner'
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';

export default function Disconnected() {
    return (
        <>
            <Banner message="Oups !"/>
            <View style={Style.mainContainer}>
                <Title style={Style.text}>Vous n'êtes pas connecté</Title>
                <Image
                    source={require('../../assets/sad.png')}
                />
            </View>
        </>
    )
}
