// React imports
import React from 'react';

// Styles imports
import Style from '../../styles/disconnected';

// Components imorts
import { useStateValue } from '../../hooks/state'
import Banner from '../../components/Banner'
import { View, Image } from 'react-native';
import { Title, Button } from 'react-native-paper';

export default function Disconnected() {
    const [{ switchScreen }, dispatch] = useStateValue();

    return (
        <>
            <Banner message="Mes Voyages"/>
            <View style={Style.mainContainer}>
                <Title style={Style.text}>Vous n'êtes pas connecté</Title>
                <Image
                    source={require('../../assets/sad.png')}
                />
            </View>
        </>
    )
}
