import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
   Contanier: {
      width: '100%',
      marginTop: '10%'
  },
   headline: {
      fontSize: 30,
      marginBottom:'5%',
      marginLeft: '8%'
  },
  header:{
      flexDirection:'row',
  },
  hambugerMenu:{
      width:23,
      height:23,
      marginTop:'9%',
      marginLeft: '20%'
  },
  orderNote:{
    backgroundColor: COLORS.speciale,
    padding: 12,
    marginTop:'2%',
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.41,
    elevation: 1,
  },
  orderTime:{
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.41,
    elevation: 1,
  },
  orderTimeText:{
      fontSize: 15
  },
  textAreaContainer: {
    borderColor: COLORS.grey20,
    borderWidth: 1,
    padding: 5,
    width:'80%',
    maxWidth:'80%',
    borderRadius:20,
    marginTop:'3%'
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  note:{
    fontSize: 20,
    marginTop:'6%'
  }
});