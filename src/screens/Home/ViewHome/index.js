// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/viewHome';

// Hooks imports
import { useStateValue } from '../../../hooks/state'

// Components imports
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Banner from '../../../components/Banner'

export default function ViewHome() {
    const [{}, dispatch] = useStateValue();
    return (
        <>
            <Banner message="Accueil"/>
            <View style={Style.mainContainer}>
                <Card style={Style.card} elevation={5} onPress={() => dispatch({
      						type: 'switchScreen',
      						tab: 'HomeScreen',
      						screen: 'myTravels'
      					})}>
                    <Card.Cover source={require('../../../assets/travels.jpg')} style={Style.cardCover} />
                    <Card.Actions style={Style.cardAction}>
                        <Button icon="flight-takeoff">Mes voyages</Button>
                    </Card.Actions>
                </Card>
                <Card style={Style.card} elevation={5}>
                    <Card.Cover source={require('../../../assets/searchs.jpg')} style={Style.cardCover} />
                    <Card.Actions style={Style.cardAction}>
                        <Button icon="history">Mes recherches</Button>
                    </Card.Actions>
                </Card>
                <Card style={Style.card} elevation={5}>
                    <Card.Cover source={require('../../../assets/stats.jpg')} style={Style.cardCover} />
                    <Card.Actions style={Style.cardAction}>
                        <Button icon="timeline">Mes statistiques</Button>
                    </Card.Actions>
                </Card>
            </View>
        </>
    )
}
