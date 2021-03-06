import React from 'react';

import Style from '../../styles/travel';

import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Title } from 'react-native-paper';

const Travel = ({index, from, to, distance, carbonPrint, done = false}) => {
    return (
        <View style={Style.form} key={index}>
            <Title style={Style.title}>
                {from} - {to}
            </Title>
            <View style={Style.subForm}>
                <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/flight.png')}
                />
                <View style={Style.textSubForm}>
                    <Text style={Style.text}>
                        {distance} km
                    </Text>
                    <Text style={Style.text}>
                        {carbonPrint} kg de CO2
                    </Text>
                </View>
            </View>
            {!done && (
                <Image
                    style={Style.doneImage}
                    source={require('../../assets/not-done.png')}
                />
            )}
            <TouchableOpacity style={Style.share} onPress={() => Alert.alert('Oops', 'Partager un voyage est une fonctionnalité qui arrive bientôt :)')}>
                <View>
                    <Image
                        style={Style.shareImage}
                        source={require('../../assets/share.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Travel;
