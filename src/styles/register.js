import { StyleSheet } from 'react-native'
import { colors } from './themes/variables'

export default StyleSheet.create({
    main: {
      backgroundColor: colors.SKY,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50,
    },
    loader: {
      marginTop: 200,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 5,
      marginTop: -43,
      alignSelf: 'center',
    },
    form:  {
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      borderRadius: 5,
    },
    title: {
      opacity: 0.6,
      alignSelf: 'center',
      fontWeight: 'bold'
    },
    input: {
     height: 70,
     width: 300,
    },
    button: {
      marginTop:10,
      backgroundColor: colors.CARROT,
      padding: 8,
      zIndex: 100,
    },
    button2: {
      marginTop:10,
      backgroundColor: colors.SEA,
      padding: 8,
      zIndex: 100,
    }
});
