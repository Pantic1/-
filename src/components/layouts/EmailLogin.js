import React, {useEffect} from "react";
import {KeyboardAvoidingView} from 'react-native';
import {withAuthenticator, withOAuth} from "aws-amplify-react-native";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../containers/actions/app";
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

function LoginScreen(props) {
  const dispatch = useDispatch();
  const {authenticated} = useSelector(state => state.app)
  if (authenticated) {
    //props.navigation.replace('Home')
  }
  const checkAuth = async ()=>{
    const user = await Auth.currentUserInfo();
    if(user){
      dispatch(userLogin(user))
    }
  }
  useEffect(()=>{
    checkAuth()
  },[])
  return (
    <KeyboardAvoidingView behavior="padding">
    </KeyboardAvoidingView>
  );
}

export default withAuthenticator(LoginScreen);
