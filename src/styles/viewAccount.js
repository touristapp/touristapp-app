import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
      header:{
        borderBottomWidth: 2,
        borderColor: colors.WHITE,
        /*backgroundColor: colors.SEA,*/
        shadowOffset:{  width: 50,  height: 50,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        height:160,
      },
      headerImage: {
        height: 160,
        marginTop: -3,
      },
      container: {
        display: 'flex',
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 250,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: colors.WHITE,
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:90
      },
      name:{
        fontSize:22,
        fontFamily: 'Futura medium bt',
        color: colors.CARROT,
        fontWeight:'600',
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        display:'flex',
        flexDirection:'column',
        padding:30,
      },
      name:{
        fontSize:28,
        color: colors.COAL,
        fontWeight: "600"
      },
      info:{
        fontSize:20,
        fontWeight: "500",
        color: "#696969",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
      editInfos: {
        alignSelf: 'center',
        marginTop: 5,
        padding: 8,
        flex: 1,
      },
      datarow: {
        backgroundColor:colors.WHITE,
      },

      editVehicle: {
          alignSelf: 'center',
          flex: 1,
          marginTop: 5,
          padding: 8,
      },
      editPassword: {
          width: 300,
          alignSelf: 'center',
          marginTop: 5,
          backgroundColor: colors.BLOOD,
          padding: 8,
      },
      actions: {
        display: 'flex',
        flexDirection: 'row',
      },
      deleteButton: {
        borderWidth: 1,

        marginLeft: -50,
      },
      saveButton: {
        marginLeft: 0,
      },
      disconnect: {
        width: 300,
        alignSelf: 'center',
        marginTop:5,
        marginBottom: 20,
        backgroundColor: colors.FIRE,
        padding: 8,
      }
});
