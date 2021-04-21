import React, {Component} from "react";
import {Alert, AsyncStorage, Modal, Image, StyleSheet, TouchableOpacity, Text, Pressable, View} from "react-native";
import styles from '../layouts/styles/Cart.component.style';

import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';

Amplify.configure(config);
import {DataStore} from '@aws-amplify/datastore'
import {icons, SIZES, COLORS, FONTS, images} from '../contants'

let subscription;


class Undermenu extends Component {
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
    // henter alt data fra kurven
    this.getbasket();

  }

  async getbasket() {
    const Basket = await AsyncStorage.getItem('Basket');
    if (Basket !== null) {
      // We have data!!
      console.log(Basket);
      const newBasket = JSON.parse(Basket);
      this.setState({BasketItems: newBasket})
    } else {
      console.log('tom');
    }
  }

  plusCounter = (key) => {
    const foodSelected = {...this.state.BasketItems[key]}
    const count = foodSelected.qty;
    const newCount = count + 1;
    foodSelected.BasketPrice = foodSelected.price * newCount;
    foodSelected.qty = newCount;
    const items = [...this.state.BasketItems]
    items[key] = foodSelected;
    this.setState({BasketItems: items});
  }

  minusCounter = (key) => {
      const foodSelected = {...this.state.BasketItems[key]}
      const count = foodSelected.qty;
      if(count<=1){
          return ;
      }
      const newCount = count - 1;
      foodSelected.BasketPrice = foodSelected.price * newCount;
      foodSelected.qty = newCount;
      const items = [...this.state.BasketItems]
      items[key] = foodSelected;
      this.setState({BasketItems: items});
  }

  orderNow = () => {


  }

  renderBasket = () => {
    const {BasketItems} = this.state;
    const {plusCounter, minusCounter} = this;

    return (
      <View>
        {BasketItems.map((item,index) => {
          return (
            <View key={item.foodId} style={styles.ItemView}>
              <Text style={styles.ItemText}>{item.name}</Text>
              <Text style={styles.ItemDec}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.itemPrice}.00 kr</Text>
              <Text style={styles.ItemQty}>{item.qty}</Text>
              <View style={styles.viewBtn}>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => plusCounter(index)}>
                  <Image
                    style={styles.plusLogo}
                    source={icons.plus}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.minusBtn} onPress={() => minusCounter(index)}>
                  <Image
                    style={styles.plusLogo}
                    source={icons.minus}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    );
  }

  renderFooter = () => {
    const { restaurant } = this.props.route.params;
    const {navigate} = this.props.navigation;
    const {BasketItems} = this.state;
    let total = 0.00;
    BasketItems.forEach((item) => {
      total += (Number.parseFloat(item.itemPrice) * Number.parseFloat(item.qty))
    })
    return (
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total pris</Text>
        <Text style={styles.totalPrice}>{`${total}.00 kr`}</Text>
        <TouchableOpacity style={styles.orderBtn} onPress={() => navigate('Order',{ restaurant: restaurant })}>
          <Text style={styles.orderBtnText}>Order nu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {renderBasket, renderFooter} = this
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.Contanier}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('UnderMenu')}>
          <Image
            style={styles.backImage}
            source={icons.back}
          />
        </TouchableOpacity>
        <Text style={styles.headline}>Min <Text style={styles.headlineCart}>Kurv</Text></Text>
        {renderBasket()}
        {renderFooter()}
      </View>
    );
  }
}


export default Undermenu;