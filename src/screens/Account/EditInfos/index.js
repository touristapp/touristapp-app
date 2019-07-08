import React from 'react';
import { View, Image } from 'react-native';
import { Button, TextInput, DataTable, Portal, Dialog } from 'react-native-paper';
import Style from '../../../styles/viewAccount';
import { colors } from '../../../styles/themes/variables';
import { useStateValue } from '../../../hooks/state';

const EditInfos = () => {
  const [{showSnack, currentUser, showDialog}, dispatch ] = useStateValue();

  const updateInfos = () => {

  }

    return (
    <>
      <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:20, borderTopLeftRadius:20, borderTopRightRadius:20}}>
        <DataTable.Title style={{marginLeft:10}}>MES INFORMATIONS</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row style={Style.datarow}>
        <DataTable.Cell>Pseudo</DataTable.Cell>
        <DataTable.Cell>{currentUser.name}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={Style.datarow}>
        <DataTable.Cell>Email</DataTable.Cell>
        <DataTable.Cell>{currentUser.email}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={Object.assign({borderBottomRightRadius:20},Style.datarow)}>
          <Button style={Style.editInfos} icon="person-pin" color={colors.SEA} mode="text" onPress={()=>dispatch({type:'showDialog',dialog:{on:true,which:'infos'}})}>Modifier mes informations</Button>
          {(showDialog.which === 'infos') && (
            <Portal>
              <Dialog
                 visible={showDialog.on}
                 onDismiss={()=>dispatch({type:'showDialog',dialog:{on:false,which:''}})}>
                <Dialog.Title>Modifier mes informations</Dialog.Title>
                  <Dialog.Content>
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
                        value={currentUser.name}
              					style={Style.input}
              					dense={true}
              				/>
              				<TextInput
              					selectionColor={colors.FIRE}
              					mode='outlined'
                        value={currentUser.email}
              					label='Email'
              					style={Style.input}
              					dense={true}
              				/>
                    </View>
                  </Dialog.Content>
                <Dialog.Actions style={Style.actions}>
                  <Button
                    style={Style.deleteButton}
                    icon="delete-forever"
                    mode="text"
                    >
                    Supprimer mon compte
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
    </>
    )
}





export default EditInfos;
