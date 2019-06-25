// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/createRoute';
import { colors } from '../../../styles/themes/variables';

// Hooks imports
import useInput from '../../../hooks/useInputs';

// Components imorts
import Banner from '../../../components/Banner'
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function CreateRoute() {
    const depart = useInput();
    const arrivee = useInput();

    return (
        <>
            <Banner message="Créer un itinéraire"/>
            <View style={Style.mainContainer}>
                <View style={Style.form}>
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Départ'
                        style={Style.input}
                        dense={true}
                        {...depart}
                    />
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Arrivée'
                        style={Style.input}
                        dense={true}
                        {...arrivee}
                    />
                    <Button
                        style={Style.searchButton}
                        icon="search"
                        mode="contained">
                        Rechercher
                    </Button>
                </View>
            </View>
        </>
    )
}
