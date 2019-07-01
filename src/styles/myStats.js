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
    mainForm:  {
        backgroundColor: colors.WHITE,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainText: {
        paddingLeft: 10,
        flex: 1, 
        flexWrap: 'wrap'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.SKY,
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    subForm: {
        backgroundColor: colors.WHITE,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        width: 160,
        height: 160,
    },
    title: {
        fontSize: 14
    },
    textContent: {
        paddingTop: 15,
        fontSize: 48,
        color: colors.BLACK
    },
    textBottom: {
        position: 'absolute',
        bottom: 10
    }
});
