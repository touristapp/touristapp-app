import React from 'react';
import { View, Image } from 'react-native';
import Style from '../../styles/footer'

export default class Header extends React.Component {
    render() {
        return (
           <View style={Style.footer}>
                <Image source={require('../../assets/icons/account.png')} style={{width: 50, height: 50}}/>
           </View>
        )
    }
}
