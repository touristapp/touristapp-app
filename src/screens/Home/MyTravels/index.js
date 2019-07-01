// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/myTravels';

// Components imports
import { View, Text } from 'react-native';

export default function MyTravels() {  
    return (
        <>
            <View style={Style.banner}>
                <Text style={Style.bannerText}>Accueil</Text>
            </View> 
            <View style={Style.mainContainer}>
                <Text>Bonjour</Text>
            </View>
        </>
    )
}