// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/myStats';

// Components imports
import { View, Text, Image } from 'react-native';
import { Title } from 'react-native-paper';

export default function MyStats() {  
    return (
        <>
            <View style={Style.banner}>
                <Text style={Style.bannerText}>Statistiques</Text>
            </View> 
            <View style={Style.mainContainer}>
                <View style={Style.mainForm}>
                    <Image
                        style={{width: 40, height: 40}}
                        source={require('../../../assets/green-earth.png')}
                    />
                    <Text style={Style.mainText}>
                        Votre empreinte carbone de 2019 dépasse de 100kg la moyenne que la planète peut absorber annuellement par habitant.
                    </Text>
                </View>
                <View style={Style.container}>
                    <View style={Style.subForm}>
                        <Title style={Style.title}>
                            Voyages effectués
                        </Title>
                        <Text style={Style.textContent}>
                            12
                        </Text>
                    </View>
                    <View style={Style.subForm}>
                    <Title style={Style.title}>
                            Recherches effectués
                        </Title>
                        <Text style={Style.textContent}>
                            31
                        </Text>
                    </View>
                    <View style={Style.subForm}>
                    <Title style={Style.title}>
                            Km parcourus
                        </Title>
                        <Text style={Style.textContent}>
                            9 578
                        </Text>
                    </View>
                    <View style={Style.subForm}>
                    <Title style={Style.title}>
                            Emissions tC02
                        </Title>
                        <Text style={Style.textContent}>
                            51,12
                        </Text>
                    </View>
                </View>
                <Text style={Style.textBottom}>
                    Année 2019
                </Text>
            </View>
        </>
    )
}