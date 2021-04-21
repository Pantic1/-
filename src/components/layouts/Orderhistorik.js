import React, { Component, useEffect, useState } from "react"
import { AsyncStorage, Image, StyleSheet, TextInput, Text, TouchableOpacity, View, Texta } from "react-native"
import { StatusBar } from 'expo-status-bar';
import { Button, Card, CheckBox } from "react-native-elements";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import Amplify, { Auth } from 'aws-amplify';
import { Order } from '../../models'
import { icons, SIZES } from "../contants";
import StripeCheckout from "./StripeCheckout";
import { connect } from "react-redux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import styles from './styles/Orderhistorik.component.style';

let subscription = '';

class Orderhistorik extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 'cash',
      total: 0,
      derliveryTime: '',
      isDateTimePickerVisible: false,
      showNote: false,
      OrderData: '',
      note: '',
    }
  }
  componentDidMount() {
    this.onQuery();
    subscription = DataStore.observe(Order).subscribe((msg) => {
      console.log("SUBSCRIPTION_UPDATE", msg);
      this.onQuery();
    });
  }

  componentWillUnmount() {
    subscription.unsubscribe();
  }

  onQuery = async () => {
    const customer = this.props.app.user;
    const Restaurantsdata = await DataStore.query(Order, Predicates.ALL, {
      sort: s => s.updatedAt().customerID('eq', customer.id),
      page: 0,
      limit: 10
    });
    this.setState({ OrderData: Restaurantsdata });
    //console.log("QUERY_COMMENTS_RESULT", Restaurantsdata);
  };

  renderHistorik = () => {
    const { OrderData } = this.state
    const { navigate } = this.props.navigation;
    console.log("QUERY_COMMENTS_RESULT", OrderData);
    return (
      <View>
        {Object.entries(OrderData).map(([key, v]) => {
          return (
            <TouchableOpacity key={key} style={styles.content} onPress={() => navigate('PastOrder',{
              PastOrder: OrderData
            })}>
              <Text style={styles.contentNavn}>{v.restaurantName}</Text>
              <Text style={styles.contentText}>{Moment(v.createdAt).format('dddd')}, {v.derliveryTime}</Text>
              <Text style={styles.contentPrice}>{v.total} kr</Text>
              <Text style={styles.contentOrder}>Se ordren</Text>
            </TouchableOpacity>)
        })}
      </View>

    );
  }

  renderHeader = () => {
    return (
      <View style={styles.Contanier}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Restaurant')}>
            <Image source={icons.back} style={styles.hambugerMenu} />
          </TouchableOpacity>
          <Text style={styles.headline}>Order historik</Text>
        </View>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        { this.renderHeader()}
        { this.renderHistorik()}

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { app: state.app }
}
styles
export default connect(mapStateToProps, null)(Orderhistorik);
