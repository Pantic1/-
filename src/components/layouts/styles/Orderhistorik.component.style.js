import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
    Contanier: {
        width: '100%',
        marginTop: '10%'
    },
    headline: {
        fontSize: 30,
        marginBottom: '5%',
        marginLeft: '2%'
    },
    header: {
        flexDirection: 'row',
    },
    hambugerMenu: {
        width: 23,
        height: 23,
        marginTop: '9%',
        marginLeft: '20%'
    },
    content: {
        borderColor: COLORS.black,
        borderWidth: 1,
        marginBottom: '1%',
        width: '80%',
        alignSelf: 'center',
    },
    contentNavn: {
        fontSize: 25,
        alignSelf: 'center'
    },
    contentText: {
        fontSize: 15,
        alignSelf: 'center'
    },
    contentPrice: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight:'500',
    },
    contentOrder:{
        fontSize: 20,
        alignSelf: 'center',
        fontWeight:'500',
        color:COLORS.logoGreen
    }
    

});