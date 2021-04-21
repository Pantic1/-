import React, {Component} from "react";
import {Alert, AsyncStorage, Modal, Image, StyleSheet,SafeAreaView,ScrollView, TouchableOpacity, Text, Pressable, View} from "react-native";
import styles from './styles/PastOrder.component.style';
import { connect } from "react-redux";
import { DataStore } from "@aws-amplify/datastore";
import Amplify, { Auth } from 'aws-amplify';
import { Order } from '../../models'
import config from '../../aws-exports';

Amplify.configure(config);
import {icons} from '../contants'

let subscription;


class PastOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodData: '',
      modalVisible: false,
      foodSelected: '',
      count: 1,
      viewSearch: false,
      BasketPrice: 0,
      BasketItems: []
    };
  }

  componentDidMount() {
  }

  orderNow = async() => {
    try {
      const { PastOrder } = this.props.route.params;
      const customer = this.props.app.user;
      console.log(customer)
      const res = await DataStore.save(
        new Order({
          customerID: customer.id,
          customerName: customer.username,
          email: customer.attributes.email,
          foodItems: PastOrder[0].foodItems,
          total: PastOrder[0].total,
          address: PastOrder[0].address + ',' + PastOrder[0].city,
          derliveryTime: PastOrder[0].derliveryTime,
          restaurantNote: PastOrder[0].restaurantNote,
          restaurantName: PastOrder[0].restaurantName,
          restaurantID: PastOrder[0].restaurantId
        })
      );
      console.log('res ', res);
      alert(' Order Placed Successfully')
      this.props.navigation.navigate('OrdersList', { order: res, derliveryTime: PastOrder[0].derliveryTime })
    } catch (e) {
      console.log(e);
    }

  }

 renderHeader = () => {
  const { navigate } = this.props.navigation;
    return (
      <View style={styles.Contanier}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('Orderhistorik')}>
            <Image source={icons.back} style={styles.hambugerMenu} />
          </TouchableOpacity>
          <Text style={styles.headline}>Gammel ordre</Text>
        </View>
      </View>
    )
  }

  renderOrder = () => {
    const { PastOrder } = this.props.route.params;
      return(
        <View style={styles.note}>
        <Text style={styles.kunde}> Din bestilling:</Text>
        <SafeAreaView>
          <ScrollView style={styles.noteScroll}>
            {Object.entries(JSON.parse(PastOrder[0].foodItems)).map(([key, value]) => {
              return (
                <Text key={value.foodId} style={styles.items}>{value.qty} X <Text>#{value.menuNr}</Text><Text>  {value.name}</Text></Text>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
      )
  }

  renderInfo = () => {
    const { PastOrder } = this.props.route.params;
      return(
        <View style={styles.note}>
          <Text style={styles.kunde}>{ PastOrder[0].restaurantName }</Text>
          <Text style={styles.standart}>TID: { PastOrder[0].derliveryTime }</Text>
          <Text style={styles.standart}>TOTAL: { PastOrder[0].total } kr</Text>
          <Text style={styles.addressText}>Adresse:</Text>
          <Text style={styles.address}>{ PastOrder[0].address }</Text>
        </View>
      )
  }
  
  renderOrderBtn = () => {
        return(
            <TouchableOpacity style={styles.orderBtn} onPress={() => this.orderNow()}>
              <Text> Bestil igen </Text>
            </TouchableOpacity>
        )
  }

  render() {

    return (
      <View style={styles.Contanier}>
        { this.renderHeader()}
        { this.renderInfo()}
        { this.renderOrder()}
        { this.renderOrderBtn()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { app: state.app }
}
styles
export default connect(mapStateToProps, null)(PastOrder);