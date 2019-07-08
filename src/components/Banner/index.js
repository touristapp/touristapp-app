import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import Style from '../../styles/banner';
import { useStateValue } from '../../hooks/state';

const Banner = ({message, back = false}) => {

	const [{}, dispatch] = useStateValue();

	goBack = () => {
		dispatch({
			type: 'switchScreen',
			tab: 'HomeScreen',
			screen: 'viewHome'
		}) &&
			dispatch({
			type: 'switchScreen',
			tab: 'AccountScreen',
			screen: 'viewAccount'
		}) &&
			dispatch({
			type: 'switchScreen',
			tab: 'SearchScreen',
			screen: 'createRoute'
		})
	}

    return (
		<View style={Style.banner}>
			{back && (
				<IconButton
					icon="arrow-back"
					color='white'
					size={30}
					style={Style.backButton}
					onPress={() => goBack()}
				/>				
			)}
			<Text style={Style.bannerText}>{message}</Text>
		</View>
    );
}

export default Banner;
