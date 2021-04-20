import React, { Component, useEffect, useState } from "react"
import { AsyncStorage, Image, StyleSheet, TextInput, Text, TouchableOpacity, View, Texta } from "react-native"
import { StatusBar } from 'expo-status-bar';
import { Button, Card, CheckBox } from "react-native-elements";
import { DataStore } from "@aws-amplify/datastore";
import Amplify, { Auth } from 'aws-amplify';
import { Order } from '../../models'
import { icons, SIZES } from "../contants";
import StripeCheckout from "./StripeCheckout";
import { connect } from "react-redux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import styles from '../layouts/styles/Order.component.style';

class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'cash',
      total: 0,
      derliveryTime: '',
      isDateTimePickerVisible: false,
      showNote:false,
      onChangeText:'',
      note:'',
    }
  }


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _showNote = () => this.setState({ showNote: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (time) => {
    this.setState({ derliveryTime: Moment(time).format('H:mm') })
    this._hideDateTimePicker();
  };

  placeOrder = async () => {
    const { derliveryTime } = this.state
    if (derliveryTime == '') {
      alert('Du mangler at vælge din leverings tid')
    } else {
      const Basket = await AsyncStorage.getItem('Basket');
      if (Basket !== null) {
        try {
          const basketItems = JSON.parse(Basket);
          console.log(basketItems);
          let total = 0;
          basketItems.forEach((item) => {
            total += (Number.parseFloat(item.itemPrice) * Number.parseFloat(item.qty))
          })
          const customer = this.props.app.user;
          console.log(customer)
          const res = await DataStore.save(
            new Order({
              customerID: customer.id,
              customerName: customer.username,
              email: customer.attributes.email,
              foodItems: Basket,
              total: total,
              derliveryTime: derliveryTime,
              restaurantNote: this.state.onChangeText,
              restaurantID: basketItems[0].restaurantId
            })
          );
          console.log('res ', res);
          await AsyncStorage.removeItem('Basket');
          alert(' Order Placed Successfully')
          this.props.navigation.navigate('OrdersList', { order: res })
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log('tom');
      }
    }
  }

  renderTimePicker = () => {
    return (
      <View >
        <TouchableOpacity style={styles.orderTime} onPress={this._showDateTimePicker}>
          <Text style={styles.orderTimeText}>Vælge din Leverings tid</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          is24Hour="true"
          minuteInterval={10}
          titleIOS="Vælge hvornår du vil have din mad"
          confirmTextIOS="Godkend"
          cancelTextIOS="Anullere"
          mode="time"
        />
      </View>
    )
  }
  renderHeader = () => {
    return (
      <View style={styles.Contanier}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
            <Image source={icons.back} style={styles.hambugerMenu} />
          </TouchableOpacity>
          <Text style={styles.headline}>Betalling</Text>
        </View>
      </View>
    )
  }
  renderNote = () => {
    if (this.state.showNote == false) {
      return (
        <View>
          <TouchableOpacity style={styles.orderNote} onPress={this._showNote}>
            <Text style={styles.orderTimeText}>Tilføj en note</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.textAreaContainer} >
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Skriv noten her"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={text => this.setState({ onChangeText: text})}
          />
        </View>
      )
    }
  }
  render() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    return (
      <View style={{ width: '100%', padding: '1%', alignItems: 'center', backgroundColor: 'white', height: '100%' }}>
        <StatusBar style="dark" />
        { this.renderHeader()}
        { this.renderTimePicker()}
        <Text style={styles.note}>Skriv en note</Text>
        { this.renderNote()}
        <CheckBox
          textStyle={{ width: '90%' }}
          containerStyle={{ marginTop: '5%' }}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          title='Credit Card'
          iconRight
          checked={this.state.paymentType === 'card'}
          onPress={() => this.setState({ paymentType: 'card' })}
        />

        <View style={{
          width: '97%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f3f4ed',
          padding: 5,
          paddingLeft: 20,
          marginTop: -5
        }}>
          <Image
            resizeMode={'contain'}
            style={{ width: 80, height: 80 }}
            source={require('./../../assets/images/credit-card.png')} />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>
            {'Pay online'}
          </Text>
        </View>
        <CheckBox
          textStyle={{ width: '90%' }}
          containerStyle={{ marginTop: '10%' }}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          title='Cash on delivery'
          iconRight
          checked={this.state.paymentType === 'cash'}
          onPress={() => this.setState({ paymentType: 'cash' })}
        />
        <View style={{
          width: '97%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f3f4ed',
          padding: 5,
          paddingLeft: 20,
          marginTop: -5
        }}>
          <Image
            resizeMode={'contain'}
            style={{ width: 80, height: 80 }}
            source={require('./../../assets/images/cash-payment.png')} />
          <Text style={{ fontSize: 18, marginLeft: 20 }}>
            {'Pay with cash'}
          </Text>
        </View>
        <Button
          containerStyle={{ width: '80%', marginTop: '10%' }}
          title={this.state.paymentType === 'cash' ? 'Order Now' : 'Pay Now'}
          type="outline"
          onPress={() => {
            if (this.state.paymentType === 'cash') {
              this.placeOrder()
            } else {
              navigate('StripeCheckout')
            }
          }}
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { app: state.app }
}
styles
export default connect(mapStateToProps, null)(OrderView);