import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import Style from '../../../styles/viewAccount';

export default class ViewAccount extends React.Component {
    render() {
        return (
            <>
                <View style={Style.banner}>
                    <Text style={Style.bannerText}>Mon compte</Text>
                </View>
                <View style={Style.mainContainer}>                    
                    <View style={Style.imageContainer}>
                        <Image
                            style={Style.profileImage}
                            source={{uri: 'https://avatars1.githubusercontent.com/u/1349186?s=180&v=4'}}
                        />
                    </View>
                    <View>
                        <Text style={Style.boldCenteredText}>Majdi</Text>
                        <Text style={Style.email}>majdi.toumi@mhirba.com</Text>
                    </View>
                    <View style={Style.carContainer}>
                        <Text style={Style.boldCenteredText}>Ma voiture</Text>
                        <View style={Style.subCarContainer}>
                            <Text>
                                7L/100km
                            </Text>
                            <Text>
                                Diesel
                            </Text>
                        </View>
                    </View>
                    <TouchableHighlight style={Style.editContainer} onPress={() => this.props.switchScreen('editAccount')} activeOpacity={1} underlayColor={'white'}>
                        <Text style={Style.buttonText}>
                            Editer mes informations
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={Style.deleteContainer} activeOpacity={1} underlayColor={'white'}>
                        <Text style={Style.buttonText}>
                            Supprimer mon compte
                        </Text>
                    </TouchableHighlight>
                </View>
            </>
        )
    }
}

/*
todo: 
- set fonts in css
- remove fixed data and add data from api
*/