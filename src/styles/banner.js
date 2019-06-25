import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
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
});
