// React imports
import React, { useState, useEffect } from "react";

// Styles imports
import Style from "../../../styles/createRoute";
import { colors } from "../../../styles/themes/variables";

// Hooks imports
import useInput from "../../../hooks/useInputs";
import ENV from "../../../../env";

// Components imorts
import Banner from "../../../components/Banner";
import {
  Image,
  ScrollView,
  View,
  Text,
  Modal,
  TouchableHighlight
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

export default function CreateRoute() {
  const [index, setIndex] = useState(0);
  const transports = [
    { label: "Voiture", value: 0 },
    { label: "Vélo", value: 1 },
    { label: "Train", value: 2 },
    { label: "Avion", value: 3 }
  ];
  const [modalDepart, setModalDepart] = useState("false");
  const [modalArrive, setModalArrive] = useState("false");
  const [addressDescDepart, setaddressDescDepart] = useState(null);
  const [addressDescArrivee, setaddressDescArrivee] = useState(null);

  const onPressRadio = value => setIndex(value);

  fetchData = async () => {
    //alert('Fetching!')
    alert(
      `Fetching data from ${addressDescDepart} to ${addressDescArrivee} }`
    );
    const data = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${
        addressDescDepart
      }&destination=${addressDescArrivee}&key=${ENV.googleMapsApiKey}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: ENV.googleMapsApiKey
        },
        method: "GET"
      }
    );
    const json = await data.json();
    //return json;
    console.log(json);
  };

  return (
    <>
      {/* PRINCIPALE VIEW */}

      <View style={{
            flex: 1
          }} >
        <Banner message="Créer un itinéraire" />
        <View
          style={{ paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 30,
            borderRadius: 5,
            marginLeft: 20,
            marginRight: 20,
            flex: 1
          }}
        >
          <View style={{ backgroundColor: "green" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#DDE246"
              }}
            >
              <Text>Address :</Text>
              <TouchableHighlight
                onPress={() => {
                  setModalDepart(true);
                }}
              >
                <Text>
                  {" "}
                  {addressDescDepart
                    ? addressDescDepart
                    : "Select address"}{" "}
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={{ backgroundColor: "#46E2CF" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#D946E2"
              }}
            >
              <Text>Address :</Text>
              <TouchableHighlight
                onPress={() => {
                  setModalArrive(true);
                }}
              >
                <Text>
                  {" "}
                  {addressDescArrivee
                    ? addressDescArrivee
                    : "Select address"}{" "}
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View>
            <RadioForm formHorizontal={true} animation={true}>
              {transports.map((obj, i) => (
                <RadioButton
                  labelHorizontal={true}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "grey",
                    marginHorizontal: 2,
                    paddingHorizontal: 10,
                    flex: 1,
                    backgroundColor: colors.WHITE
                  }}
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
                    buttonWrapStyle={{ marginVertical: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    onPress={onPressRadio}
                    labelHorizontal={true}
                    labelStyle={{ fontSize: 16, color: colors.SEA }}
                    labelWrapStyle={{ marginVertical: 10 }}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>

          <View>
            <Button
              style={Style.searchButton}
              icon="search"
              mode="contained"
              onPress={fetchData}
            >
              Rechercher
            </Button>
          </View>
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
            placeholder="Search"
            minLength={0} // minimum length of text to search
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
                width: "100%"
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
              <Button block info onPress={() => setModalDepart(false)}>
                <Text style={Style.text2}>Cancel</Text>
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
            placeholder="Search"
            minLength={0} // minimum length of text to search
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
                width: "100%"
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
              <Button block info onPress={() => setModalArrive(false)}>
                <Text style={Style.text2}>Cancel</Text>
              </Button>
            )}
          />
        </View>
      </Modal>
    </>
  );
}
