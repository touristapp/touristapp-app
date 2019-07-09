import React from 'react';
import { View, Image } from 'react-native';
import { Button, TextInput, DataTable, Portal, Dialog } from 'react-native-paper';
import Style from '../../../styles/viewAccount';
import { colors } from '../../../styles/themes/variables';
import useInput from '../../../hooks/useInputs';
import { useStateValue } from '../../../hooks/state';

const EditInfos = () => {
  const [{showSnack, token, currentUser, showDialog, progress, isLoading}, dispatch ] = useStateValue();
  const oldPassword = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');

  /**
  * @currentUser
  * @ UPDATES USER INFOS
  */
  const updatePassword = () => {
    const body = {
      old_password: oldPassword.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    }
    dispatch({type:'progress',load:0.5});
    Fetch.updatePassword(currentUser.id,body,token).then( res => {
      console.log(res);
      if (res.error!==undefined) {
        Snack.danger(res.error,showSnack,dispatch);
        dispatch({type: 'isLoading', wait: false});
      } else {
        dispatch({type: 'isLoading', wait: true});
        dispatch({type:'progress',load:progress+0.5});
        dispatch({type:'showDialog',dialog:{on:false,which:''}})
        logout();
        Snack.success('Mot de passe modifié !',showSnack,dispatch);
        dispatch({type: 'isLoading', wait: false});
      }
    });
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
    <DataTable.Header style={{backgroundColor:colors.CARROT, marginTop:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
      <DataTable.Title>MA CONNEXION</DataTable.Title>
    </DataTable.Header>
    <DataTable.Row style={Style.datarow}>
      <DataTable.Cell>Mot de passe</DataTable.Cell>
      <DataTable.Cell>●●●●●●●●</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row style={Style.datarow}>
        <Button style={Style.editInfos} icon="security" color={colors.SEA} mode="text" onPress={()=>dispatch({type:'showDialog',dialog:{on:true,which:'password'}})}>Modifier mon mot de passe</Button>
        {(showDialog.which === 'password') && (
          <Portal>
            <Dialog
               visible={showDialog.on}
               onDismiss={()=>dispatch({type:'showDialog',dialog:{on:false,which:''}})}>
              <Dialog.Title>Modifier mon mot de passe</Dialog.Title>
                <Dialog.Content>
                  <View style={Style.mainContainer}>
            				<TextInput
            					selectionColor={colors.FIRE}
            					mode='outlined'
            					label='Ancien mot de passe'
            					style={Style.input}
            					dense={true}
                      {...oldPassword}
            				/>
            				<TextInput
            					selectionColor={colors.FIRE}
            					mode='outlined'
            					label='Mot de passe'
            					style={Style.input}
            					dense={true}
                      {...password}
            				/>
                    <TextInput
            					selectionColor={colors.FIRE}
            					mode='outlined'
            					label='Confirmation'
            					style={Style.input}
            					dense={true}
                      {...passwordConfirm}
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
                  onPress={updatePassword}>
                  Valider
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </DataTable.Row>
      <DataTable.Row style={Style.datarow}>
        <Button style={Style.editVehicle} icon="remove-circle" color={colors.CARROT} mode="text" onPress={logout}>
            Déconnexion
        </Button>
      </DataTable.Row>
    </>
    )
}

export default EditInfos;
