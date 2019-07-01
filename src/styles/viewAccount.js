import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.SKY,
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoContainer: {
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      backgroundColor: '#FFF',
      width: 340,
      marginBottom: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    imageContainer: {
        marginTop: 20,
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.COAL,
    },
    buttonText: {
        textAlign: 'center'
    },
    boldCenteredText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    email: {
        textAlign: 'center'
    },
    carContainer: {
        width: 300,
        borderRadius: 4,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: colors.COAL,
        backgroundColor: colors.CREAM,
        marginTop: 20,
        paddingVertical: 10,
    },
    subCarContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    editInfos: {
        alignSelf: 'center',
        width: 300,
        marginTop: 10,
        backgroundColor: colors.SEA,
        padding: 8,
    },
    editVehicle: {
        width: 300,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: colors.COAL,
        padding: 8,
    },
    editPassword: {
        width: 300,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: colors.BLOOD,
        padding: 8,
    },
    disconnect: {
      width: 300,
      alignSelf: 'center',
      marginTop:10,
      marginBottom: 20,
      backgroundColor: colors.FIRE,
      padding: 8,
    }
});
