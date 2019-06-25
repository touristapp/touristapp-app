// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/viewHome';

// Components imports
import { View, Text } from 'react-native';
import Banner from '../../../components/Banner'

export default function ViewHome() {
    return (
      <>
        <Banner message="Accueil"/>
        <View style={Style.mainContainer}></View>
      </>
    )
}
