// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/createRoute';
import { colors } from '../../../styles/themes/variables';

// Components imorts
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function CreateRoute() {   
    return (
        <>
            <View style={Style.banner}>
                <Text style={Style.bannerText}>Créer un itinéraire</Text>
            </View> 
            <View style={Style.mainContainer}>
                <View style={Style.form}>
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Départ'
                        style={Style.input}
                        dense={true}
                    />
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Arrivée'
                        style={Style.input}
                        dense={true}
                    />
                    <Button 
                        style={Style.searchButton} 
                        icon="check" 
                        mode="contained">
                        Rechercher
                    </Button>
                </View>
            </View>
        </>
    )
}