// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/mySearches';

// Components imports
import { View, Text } from 'react-native';
import Travel from '../../../components/travel'

export default function MySearches() {  
    return (
        <>
            <View style={Style.banner}>
                <Text style={Style.bannerText}>Mes voyages</Text>
            </View> 
            <View style={Style.mainContainer}>
                <Travel from='Paris' to='New York' distance='5 790' carbonPrint='1 440' done={true}/>
                <Travel from='New York' to='Pekin' distance='12 093' carbonPrint='5 320'/>
                <Travel from='New York' to='Hong Kong' distance='12 693' carbonPrint='4 320' done={true}/>
                <Travel from='Hong Kong' to='Paris' distance='9 633' carbonPrint='6 430' done={true}/>
                <Travel from='Paris' to='Marseille' distance='660' carbonPrint='6 710' done={true}/>
            </View>
        </>
    )
}