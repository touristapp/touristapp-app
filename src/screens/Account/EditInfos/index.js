import React from 'react';
import { View, Image } from 'react-native';
import { Button, TextInput, DataTable, Portal, Dialog } from 'react-native-paper';
import Style from '../../../styles/viewAccount';
import { colors } from '../../../styles/themes/variables';
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state';

const EditInfos = () => {
  const [{showSnack, token, currentUser, showDialog, progress, isLoading}, dispatch ] = useStateValue();
  const name = useInput(currentUser.name);
  const email = useInput(currentUser.email);

  /**
  * @currentUser
  * @ UPDATES USER INFOS
  */
  const updateInfos = () => {
    dispatch({type: 'isLoading', wait: true});
    const body = {
      name: name.value,
      email: email.value,
    }
    dispatch({type:'progress',load:0.5});
    Fetch.updateInfos(currentUser.id,body,token).then( res => {
      Fetch.getCurrentUser(token).then( async user => {
        dispatch({type:'progress',load:progress+0.5});
        dispatch({type: 'currentUser', define: user.data});
      })
      dispatch({type:'showDialog',dialog:{on:false,which:''}})
      Snack.success('Modifications enregistrées !',showSnack,dispatch);
      dispatch({type: 'isLoading', wait: false});
    });
  }

  /**
  * @showDialog
  * @showSnack
  * @ CLOSES INFOS DIALOG
  */
  const cancel = () => {
    dispatch({type:'showDialog',dialog:{on:false,which:''}});
    Snack.warning('Modifications annulées !',showSnack,dispatch);
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
              					style={Style.input}
              					dense={true}
                        {...name}
              				/>
              				<TextInput
              					selectionColor={colors.FIRE}
              					mode='outlined'
              					label='Email'
              					style={Style.input}
              					dense={true}
                        {...email}
              				/>
                    </View>
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
                    onPress={updateInfos}>
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
