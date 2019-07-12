// React imports
import React, { useState, useEffect } from "react";

// Styles imports
import Style from "../../../styles/createRoute";
import { colors } from "../../../styles/themes/variables";

// Hooks imports
import { useStateValue } from '../../../hooks/state'
import ENV from "../../../../env";
import { Fetch, Snack, Storage, Vehicles } from '../../../tools';

// Components imports
import Banner from '../../../components/Banner'
import { View, Modal, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import Geocoder from 'react-native-geocoding';
import { getDistance } from 'geolib';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

export default function CreateRoute() {
  const [{ isLogged, switchScreen, showSnack, isLoading, token, progress, showDialog, defaultVehicles, currentUser, userVehicle }, dispatch] = useStateValue();
  const [addressDescDepart, setaddressDescDepart] = useState('');
  const [addressDescArrivee, setaddressDescArrivee] = useState('');
  const [index, setIndex] = useState(0);
  const [direction, setDirection ] = useState(null);
  const [carbonFootprint, setCarbonFootprint] = useState(null)
  const transports = [];

  Geocoder.init(ENV.googleMapsApiKey);

  /**
  * @defaultVehicles
  * @ INITS DEFAULT VEHICLES
  */
  useEffect(()=>{
    console.log("CALL CREATE ROUTE");
    if (defaultVehicles!==[]) {
      Vehicles.map( (vehicle,index) => {
          transports.push({
            label: vehicle.name,
            value: index
          });
      });

      if (userVehicle.id!==null) {
        transports.push({
          label: userVehicle.name,
          value: transports.length
        });
      }
      dispatch({type: 'defaultVehicles', set: transports})
    }
  },[])


  /**
  * @direction
  * @ GETS THE CARBON FOOTPRINT OF A TRAVEL
  */
  const search = async () => {
    if (addressDescDepart!=='' && addressDescArrivee!=='') {
      const vehicle = formatVehicle(defaultVehicles[index].label)

      // Maps API doesn't handle flights, so this is manual calculation
      // THIS IS ONLY AN ESTIMATION
      if (vehicle==='plane') {
        const start = await Geocoder.from(addressDescDepart).then( json =>
          json.results[0].geometry.location );
        const end = await Geocoder.from(addressDescArrivee).then( json =>
          json.results[0].geometry.location );
        const distance = getDistance(
          {latitude: start.lat, longitude: start.lng},
          {latitude: end.lat, longitude: end.lng}
        ) / 900;

        //Raw Data because not enough time to make it dynamic :/
        // need to make getOneVehicle not secured so it can be accessed if isLogged === false
        const planeConsumption = 0.12 // litter/km
        const keroseneCarbonSpread = 3000 // gCo2/liter
        //-----------------------------------------------------

        // CarbonFootPrint = FuelCarbonFootPrint x Consumption x Km
        getCarbonFootprint(
          keroseneCarbonSpread,
          planeConsumption,
          distance
        );
      } else {
        dispatch({type: 'isLoading', wait: true});
        Fetch.getDirections(addressDescDepart,addressDescArrivee,vehicle).then( result => {
          if (result.status==="OK") {
            Fetch.getOneVehicle(defaultVehicles[index].label, token).then( myVehicle => {
              Fetch.getVehicleFuel(myVehicle.data.id,token).then( myFuel => {
                const body = {
                  	UserId: currentUser.id,
                    departure: addressDescDepart,
                    destination: addressDescArrivee,
                    carbonFootprint: getCarbonFootprint(
                      myFuel.data.carbonFootprint,
                      myVehicle.data.conso,
                      result.routes[0].legs[0].distance.value/1000
                    ),
                    distance: Math.round(result.routes[0].legs[0].distance.value/1000),
                    duration: result.routes[0].legs[0].duration.value,
                    done: false,
                    VehicleId: myVehicle.data.id
                };

                console.log(body);

                Fetch.createTravel(body, token ).then( travel => {
                  console.log(travel);
                })
              })
            })
          } else {
            setCarbonFootprint(null)
            return Snack.warning('Itinéraire impossible à calculer !',showSnack,dispatch);
          }
        })
        dispatch({type: 'isLoading', wait: false});
      }
    } else {
      Snack.danger('Tous les champs doivent être remplis !',showSnack,dispatch);
    }
  }

  /**
  * @defaultVehicles
  * @ FORMATS VEHICLE NAME FOR MAPS API
  */
  const formatVehicle = (vehicleName) => {
    switch(vehicleName) {
      case 'Train' :
        return 'transit';
      case 'Voiture' :
        return 'driving';
      case 'Vélo' :
        return 'bicycling';
      case 'Avion' :
        return 'plane';
      default :
        return 'driving';
    }
  }

  /**
  * @carbonFootprint
  * @ CALCULATES CARBON FOOTPRINT
  */
  const getCarbonFootprint = (fuelCarbonFootPrint, consumption, distance) => {
    const result = Math.round(fuelCarbonFootPrint * consumption * distance / 1000 * 100) / 100;
    setCarbonFootprint(result);
    return result;
  }

  /**
  * @index
  * @ UPDATES RADIO BUTTONS INDEX
  */
  const onPressRadio = value => setIndex(value);

  /**
  * @backgroundColor
  * @ SETS DYNAMIC STYLE FOR RESULT
  */
  const resultStyle = currentFootprint => {
    let color;
    // Average per travel : 600kgCo2
    if (currentFootprint < 500) {
      color = colors.GREEN;
    } else if (currentFootprint < 800) {
      color = colors.CARROT;
    } else
      color = colors.BLOOD;

    return {
          alignSelf: 'center',
          width: 300,
          height: 50,
          backgroundColor: color,
          marginBottom: 30,
          paddingTop: 14,
          borderRadius: 7,
          opacity: 0.8,
        }
  }

  /**
  * @showDialog
  * @showSnack
  * @ CLOSES INFOS DIALOG
  */
  const cancel = () => {
    dispatch({type:'showDialog',dialog:{on:false,which:''}})
    Snack.warning('Départ annulé',showSnack,dispatch);
  }

  /**
  * @isLogged
  * @ LOGOUT
  */
  const logout = () => {
    dispatch({type: 'resetState'});
    Storage.clear();
    Snack.warning('Logged out !',showSnack,dispatch);
  }

  return (
    <>
      <Banner message= "Itinéraire"/>
      <ScrollView contentContainerStyle={Style.mainContainer}>
          <View>
            <Image
              source={require("../../../assets/logo.png")}
              style={{margin: 0, alignSelf:'center', width: 200, height: 200}}/>
          </View>
          <View style={Style.form}>
              {isLoading===true &&
                <ActivityIndicator size='large' animating={true} color={colors.SEA} />
              }
              {isLoading!==true && carbonFootprint!==null &&
                <View style={resultStyle(carbonFootprint)}>
                  <Text style={{alignSelf:'center', fontSize: 18, color: colors.WHITE, fontWeight: 'bold'}}>{carbonFootprint} kg de CO2 / passager</Text>
                </View>
              }
              {isLoading!==true &&
              <>
              <GooglePlacesAutocomplete
                placeholder="Départ"
                marginTop= {2}
                minLength={2}
                autoFocus={false}
                keyboardAppearance={"light"}
                renderDescription={row => row.description}
                listViewDisplayed="true"
                fetchDetails={true}
                onPress={data => setaddressDescDepart(data.description)}
                getDefaultValue={() => addressDescDepart}
                query={{key: ENV.googleMapsApiKey, language: "fr", types: '(cities)'}}
                GooglePlacesSearchQuery={{rankby: "distance", type: "geocode"}}
                GooglePlacesDetailsQuery={{fields: "formatted_address"}}
                filterReverseGeocodingByTypes={["locality", "administrative_area_level_3"]}
                debounce={200}
              />
              <GooglePlacesAutocomplete
                placeholder="Arrivée"
                minLength={2}
                autoFocus={false}
                returnKeyType={"search"}
                keyboardAppearance={"light"}
                listViewDisplayed="true"
                fetchDetails={true}
                onPress={data => setaddressDescArrivee(data.description)}
                getDefaultValue={() => addressDescArrivee}
                query={{key: ENV.googleMapsApiKey, language: "fr", types: '(cities)'}}
                GooglePlacesSearchQuery={{ rankby: "distance", type: "geocode" }}
                GooglePlacesDetailsQuery={{ fields: "formatted_address" }}
                filterReverseGeocodingByTypes={["locality", "administrative_area_level_3"]}
                debounce={200}
              />
            <View>
              <RadioForm formHorizontal={true} animation={true} style={{justifyContent:'center'}}>
                {(defaultVehicles!==[]) && defaultVehicles.map((obj, i) => (
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
                onPress= {search}
              >
                Rechercher
                </Button>
                {!isLogged &&
                  <Button
                    style={Style.connectButton}
                    icon="send"
                    mode="contained"
                    onPress={() => dispatch({
                        type: 'switchScreen',
                        tab: 'AuthScreen',
                        screen: 'login'
                    })}>
                    S'identifier
                  </Button>
                }
              </View>
            </>
            }
          </View>
      </ScrollView>
    </>
  );
}
