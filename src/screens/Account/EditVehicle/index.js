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
  console.log('**** USER VEHICLE IN CONSTS ****');
  console.log(userVehicle);
  const newVehicle = userVehicle!==undefined ? useInput(userVehicle.name) : useInput('');
  const newConso = userVehicle!==undefined ? useInput(userVehicle.conso.toString()) : useInput('');

  /**
  * @defaultFuels
  * @ FETCHES DEFAULT FUELS AND USERVEHICLE
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
  * @carbonFootprint
  * @newConso
  * @ CALCULATES CURRENT CARBON FOOTPRINT
  */
  useEffect(()=> activeFuel ? setCarbonFootprint( Math.round( newConso.value * activeFuel.carbonFootprint * 100) / 100) : null, [activeFuel,newConso]);

  /**
  * @userVehicle
  * @currentUser
  * @ UPDATES USER VEHICLE
  */
  const updateVehicle = () => {
    dispatch({type: 'isLoading', wait: true});

    if (newVehicle.value==='' || newConso.value==='' || activeFuel.id===null) {
      Snack.danger('Tous les champs doivent être remplis !',showSnack,dispatch);
      return dispatch({type: 'isLoading', wait: false});
    }

    const body = {
      vehicleId: userVehicle.id || 0,
      name: newVehicle.value,
      FuelId: activeFuel.id,
      conso: newConso.value,
    }

    dispatch({type:'progress',load:0.33});
    Fetch.updateVehicle(currentUser.id,body,token).then( result => {
      if (result.data.VehicleId) {
        dispatch({type: 'currentUser', define: result.data})
        dispatch({type:'progress',load:progress+0.33});
        Fetch.getUserVehicle(result.data.VehicleId,token).then( async vehicle => {
          dispatch({type: 'userVehicle', setVehicle: vehicle.data})
          Snack.success('Modifications enregistrées !',showSnack,dispatch);
        })
      } else {
        dispatch({type: 'userVehicle', setVehicle: result.data})
        dispatch({type:'progress',load:progress+0.33});
        Snack.success('Modifications enregistrées !',showSnack,dispatch);
      }
      dispatch({type:'progress',load:progress+0.33});
      dispatch({type:'showDialog',dialog:{on:false,which:''}})
      dispatch({type: 'isLoading', wait: false});
    });
  }

  /**
  * @showDialog
  * @showSnack
  * @ CLOSES VEHICLE DIALOG
  */
  const cancel = () => {
    newVehicle.value = '';
    newConso.value = '';
    dispatch({type:'showDialog',dialog:{on:false,which:''}});
    Snack.warning('Modifications annulées !',showSnack,dispatch);
  }

  return (
    <>
      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <DataTable.Title style={{marginLeft:10}}>MON VÉHICULE</DataTable.Title>
      </DataTable.Header>
      {vehicleFuel!==undefined && userVehicle!==undefined &&
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
