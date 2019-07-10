// React imports
import React, { useState, useEffect } from "react";

// Styles imports
import Style from "../../../styles/createRoute";
import { colors } from "../../../styles/themes/variables";

// Hooks imports
import { useStateValue } from '../../../hooks/state'
import ENV from "../../../../env";
import Fetch from '../../../tools/fetch';

// Components imports
import {
  View,
  Text,
  Modal,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

export default function CreateRoute() {
  const [index, setIndex] = useState(0);
  const onPressRadio = value => setIndex(value);
  const transports = [
    { label: "Voiture", value: 0 },
    { label: "Vélo", value: 1 },
    { label: "Train", value: 2 },
    { label: "Avion", value: 3 }
  ];
  const [{ isLogged, showSnack, isLoading, token, progress }, dispatch] = useStateValue();
  const [modalDepart, setModalDepart] = useState("false");
  const [modalArrive, setModalArrive] = useState("false");
  const [addressDescDepart, setaddressDescDepart] = useState(null);
  const [addressDescArrivee, setaddressDescArrivee] = useState(null);
  const [direction, setDirection ] = useState({});
  

  async function fetch() {
    const data = await Fetch.getDirections(addressDescDepart, addressDescArrivee);
    setDirection({data})
    dispatch({
      type: 'switchScreen',
      tab: 'SearchScreen',
      screen: 'searchResult'
    })
  }

  useEffect(()=> {
    dispatch({type: 'progress', load: 0})
    dispatch({type: 'isLoading', wait: true});
  },[])

  return (
    <>
      {/* PRINCIPALE VIEW */}

      {/* <Banner message= "Créer un itinéraire"/> */}
      <View style={Style.mainContainer} >

        <View style={Style.form}>

          <Text style={Style.title}>Créer un itinéraire</Text>

          <View >
            <View style={Style.textInputContainer}>
              <TouchableOpacity
                activeOpacity= {0}
                onPress={() => {
                  setModalDepart(true);
                }}
              >
                <Text style={Style.textDestination}>
                  {" "}
                  {addressDescDepart
                    ? addressDescDepart
                    : "Ajouter départ"}{" "}
                </Text>
              </TouchableOpacity>
            </View>


            <View style={Style.textInputContainer}>
              <TouchableOpacity
                activeOpacity= {0}
                onPress={() => {
                  setModalArrive(true);
                }}
              >
                <Text style={Style.textDestination}>
                  {" "}
                  {addressDescArrivee
                    ? addressDescArrivee
                    : "Ajouter arrivée"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        

        <View>
          <RadioForm formHorizontal={true} animation={true}>
            {transports.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                key={i}
                onPress={onPressRadio}
              >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={index === i}
                  onPress={onPressRadio}
                  borderWidth={1}
                  buttonInnerColor={colors.FIRE}
                  buttonOuterColor={index === i ? colors.SEA : colors.COAL}
                  buttonSize={8}
                  buttonOuterSize={15}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginVertical: 10, marginRight: 5 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={onPressRadio}
                  labelHorizontal={true}
                  labelStyle={{ fontSize: 16, color: colors.SEA }}
                  labelWrapStyle={{ marginVertical: 5, marginRight: 20 }}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <View >
          <Button
            style={Style.searchButton}
            icon="search"
            mode="contained"
            onPress= {()=> fetch()}
            datan={() => fetch()}
          >
            Rechercher
            </Button>
            </View>
        </View>

        {/* MODAL DEPART */}


        <Modal
          animationType="slide"
          transparent={false}
          visible={modalDepart}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="Départ"
              marginTop= {10}
              minLength={2} // minimum length of text to search
              autoFocus={true}
              returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed="true" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                setaddressDescDepart(data.description);
                setModalDepart(false);
              }}
              getDefaultValue={() => ""}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: ENV.googleMapsApiKey,
                language: "fr", // language of the results
                types: '(cities)' // default: 'geocode'
              }}

              styles={{
                textInputContainer: {
                  marginTop: 10,
                  marginLeft: 5,
                },
                description: {
                  fontWeight: "bold"
                },
                predefinedPlacesDescription: {
                  color: "#1faadb"
                },
                textInput: {
                  flex: 1
                },
                listView: {
                  flex: 1
                }
              }}
              //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              //currentLocationLabel="Current location"
              //nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={
                {
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }
              }
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: "distance",
                type: "geocode"
              }}
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: "formatted_address"
              }}
              filterReverseGeocodingByTypes={[
                "locality",
                "administrative_area_level_3"
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              //predefinedPlaces={}

              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              //renderLeftButton={()  => <Text>renderLeftButton</Text>}
              renderRightButton={() => (
                <Button block info onPress={() => setModalDepart(false)}
                style={Style.cancelButton}
                >
                  <Text style={Style.textcancelButton}>Cancel</Text>
                </Button>
              )}
            />
          </View>
        </Modal>

        {/* MODAL ARRIVEE */}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalArrive}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="Arrivée"
              minLength={2} // minimum length of text to search
              autoFocus={true}
              returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed="true" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                setaddressDescArrivee(data.description);
                setModalArrive(false);
              }}
              getDefaultValue={() => ""}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: ENV.googleMapsApiKey,
                language: "fr", // language of the results
                types: '(cities)' // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  marginTop: 10,
                  marginLeft: 5,
                },
                description: {
                  fontWeight: "bold"
                },
                predefinedPlacesDescription: {
                  color: "#1faadb"
                },
                textInput: {
                  flex: 3
                },
                listView: {
                  flex: 1
                }
              }}
              //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              //currentLocationLabel="Current location"
              //nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={
                {
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }
              }
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: "distance",
                type: "geocode"
              }}
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: "formatted_address"
              }}
              filterReverseGeocodingByTypes={[
                "locality",
                "administrative_area_level_3"
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              //predefinedPlaces={}

              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              //renderLeftButton={()  => <Text>renderLeftButton</Text>}
              renderRightButton={() => (
                <Button block info onPress={() => setModalArrive(false)} 
                style={Style.cancelButton}
                >
                  <Text style={Style.textcancelButton}>Cancel</Text>
                </Button>
              )}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}
