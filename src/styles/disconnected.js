import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.SKY,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        marginBottom: 20
    },
    connectButton: {
      marginTop:100,
      backgroundColor: colors.GREEN,
      padding: 8,
      zIndex: 100,
    }
});
