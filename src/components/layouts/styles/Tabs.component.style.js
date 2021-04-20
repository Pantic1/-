import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
    main: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: '1%',
        width: '100%',
        height: '9%',
        minHeight: 50,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingLeft:'5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    basketTabs:{
        width: 70,
        height: 70,
        backgroundColor:COLORS.logoGreen,
        borderRadius:100,
        marginBottom:'20%',
        justifyContent: "center",
        alignItems: "center",
        marginRight: '10%',
    },
    basketIcon: {
        width: 32,
        height: 32,
    },
    personTabs: {
        width: 27,
        height: 27,
        marginLeft: '20%'
    },
    badge:{
        width: 17,
        height: 17,
        backgroundColor:COLORS.primary,
        borderRadius:100,     
        justifyContent: "center",
        alignItems: "center",   
    },
    homeBtn:{
        width: 27,
        height: 27,
        marginLeft: '26%',
    },
});