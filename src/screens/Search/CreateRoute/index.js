// React imports
import React from 'react';

// Styles imports
import Style from '../../../styles/createRoute';
import { colors } from '../../../styles/themes/variables';

// Hooks imports
import useInput from '../../../hooks/useInputs';
import ENV from '../../../../env';

// Components imorts
import Banner from '../../../components/Banner'
import { Image, ScrollView, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default function CreateRoute() {
    const depart = useInput();
    const arrivee = useInput();
    const transports = [
      {label: 'Voiture', value: 0},
      {label: 'Vélo', value: 1},
      {label: 'Train', value: 2},
      {label: 'Avion', value: 3},
    ]

    return (
        <>
            <Banner message="Créer un itinéraire"/>
            <ScrollView contentContainerStyle={Style.mainContainer}>
                <View style={Style.form}>
                  <ScrollView>
                    <GooglePlacesAutocomplete
                      placeholder='Départ'
                      minLength={2} // minimum length of text to search
                      autoFocus={false}
                      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                      listViewDisplayed='auto'    // true/false/undefined
                      fetchDetails={true}
                      renderDescription={row => row.description} // custom description render
                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                      }}

                      getDefaultValue={() => ''}

                      query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: ENV.googleMapsApiKey,
                        language: 'fr', // language of the results
                        types: '(cities)' // default: 'geocode'
                      }}

                      styles={{
                        textInputContainer: {
                          width: '100%'
                        },
                        description: {
                          fontWeight: 'bold',
                          backgroundColor: 'white',
                          margin: 0
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb'
                        }
                      }}

                      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                      GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                      }}
                      GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                      }}

                      GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                      }}

                      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      //predefinedPlaces={[homePlace, workPlace]}

                      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                      //renderLeftButton={()  => <Image source={require('../../../assets/logo-notext.png')} />}
                      //renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                  </ScrollView>
                  <ScrollView>
                    <GooglePlacesAutocomplete
                      placeholder='Arrivée'
                      minLength={2} // minimum length of text to search
                      autoFocus={false}
                      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                      listViewDisplayed='auto'    // true/false/undefined
                      fetchDetails={true}
                      renderDescription={row => row.description} // custom description render
                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                      }}

                      getDefaultValue={() => ''}

                      query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: ENV.googleMapsApiKey,
                        language: 'fr', // language of the results
                        types: 'address' // default: 'geocode'
                      }}

                      styles={{
                        textInputContainer: {
                          width: '100%'
                        },
                        description: {
                          fontWeight: 'bold',
                          backgroundColor: 'white',
                          margin: 0
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb'
                        }
                      }}

                      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                      GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                      }}
                      GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                      }}

                      GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                      }}

                      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      //predefinedPlaces={[homePlace, workPlace]}

                      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                      //renderLeftButton={()  => <Image source={require('../../../assets/logo-notext.png')} />}
                      //renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                    <RadioForm
                      formHorizontal={true}
                      animation={true}
                    >
                      {transports.map((obj, i) =>
                        <RadioButton labelHorizontal={true} key={i} >
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={truc => console.log(truc)}
                            onPress={value => console.log(value)}
                            borderWidth={1}
                            buttonInnerColor={'#e74c3c'}
                            buttonOuterColor={'#2196f3'}
                            buttonSize={5}
                            buttonOuterSize={10}
                            buttonStyle={{}}
                            buttonWrapStyle={{marginLeft: 10}}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            labelStyle={{fontSize: 20, color: '#2ecc71'}}
                            labelWrapStyle={{}}
                          />
                          </RadioButton>
                      )}

                    </RadioForm>
                  </ScrollView>
                  <RadioForm
                    formHorizontal={true}
                    animation={true}
                  >
                    {transports.map((obj, i) => {
                      <RadioButton labelHorizontal={true} key={i} >
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          borderWidth={1}
                          buttonInnerColor={'#e74c3c'}
                          buttonOuterColor={'#2196f3'}
                          buttonSize={40}
                          buttonOuterSize={80}
                          buttonStyle={{}}
                          buttonWrapStyle={{marginLeft: 10}}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          labelStyle={{fontSize: 20, color: '#2ecc71'}}
                          labelWrapStyle={{}}
                        />
                        </RadioButton>
                    })}

                  </RadioForm>
                    <Button
                        style={Style.searchButton}
                        icon="search"
                        mode="contained">
                        Rechercher
                    </Button>
                </View>
            </ScrollView>
        </>
    )
    /*
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Départ'
                        style={Style.input}
                        dense={true}
                        {...depart}
                    />
                    <TextInput
                        selectionColor={colors.FIRE}
                        mode='outlined'
                        label='Arrivée'
                        style={Style.input}
                        dense={true}
                        {...arrivee}
                    />
    */
}
