// React imports
import React from 'react';
import { Dimensions } from 'react-native';

// Navigation imports
import Navigation from './src/components/Navigation';

// Styles imports
import { colors } from './src/styles/themes/variables';

// Hooks imports
import { StateProvider } from './src/hooks/state';

const App = () => {
	// Define default states here
	const initialState = {
		isLogged: false,
		isLoading: false,
		showSnack: false,
		showDialog: false,
		token: '',
		currentUser: {id:null,name:'',email:'',picture:'',role:'',state:'',updatedAt:'',createdAt:'',VehicleId:''},
		userVehicle: {id:null,name:'',conso:'',FuelId:'',updatedAt:'',createdAt:''},
		vehicleFuel: {id:null,name:'',carbonFootprint:'',updatedAt:'',createdAt:''},
		progress: 0,
		snackContent: { style: {}, theme: {}, message: ''	},
		AuthScreen: 'viewAuth',
		AccountScreen: 'viewAccount',
		SearchScreen: 'createRoute',
		HomeScreen: 'home',
	};

	// Define how states would be updated by some actions
	const reducer = (state, action) => {
		switch (action.type) {
		case 'isLogged':
			return ({
				...state,
				isLogged: action.status
			});
		case 'token':
			return ({
				...state,
				token: action.retrieve
			});
		case 'switchScreen':
			return({
        ...state,
			  [action.tab]: action.screen
			});
		case 'showSnackbar':
			return({
				...state,
				showSnack: action.snack
			});
		case 'showDialog':
			return({
				...state,
				showDialog: action.dialog
			});
		case 'snackContent':
			return({
				...state,
				snackContent: action.setSnack
			});
		case 'isLoading':
			return ({
				...state,
				isLoading: action.wait
			});
		case 'progress':
			return ({
				...state,
				progress: action.load
			});
		case 'currentUser':
			return ({
				...state,
				currentUser: action.define
			});
		case 'userVehicle':
			return ({
				...state,
				userVehicle: action.setVehicle
			});
		case 'vehicleFuel':
			return ({
				...state,
				vehicleFuel: action.setFuel
			})
		case 'resetState':
			return initialState;
		default:
			return state;
		}
	};

	// Wrap the App inside the state Context
	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<Navigation style={{backgroundColor: colors.SKY, fontFamily:'futur,OPTIMA'}}/>
		</StateProvider>
	);
}

export default App;
