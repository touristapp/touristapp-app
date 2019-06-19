import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.SKY
    },
    button: {
      alignSelf: 'center',
      width: 300,
      marginTop:10,
      backgroundColor: colors.BLOOD,
      padding: 8,
    }
});
