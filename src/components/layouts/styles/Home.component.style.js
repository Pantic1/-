import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
    Logo: {
        width: 150,
        height: 115,
        marginLeft:'32%'
    },
    searchLogo: {
        width: 18,
        height: 18,
    },
    searchBar: {
        height: 40,
        width: '70%',
        backgroundColor: COLORS.lightGray,
        paddingLeft:'3%',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    searchBtn: {
        backgroundColor: COLORS.logoGreen,
        width: '14%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    searchContainer: {
        width: '70%',
        marginTop:'10%',
        marginLeft: '20%',
        flexDirection: 'row'
    }

});