import React from "react";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from "./style";
import {Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View} from 'react-native';
import {Button, SocialIcon} from 'react-native-elements';
import {withOAuth} from "aws-amplify-react-native";
import * as Facebook from "expo-facebook";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../../containers/actions/app";

function LoginScreen(props) {
  const isWeb = typeof document != 'undefined';
  const dispatch = useDispatch();
  const {authenticated, user, errorMessage} = useSelector(state => state.app)
  if (authenticated) {
    props.navigation.replace('Home')
  }
  const {oAuthUser} = props;
  console.log(oAuthUser)
  if (oAuthUser) {
   props.navigation.replace('Home')
  }
  const logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '2971784739816123',
      });
      const {type, token} = await Facebook.logInWithReadPermissionsAsync({permissions: ['public_profile', 'email']});
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const user = await response.json()
        dispatch(userLogin({
          id: user.id,
          username: user.name.replace(' ', '_'),
          attributes: {
            email: user.email
          }
        }))
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={() => {
        if (isWeb) Keyboard.dismiss
      }}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Image
              resizeMode={'contain'}
              style={{width: 200, height: 200, marginTop: '10%', marginBottom: '10%'}}
              source={require('./../../../assets/images/foodbyhome.png')}/>
            <SocialIcon
              style={{width: '80%'}}
              title='Sign In With Facebook'
              button
              type='facebook'
              onPress={() => {
                logIn()
              }}
            />
            <SocialIcon
              style={{width: '80%'}}
              button
              title='Sign In With Email'
              type={'google'}
              onPress={() => {
                props.navigation.replace('EmailLogin')
              }}
            />
            <Button
              type={'clear'}
              containerStyle={styles.loginButton}
              title="Do not have account?"
            />
            <Button
              onPress={() => props.navigation.replace('EmailLogin')}
              raised
              titleStyle={{color: '#222831'}}
              containerStyle={[styles.loginButton, {marginTop: hp(2)}]}
              buttonStyle={{backgroundColor: '#ffd56b'}}
              title="Login"/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
