import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Button, TextInput, DataTable, Portal, Dialog, HelperText, Drawer, Divider } from 'react-native-paper';
import Style from '../../../styles/viewAccount';
import { colors } from '../../../styles/themes/variables';
import { useStateValue } from '../../../hooks/state';

const EditVehicle = () => {
  const [{showSnack, token, currentUser, showDialog, userVehicle, vehicleFuel, defaultVehicles, defaultFuels}, dispatch ] = useStateValue();
  const [activeDrawer,setActiveDrawer] = useState('voiture');

  useEffect(()=>{
    if (showDialog.which==='vehicle' && defaultVehicles.length===0) {
      Fetch.getAllVehicles(token).then( res => {
        for(let i=0;i<4;i++) defaultVehicles.push(res.data[i]);
      })
    }
  },[showDialog])

  const updateVehicleName = char => dispatch({type:'userVehicle',setVehicle:{...state,name:char}});

    return (
    <>
      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <DataTable.Title style={{marginLeft:10}}>MON VÉHICULE</DataTable.Title>
      </DataTable.Header>
      {currentUser.VehicleId &&
        <>
        <DataTable.Header style={{backgroundColor:colors.CREAM}}>
          <DataTable.Title>Nom</DataTable.Title>
          <DataTable.Title numeric>Consommation</DataTable.Title>
          <DataTable.Title numeric>Carburant</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={Style.datarow}>
          <DataTable.Cell>{userVehicle.name}</DataTable.Cell>
          <DataTable.Cell numeric>{userVehicle.conso} L/100</DataTable.Cell>
          <DataTable.Cell numeric>{vehicleFuel.carbonFootprint} {vehicleFuel.unit}</DataTable.Cell>
        </DataTable.Row>
        </>
      }
      <DataTable.Row style={Style.datarow}>
        <Button style={Style.editVehicle} icon="directions-car" color={colors.SEA} mode="text" onPress={() => -dispatch({type:'showDialog',dialog:{on:true,which:'vehicle'}})}>
            {currentUser.VehicleId && 'Modifier'}{!currentUser.VehicleId && 'Ajouter'} mon véhicule
        </Button>
        {(showDialog.which === 'vehicle') && (
          <Portal>
            <Dialog
               visible={showDialog.on}
               onDismiss={()=>dispatch({type:'showDialog',dialog:{on:false,which:''}})}>
              <Dialog.Title>{currentUser.VehicleId && 'Modifier'}{!currentUser.VehicleId && 'Ajouter'} mon véhicule</Dialog.Title>
                <Dialog.Content>
                  <View style={Style.mainContainer}>
            				<TextInput
            					selectionColor={colors.FIRE}
            					mode='outlined'
            					label='Nom'
                      onChangeValue={updateVehicleName}
                      value={userVehicle.name}
            					style={Style.input}
            					dense={true}
            				/>
                    <Drawer.Section title="Type de véhicule :" style={{borderWidth:1,borderColor:'grey',borderRadius:5,marginTop:5}}>
                    {defaultVehicles.map( vehicle =>
                      <Drawer.Item
                        label={vehicle.name}
                        active={activeDrawer === `${vehicle.name.toLowerCase()}`}
                        onPress={() => setActiveDrawer(`${vehicle.name.toLowerCase()}`)}
                      />
                    )}
                   </Drawer.Section>
            				<TextInput
            					selectionColor={colors.FIRE}
            					mode='outlined'
                      value={`${userVehicle.conso} L/100`}
            					label='Consommation'
            					style={Style.input}
            					dense={true}
            				/>
                    <TextInput
            					selectionColor={colors.FIRE}
            					mode='outlined'
                      value={vehicleFuel.name}
            					label='Fuel'
            					style={Style.input}
            					dense={true}
            				/>
                    <HelperText
                      type="info"
                      visible={true}
                      style={{borderWidth:1, borderRadius:5, borderColor:'grey', marginTop:5, backgroundColor: colors.CREAM, alignSelf:'center'}}
                    >
                      {vehicleFuel.carbonFootprint} {vehicleFuel.unit}
                    </HelperText>
                  </View>
                </Dialog.Content>
              <Dialog.Actions style={Style.actions}>
                <Button
                  style={Style.deleteButton}
                  icon="delete-forever"
                  mode="text"
                  >
                  Annuler
                </Button>
                <Button
                  style={Style.saveButton}
                  icon="check"
                  mode="text"
                  onPress={() => {
                    dispatch({type:'showDialog',dialog:{on:false,which:''}})
                    Snack.success('Modifications enregistrées !',showSnack,dispatch);
                  }}>
                  Valider
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </DataTable.Row>
      <DataTable.Row style={Style.datarow}>
        <Button
          icon="delete-forever"
          mode="text"
          >
          Supprimer mon véhicule
        </Button>
      </DataTable.Row>
    </>
    )
}





export default EditVehicle;
