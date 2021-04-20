import React,{Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {

containerView: {
  flex: 1,
  backgroundColor:'#fff',
  height: Platform.OS === 'web'? hp(93): 'auto'
},
loginScreenContainer: {
  flex: 1,
  width: Platform.OS === 'web' ? '100%' : '100%',
  alignItems: 'center'
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
  color:'#f88f01'
},
loginFormView: {
  width: Platform.OS === 'web' ? '80%': wp(100),
  alignItems:'center',
  paddingTop: hp(5),
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,
  width: Platform.OS === 'web' ? '80%': wp(80)

},
loginButton: {
  borderRadius: 5,
  marginTop: hp(5),
  width: Platform.OS === 'web' ? '80%' : wp(80),
  maxWidth: Platform.OS === 'web' ? 400 : 'auto',
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
};
