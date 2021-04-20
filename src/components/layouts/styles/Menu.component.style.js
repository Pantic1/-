import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../contants';


export default StyleSheet.create({
    Contanier: {
        width: '100%',
        height: '100%',
    },
    Header: {
        width: '100%',
        height: '30%',
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: COLORS.darkgray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.41,
    },
    RestaurantInfo: {
        borderRadius: 40,
        backgroundColor: 'white',
        height: '25%',
        width: '85%',
        position: 'absolute',
        zIndex: 4,
        marginTop: '50%',
        marginLeft: '7%',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.41,
        elevation: 1,
    },
    RestaurantName: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        marginLeft: '23%',
        marginTop: '8%'
    },
    resLogo: {
        height: 30,
        width: 30,
        marginTop: '13%',
        marginLeft: '17%',

    },
    resLogoView: {
        marginTop: '6%',
        marginLeft: '7%',
        borderRadius: 100,
        height: 50,
        width: 50,
        backgroundColor: COLORS.primary
    },
    List: {
        marginTop: '6%',
        marginLeft: '7%',
        height: '60%',
        width: '80%',
    },
    iconImage: {
        height: 19,
        width: 24,
        marginLeft: '5%',
    },
    iconDollar: {
        height: 18,
        width: 12,
        marginLeft: '9%',
    },
    iconThumpsup: {
        height: 18,
        width: 18,
        marginLeft: '7%',
    },
    iconText: {
        marginLeft: '3%',
    },
    underlist: {
        flexDirection: 'row',
        marginBottom: '6%'
    },
    homeBtn: {
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 50,
        backgroundColor: COLORS.logoGreen,
        borderRadius: 100,
        padding:6,
        marginTop:50,
        marginLeft:20
    },
    categoriesBtn: {
        height: 40,
        width: '80%',
        backgroundColor: 'white',
        marginBottom: '2%',
        marginLeft: '10%',
        borderRadius: 20,
        justifyContent: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.41,
        elevation: 1,
    },
    headlineCate: {
        textAlign: 'center',
        fontSize: 25, 
        marginBottom: '5%'
    }



});