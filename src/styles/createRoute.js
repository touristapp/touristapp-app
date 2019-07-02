import { StyleSheet, Dimensions } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.SKY,
        justifyContent: 'center',
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

    container: {
        flex: 1,
    },
    
    textInputContainer: {
        backgroundColor: '#FFF',
        height: 70,
        flexDirection: 'row',
    },
    
    textInput: {
        backgroundColor: '#FFF',
        height: 70,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingTop: 4.5,
        paddingBottom: 4.5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 17,
        flex: 1
    },
});
