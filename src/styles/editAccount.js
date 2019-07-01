import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center'
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
    input: {
        marginLeft: 20,
        marginRight: 20,
    },
    saveContainer: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        padding: 4,
        backgroundColor: colors.SKY,
    },
    deleteContainer: {
        alignSelf: 'center',
        backgroundColor: colors.BLOOD,
        padding: 4,
    }
});
