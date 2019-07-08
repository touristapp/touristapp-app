import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import { Button, TextInput, DataTable, Portal, Dialog, HelperText, Drawer, Divider, List } from 'react-native-paper';
import Style from '../../../styles/viewAccount';
import { colors } from '../../../styles/themes/variables';
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state';

const EditVehicle = () => {
  const [{isLoading, showSnack, token, progress, currentUser, showDialog, userVehicle, vehicleFuel, defaultFuels}, dispatch ] = useStateValue();
  const [activeFuel,setActiveFuel] = useState(vehicleFuel);
  const [expandList,setExpandList] = useState(false);
  const [carbonFootprint,setCarbonFootprint] = useState(0);
  const newVehicle = useInput('');
  const newConso = useInput('');

  /**
  * @newVehicle
  * @newConso
  * @ UPDATES CURRENT VEHICLE NAME AND CONSO
  */
  useEffect(()=>{
    if (userVehicle!==undefined) {
      console.log(userVehicle);
      newVehicle.value = userVehicle.name;
      newConso.value = userVehicle.conso.toString();
    }
  })

  /**
  * @defaultFuels
  * @ FETCHES DEFAULT FUELS AND VEHICLES
  */
  useEffect(()=>{
    if (defaultFuels.length===0) {
      Fetch.getAllFuels(token).then( res => {
        for(let j=0;j<5;j++) {
          if (res.data[j].name==='diesel' || res.data[j].name==='essence') {
            defaultFuels.push(res.data[j]);
          }
        }
      })
    }
  },[])

  /**
  * @userVehicle
  * @vehicleFuel
  * @ UPDATES USER VEHICLE AND FUEL
  */
  useEffect(()=>{
    Fetch.getUserVehicle(currentUser.VehicleId,token).then( vehicle => {
      dispatch({type: 'userVehicle', setVehicle: vehicle.data})
      Fetch.getVehicleFuel(userVehicle.FuelId,token).then( fuel =>
        dispatch({type: 'vehicleFuel', setFuel: fuel.data}) );
    });
  },[isLoading])

  /**
  * @carbonFootprint
  * @newConso
  * @ CALCULATES CURRENT CARBON FOOTPRINT
  */
  useEffect(()=> {
    if(activeFuel) setCarbonFootprint(Math.round(newConso.value*activeFuel.carbonFootprint*100)/100);
  },[activeFuel]);


  const updateVehicle = () => {
    dispatch({type: 'isLoading', wait: true});
    const body = {
      name: newVehicle.value,
      FuelId: activeFuel.id,
      conso: newConso.value,
    }

    console.log(body);

    dispatch({type:'progress',load:progress+0.2});
    Fetch.updateVehicle(currentUser.id,body,token).then( res => {
      dispatch({type:'progress',load:progress+0.2});
      dispatch({type:'showDialog',dialog:{on:false,which:''}})
      dispatch({type: 'isLoading', wait: false});
      Snack.success('Modifications enregistrées !',showSnack,dispatch);
    });
  }

  const cancel = () => {
    dispatch({type:'showDialog',dialog:{on:false,which:''}});
    Snack.warning('Modifications annulées !',showSnack,dispatch);
  }

  return (
    <>
      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <DataTable.Title style={{marginLeft:10}}>MON VÉHICULE</DataTable.Title>
      </DataTable.Header>
      {vehicleFuel &&
        <>
        <DataTable.Header style={{backgroundColor:colors.CREAM}}>
          <DataTable.Title>Nom</DataTable.Title>
          <DataTable.Title numeric>Consommation</DataTable.Title>
          <DataTable.Title numeric>Carburant</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={Style.datarow}>
          <DataTable.Cell>{userVehicle.name}</DataTable.Cell>
          <DataTable.Cell numeric>{userVehicle.conso} L/100</DataTable.Cell>
          <DataTable.Cell numeric>{vehicleFuel.name}</DataTable.Cell>
        </DataTable.Row>
        </>
      }
      <DataTable.Row style={Style.datarow}>
        <Button style={Style.editVehicle} icon="directions-car" color={colors.SEA} mode="text" onPress={() => dispatch({type:'showDialog',dialog:{on:true,which:'vehicle'}})}>
            {currentUser.VehicleId && 'Modifier'}{!currentUser.VehicleId && 'Ajouter'} mon véhicule
        </Button>
        {(showDialog.which === 'vehicle') && (
          <Portal>
            <Dialog
               visible={showDialog.on}
               onDismiss={()=>dispatch({type:'showDialog',dialog:{on:false,which:''}})}>
              <Dialog.Title>{currentUser.VehicleId && 'Modifier'}{!currentUser.VehicleId && 'Ajouter'} mon véhicule</Dialog.Title>
                <Dialog.Content>
                  <ScrollView>
                    <View style={Style.mainContainer}>
              				<TextInput
              					selectionColor={colors.FIRE}
              					mode='outlined'
              					label='Nom'
              					style={Style.input}
              					dense={true}
                        {...newVehicle}
              				/>
                        <TextInput
                					selectionColor={colors.FIRE}
                					mode='outlined'
                					label='Consommation'
                					dense={true}
                          keyboardType={'numeric'}
                          {...newConso}
                				/>
                      <Text style={{marginBottom:10}}>{'L/100km'}</Text>
                        <List.Section>
                          <List.Accordion
                            title={`Type de fuel`}
                            style={{backgroundColor:colors.CREAM,opacity:0.7,borderRadius:5,marginVertical:2}}
                          >
                            <Drawer.Section>
                            {defaultFuels.map( (fuel,index) => {
                              return (
                                <Drawer.Item
                                  label={fuel.name}
                                  key={fuel.id}
                                  active={activeFuel.name.toLowerCase()===fuel.name.toLowerCase()}
                                  onPress={() => setActiveFuel(fuel)}
                                />
                              )
                            })}
                           </Drawer.Section>
                          </List.Accordion>
                        </List.Section>

                      <HelperText
                        type="info"
                        visible={true}
                        style={{borderWidth:1, borderRadius:5, borderColor:'grey', marginTop:5, backgroundColor: colors.CREAM, alignSelf:'center', flex:1}}
                      >
                          Pour 100km : {carbonFootprint} grammes de CO2
                      </HelperText>
                    </View>
                  </ScrollView>
                </Dialog.Content>
              <Dialog.Actions style={Style.actions}>
                <Button
                  style={Style.deleteButton}
                  icon="delete-forever"
                  mode="text"
                  onPress={cancel}
                  >
                  Annuler
                </Button>
                <Button
                  style={Style.saveButton}
                  icon="check"
                  mode="text"
                  onPress={updateVehicle}>
                  Valider
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </DataTable.Row>
      {currentUser.VehicleId &&
        <DataTable.Row style={Style.datarow}>
          <Button
            color={colors.FIRE}
            style={Style.deleteVehicle}
            icon="delete-forever"
            mode="text"
            >
            Supprimer mon véhicule
          </Button>
        </DataTable.Row>
      }
    </>
    )
}

export default EditVehicle;
