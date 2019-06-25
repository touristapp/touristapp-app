// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/editAccount';
import { colors } from '../../../styles/themes/variables';

// Hooks imports
import { useStateValue } from '../../../hooks/state';

// Components imports
import { View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function EditAccount() {
    const [{}, dispatch ] = useStateValue();
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
				<Button 
					style={Style.saveContainer} 
					icon="check" 
					mode="contained" 
					onPress={() => dispatch({
						type: 'switchScreen',
						tab: 'AccountScreen',
						screen: 'viewAccount'
					})}>
					Valider
				</Button>
				<Button 
					style={Style.deleteContainer} 
					icon="delete-forever" 
					mode="contained">
					Supprimer mon compte
				</Button>
			</View>
		</>
	)
}