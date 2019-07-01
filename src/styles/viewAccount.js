import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.SKY,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoContainer: {
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      borderRadius: 5,
    },
    imageContainer: {
        justifyContent: 'center',
        paddingBottom: 20
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
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.COAL,
        backgroundColor: colors.CREAM,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 10,
    },
    subCarContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    edit: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: colors.SKY,
        padding: 8,
    },
    disconnect: {
        marginTop:10,
        alignSelf: 'center',
        backgroundColor: colors.FIRE,
        padding: 8,
    }
});
