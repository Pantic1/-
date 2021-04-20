import { StyleSheet } from 'react-native';
import { COLORS,FONTS } from '../../contants';


export default StyleSheet.create({
    Header: {
        width: '100%',
        height: '25%',
        marginTop:'-10%',
        backgroundColor: 'white',
        shadowColor: COLORS.darkgray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.41,
        elevation: 1,
    },
    viewRestaurants: {
        width: '82%',
        height: 220,
        backgroundColor: 'white',
        marginTop: '9%',
        marginLeft: '9%',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
});