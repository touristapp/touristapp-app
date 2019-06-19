import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Style from '../../../styles/editAccount';
import { colors } from '../../../themes/variables'

export default class EditAccount extends React.Component {
    render() {
        return (
            <>
                <View style={Style.banner}>
                    <Text style={Style.bannerText}>Modifier mes informations</Text>
                </View>
                <View style={Style.mainContainer}>
                    <View style={Style.imageContainer}>
                        <Image
                            style={Style.profileImage}
                            source={{uri: 'https://avatars1.githubusercontent.com/u/1349186?s=180&v=4'}}
                        />
                    </View>
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Nom'
                        style={Style.input}
                        dense={true}
                    />
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Email'
                        style={Style.input}
                        dense={true}
                    />
                    <TouchableHighlight style={Style.saveContainer} onPress={() => this.props.switchScreen('viewAccount')} activeOpacity={1} underlayColor={'white'}>
                        <Text style={Style.buttonText}>
                            Valider
                        </Text>
                    </TouchableHighlight>
                </View>
            </>
        )
    }
}