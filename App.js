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
		token: '',
		isLoading: false,
		progress: 0,
		showSnack: false,
		snackContent: { style: {}, theme: {}, message: ''	},
		showDialog: {on: false, which: ''},
		currentUser: {id:null,name:'',email:'',picture:'',role:'',state:'',updatedAt:'',createdAt:'',VehicleId:null},
		userVehicle: {id:null,name:'',conso:'',FuelId:null,updatedAt:'',createdAt:''},
		vehicleFuel: {id:null,name:'',carbonFootprint:'',updatedAt:'',createdAt:''},
		journey: {distance: 0, vehicleId: null},
		defaultFuels: [],
		defaultVehicles: [],
		AuthScreen: 'viewAuth',
		AccountScreen: 'viewAccount',
		SearchScreen: 'createRoute',
		HomeScreen: 'search',
		mySearches: [],
		myTravels: [],
		myTravelsNSearches: []
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
		case 'defaultFuels':
			return ({
				...state,
				defaultFuels: action.set
			})
		case 'defaultVehicles':
			return ({
				...state,
				defaultVehicles: action.set
			})
		case 'resetState':
			return initialState;
		case 'mySearches':
			return ({
				...state,
				mySearches: action.setSearches
			})
		case 'myTravels':
			return ({
				...state,
				myTravels: action.setTravels
			})
		case 'myTravelsSearches':
			return ({
				...state,
				myTravelsNSearches: action.setTravelsNSearches
			})
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
