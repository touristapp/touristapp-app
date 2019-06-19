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
    saveContainer: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        height: 40,
        backgroundColor: colors.SKY,
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
    }
});