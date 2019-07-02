import { StyleSheet, Dimensions } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.SKY,
        justifyContent: 'center',
    },

    title: {
      opacity: 0.9,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 25
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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#DDE246",
    },

    textInputContainer: {
        backgroundColor: '#FFF',
        height: 70,
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 8
    },
    
    textInput: {
        backgroundColor: '#FFF',
        height: 70,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1
    },
});
