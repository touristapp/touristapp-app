// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/myTravels';

// Components imports
import { View, Text } from 'react-native';
import Travel from '../../../components/myTravel'

export default function MyTravels() {  
    return (
        <>
            <View style={Style.banner}>
                <Text style={Style.bannerText}>Mes voyages</Text>
            </View> 
            <View style={Style.mainContainer}>
                <Travel from='Paris' to='New York' distance='5 790' carbonPrint='1 440'/>
                <Travel from='New York' to='Hong Kong' distance='12 693' carbonPrint='4 320'/>
                <Travel from='Hong Kong' to='Paris' distance='9 633' carbonPrint='6 430'/>
                <Travel from='Paris' to='Marseille' distance='660' carbonPrint='6 710'/>
            </View>
        </>
    )
}