import React, {useEffect, useState} from "react"
import {View, Text, SafeAreaView, StyleSheet, AsyncStorage, ActivityIndicator} from "react-native"
import {StatusBar} from 'expo-status-bar';
import StripeCheckout from "./StripeCheckout";
import {Auth} from "aws-amplify";
import {DataStore} from "@aws-amplify/datastore";
import {Order} from "../../models";
import {useSelector} from "react-redux";


const styles = StyleSheet.create({})
const OrderCheckout = (props) => {
  const {navigate} = props.navigation;
  const {authenticated, user, errorMessage} = useSelector(state => state.app)
  const placeOrder = async () => {
    const Basket = await AsyncStorage.getItem('Basket');
    if (Basket !== null) {
      try {
        const basketItems = JSON.parse(Basket);
        let total = 0;
        basketItems.forEach((item) => {
          total += (Number.parseFloat(item.itemPrice) * Number.parseFloat(item.qty))
        })
        const customer = user;
        const res = await DataStore.save(
          new Order({
            customerID: customer.id,
            customerName: customer.username,
            foodItems: Basket,
            total: total,
            derliveryTime: '30',
            restaurantID: basketItems[0].restaurantId
          })
        );
        console.log('res ', res);
        await AsyncStorage.removeItem('Basket');
        alert(' Order Placed Successfully')
        navigate('OrdersList', {order: res})
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('tom');
    }
  }
  return (
    <View style={{width: '100%', alignItems: 'center', height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
      <StatusBar style="dark"/>
      <StripeCheckout
        publicKey="pk_test_51EidCJIDVqkyxy7bMJ2QRq8I82c5yoEOLJJBDATAKTWUBV0cA5DSkGiaFMRTjMqfYiSFMzyLXBnPa5H56QZcghbN00NBOIdLrv"
        storeName="Food By Home"
        imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
        description=""
        currency="DKK"
        allowRememberMe={false}
        onClose={() => {
          console.log('close ')
          props.navigation.goBack();
        }}
        onPaymentSuccess={(data) => {
          console.log('onPaymentSuccess ')
          placeOrder()
        }}
        style={{width: '100%', height: '100%'}}
        navigation={props.navigation}
      />
    </View>
  )

}
export default OrderCheckout;