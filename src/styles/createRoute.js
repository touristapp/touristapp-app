import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.SKY,
        justifyContent: 'center'
    },
    form:  {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20
    },
    searchButton: {
        marginTop:10,
        backgroundColor: colors.FIRE,
        padding: 8,
    },
    input: {
        height: 70,
    }
});
