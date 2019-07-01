import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.SKY,
        alignItems: 'center'
    },
    banner: {
        height: 50,
        backgroundColor: colors.COAL,
        justifyContent: 'center',
        zIndex: 50,
    },
    bannerText: {
        color: colors.WHITE,
        textAlign: 'center',
        fontSize: 20
    },
    form:  {
        backgroundColor: colors.WHITE,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    title: {
        fontSize: 18
    },
    subForm: {
        display: 'flex',
        flexDirection: 'row'
    },
    textSubForm: {
        display: 'flex',
        flexDirection: 'column'
    },
    text: {
        paddingLeft: 10,
        color: colors.BLACK
    },
    share: {
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    shareImage: {
        width: 25, 
        height: 25,
    }
});
