import { StyleSheet } from 'react-native';
import { COLORS } from '../../contants';


export default StyleSheet.create({
   status:{
      fontSize:15,
      color:COLORS.darkgray,
   },
   hr:{
      color:COLORS.darkgray,
      borderBottomWidth:1,
      borderBottomColor: COLORS.darkgray
   },
   wait:{
      fontSize:15,
      color:COLORS.darkgray,
      marginTop:'3%'
   }
});