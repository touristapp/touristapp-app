import { StyleSheet } from 'react-native'
import { colors } from '../themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.WHITE,
        justifyContent: 'center'
    },
    banner: {
        height: 50,
        backgroundColor: colors.COAL,
        justifyContent: 'center'
    },
    bannerText: {
        color: colors.WHITE,
        textAlign: 'center',
        fontSize: 20
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
    editContainer: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        height: 40,
        backgroundColor: colors.SKY,
        justifyContent: 'center'
    },
    deleteContainer: {
        marginLeft: 50,
        marginRight: 50,
        height: 40,
        backgroundColor: colors.FIRE,
        justifyContent: 'center'
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
        padding: 5
    },
    subCarContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between'
    }
});