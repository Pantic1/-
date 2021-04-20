import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
   Contanier:{
      backgroundColor:COLORS.white,
      height: '100%'
   },
   ItemView:{
       backgroundColor:'#fdfefe',
       height: 100,
       width:'80%',
       marginLeft:'10%',
       marginBottom:'6%',
       borderRadius:20,
       shadowColor: "#eef2f8",
       shadowOffset: {
           width:9,
           height: 8,
       },
       shadowOpacity: 1.0,
       shadowRadius: 10,
       elevation: 9,
   },
   ItemText:{
      fontSize: 20,
      marginLeft:'10%',
      marginTop:'2%',
      fontWeight:'bold'
   },
   ItemDec:{
      fontSize: 15,
      marginLeft:'10%',
      marginTop:'2%',
   },
   itemPrice:{
      fontSize: 15,
      marginLeft:'10%',
      marginTop:'2%',
   },
   headline:{
      fontSize: 25,
      marginTop:'6%',
      marginBottom:'8%',
      marginLeft:'10%',
   },
   headlineCart:{
      fontSize: 25,
      fontWeight:'bold'
   },
   plusLogo: {
      width: 12,
      height: 12,
  },
  minusLogo: {
      width: 12,
      height: 12,
  },
  plusBtn: {
   backgroundColor: COLORS.white,
   width: 15,
   height: 10,
   padding:15,
   justifyContent:'center',
   alignItems:'center',
   marginBottom:'25%',
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
viewBtn:{
   marginLeft:'85%',
   marginTop:'3%',
   position:'absolute'
},
ItemQty:{
   fontSize:35,
   position:'absolute',
   marginLeft:'70%',
   marginTop:'7%'
},
backBtn:{
   marginTop:'15%',
   marginLeft:'5%',
},
backImage:{
   width: 25,
   height: 25,
},
footer:{
   flexDirection: "row",
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
totalText:{
   marginTop:'3%'
},
totalPrice:{
   fontSize:30,
   position:'absolute',
   marginTop:'7%',
   marginLeft:'5%'
},
orderBtn:{
   height:40,
   width:100,
   backgroundColor:COLORS.logoGreen,
   borderRadius: 10,
   justifyContent:'center',
   alignItems:'center',
   marginLeft:'45%',
   marginTop:'4%'
},
orderBtnText:{
   fontSize:18,
   color:COLORS.white,
   fontWeight:'500'
}
});