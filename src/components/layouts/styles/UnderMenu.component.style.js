import { StyleSheet } from 'react-native';
import { COLORS,FONTS } from '../../contants';


export default StyleSheet.create({
    Contanier:{
        width: '100%',
        height:'100%',
    },
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
    menuKort: {
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    foodName: {
        fontSize: 20,
        marginTop: '2%',
        marginLeft: '3%',
    },
    foodPrice: {
        color: 'green',
        marginLeft: '3%',
        marginTop: '2%'
    },
    btnView:{
        flexDirection:'row',
        paddingTop:'10%',
        paddingBottom: '10%',
    },
    BasketBtn:{
        width:'80%',
        marginBottom: '10%',
        height:40,
        backgroundColor: COLORS.logoGreen,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    BasketBtnView:{
        flexDirection:'row',
        flex:1,
        alignItems: "center"
    },
    BasketBtnText:{
        marginLeft:'5%',
        color:COLORS.white,
        fontSize:17
    },
    BasketBtnPrice:{
        marginLeft:'25%',
        color:COLORS.white,
        fontSize:17
    },
    plusBtn: {
        backgroundColor: COLORS.white,
        width: 15,
        height: 10,
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    minusBtn: {
        backgroundColor: COLORS.white,
        width: 15,
        height: 10,
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    plusLogo: {
        width: 12,
        height: 12,
    },
    minusLogo: {
        width: 12,
        height: 12,
    },
    count:{
        paddingLeft: 20,
        paddingRight: 20,
        fontSize:20,
        fontWeight:'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width:'80%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    homeBtn:{
        width: 27,
        height: 27,
        marginLeft: '26%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeaderLine: {
        marginBottom: '2%',
        marginTop:'3%',
        textAlign: "center",
        fontWeight: "bold",
        fontSize:25
    },
    modalPrice:{
        fontWeight: "bold",
        marginBottom: '2%',
    },
    modalDescription:{

    }
});