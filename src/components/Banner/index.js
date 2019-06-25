import React from 'react';
import { View, Text } from 'react-native';
import Style from '../../styles/banner';
import { useStateValue } from '../../hooks/state';

const Banner = ({message}) => {
    const [{ bannerText }, dispatch ] = useStateValue();

    return (
			<View style={Style.banner}>
				<Text style={Style.bannerText}>{message}</Text>
			</View>
    );
}

export default Banner;
