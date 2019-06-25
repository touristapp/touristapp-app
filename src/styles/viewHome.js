import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.SKY,
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
