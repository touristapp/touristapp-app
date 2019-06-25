import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.SKY,
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
    card: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 5
    },
    cardCover: {
        height: 100
    },
    cardAction: {
        height: 40
    }
});