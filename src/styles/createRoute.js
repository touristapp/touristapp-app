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
      fontSize: 25,
      marginBottom: 8

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

    textInputContainer: {
        backgroundColor: '#FFF',
        fontSize: 55,
        borderLeftColor: colors.COAL, 
        borderRightColor: colors.COAL, 
        borderTopColor: colors.COAL, 
        borderBottomColor: colors.COAL,
        borderRadius: 5,
        borderWidth: 0.8,
        paddingTop: 20,
        paddingBottom: 30,
        height: 70,
        marginBottom: 5

    },

    cancelButton: {
        height: 46,
        marginTop:5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colors.FIRE,
        padding: 5,
    },

    textDestination:{
        marginLeft: 5,
        fontSize: 15
    },

    textcancelButton: {
        textAlign: 'center',
         color: 'white'
    }
    
});
