import React from 'react';
import { View, Text } from 'react-native';
import Style from '../../styles/banner';

const Banner = ({message}) => {
    return (
			<View style={Style.banner}>
				<Text style={Style.bannerText}>{message}</Text>
			</View>
    );
}

export default Banner;
