import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  View,
  ScrollView
} from "react-native";
import styles from '../layouts/styles/UnderMenu.component.style';
import TabsStyles from '../layouts/styles/Tabs.component.style';

import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';

Amplify.configure(config);
import { DataStore } from '@aws-amplify/datastore'
import { Food } from '../../models'
import { icons, SIZES, COLORS, FONTS, images } from '../contants'
import { CheckBox } from "react-native-elements";

let subscription;


class Undermenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodData: '',
      modalVisible: false,
      foodSelected: '',
      count: 0,
      viewSearch: false,
      BasketPrice: 0,
      BasketItems: [],
      ingredientsSelected: {}
    };
  }

  componentDidMount() {
    const { Menu } = this.props.route.params;
    this.onQuery(Menu);
    subscription = DataStore.observe(Food).subscribe((msg) => {
      console.log("SUBSCRIPTION_UPDATE", msg);
      this.onQuery(Menu);
    });

  }

  componentWillUnmount() {
    subscription.unsubscribe();
  }

  onQuery = async (resData) => {
    const FoodData = await DataStore.query(Food, (s) => s.categorie('eq', resData));
    this.setState({ FoodData });
    // console.log("QUERY_COMMENTS_RESULT", FoodData);
  };

  setModalVisible = (visible, food) => {
    this.setState({
      modalVisible: visible,
      foodSelected: food,
      BasketPrice: food.price,
      ingredientsSelected: {}
    });
  }

  plusCounter = () => {
    const { count, foodSelected } = this.state;
    const newCount = count + 1;
    const newPrice = foodSelected.price * newCount;
    this.setState({ count: newCount, BasketPrice: newPrice });
  }

  minusCounter = () => {
    const { count, foodSelected, BasketPrice } = this.state;
    if (count > 1) {
      const newCount = count - 1;
      const newPrice = BasketPrice - foodSelected.price;

      this.setState({ count: newCount, BasketPrice: newPrice });
    }
  }

  addToBasket = async () => {
    const { FoodData, modalVisible, foodSelected, BasketPrice, count, BasketItems, ingredientsSelected } = this.state;
    let index = BasketItems.findIndex(o => o.foodId === foodSelected.id);

    // hvis maden er i kurven så bliver den fjernet og bliver tilføjet længere nede
    if (index != -1) {
      BasketItems.splice(index, 1);
    }
    const ingredients = [];
    Object.keys(ingredientsSelected).forEach((key) => {
      if (ingredientsSelected[key]) {
        ingredients.push(key)
      }
    })

    BasketItems.push({
      BasketPrice: BasketPrice,
      itemPrice: foodSelected.price,
      foodId: foodSelected.id,
      name: foodSelected.name,
      qty: count,
      restaurantId: foodSelected.restaurantId,
      ingredients
    })

    AsyncStorage.setItem(
      'Basket',
      JSON.stringify(BasketItems)
    );

    console.log(BasketItems);

    this.setModalVisible(!modalVisible, '');
  }

  onSearch() {
    this.setState({
      viewSearch: true
    });
  }


  render() {
    const { FoodData, modalVisible, foodSelected, BasketPrice, count } = this.state;
    const { setModalVisible, plusCounter, minusCounter, addToBasket } = this;
    const { navigate } = this.props.navigation;

    function renderMenu() {
      if (FoodData != '') {
        return (
          <View style={{ marginTop: '35%' }}>
            {FoodData.map((foods) =>
              <TouchableOpacity key={foods.id} style={styles.menuKort}
                onPress={() => setModalVisible(true, foods)}>
                <Text style={styles.foodName}>{foods.name}</Text>
                <Text style={styles.foodPrice}>{foods.price}.00 kr</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      }
    }

    function MyTabs() {
      return (
        <View style={TabsStyles.main}>
          <TouchableOpacity onPress={() => navigate('Restaurant')}>
            <Image style={TabsStyles.homeBtn} source={icons.home} />
          </TouchableOpacity>
          {count > 0 && <TouchableOpacity onPress={() => navigate('Cart')} style={styles.basketTabs}>
            <View style={TabsStyles.badge}>
              <Text>{count}</Text>
            </View>
            <Image style={TabsStyles.basketIcon} source={icons.basket} />
          </TouchableOpacity>}
          <TouchableOpacity>
            <Image style={styles.personTabs} source={icons.person} />
          </TouchableOpacity>
        </View>
      );
    }


    function renderHeader() {
      return (
        <View style={{ flexDirection: 'row', height: 50, position: 'absolute', zIndex: 99, paddingTop: '16%' }}>
          <TouchableOpacity
            style={{
              width: 50,
              paddingLeft: SIZES.padding * 2,
              justifyContent: 'center'
            }}
            onPress={() => navigate("RestaurantMenu")}
          >
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25
              }}
            />

          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50, paddingLeft: '78%', justifyContent: 'center' }}
            onPress={() => this.onSearch()}
          >
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      )
    }
   function renderFilterScreen() {
      return(
         <View>
            <TouchableOpacity>
                 <Text>Inside Filter screen</Text>
            </TouchableOpacity>
          </View>
      )
      }
   // [{ "title": "Chil","title": "ost" }]
    const renderModal = () => {
      const ingredients = foodSelected.ingredients ? JSON.parse(foodSelected.ingredients) : [];
      const { ingredientsSelected } = this.state;
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible, '');
          }}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeaderLine}>{foodSelected.name}</Text>
              <Text style={styles.modalPrice}>{foodSelected.price}.00 kr</Text>
              <Text style={styles.modalDescription}>{foodSelected.description}</Text>
              <ScrollView contentContainerStyle={{ width: '100%' }}>
                {
                  ingredients.map((ingredient) => (
                    <CheckBox
                      key={ingredient.title}
                      style={{ height: 30 }}
                      textStyle={{ width: '70%' }}
                      title={ingredient.title}
                      checked={ingredientsSelected[ingredient.title]}
                      onPress={() => {
                        const _ingredientsSelected = { ...ingredientsSelected };
                        _ingredientsSelected[ingredient.title] = _ingredientsSelected[ingredient.title] !== true
                        this.setState({ ingredientsSelected: _ingredientsSelected })
                      }}
                    />
                  ))
                }
              </ScrollView>

              <View style={styles.btnView}>
                <TouchableOpacity style={styles.minusBtn} onPress={() => minusCounter()}>
                  <Image
                    style={styles.minusLogo}
                    source={icons.minus}
                  />
                </TouchableOpacity>

                <Text style={styles.count}>{count}</Text>

                <TouchableOpacity style={styles.plusBtn} onPress={() => plusCounter()}>
                  <Image
                    style={styles.plusLogo}
                    source={icons.plus}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.BasketBtn} onPress={() => addToBasket()}>
                <View style={styles.BasketBtnView}>
                  <Text style={styles.BasketBtnText}>Læg i Kurven</Text>
                  <Text style={styles.BasketBtnPrice}>{BasketPrice}.00 kr</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }

    return (
      <View style={styles.Contanier}>
        {MyTabs()}
        {renderHeader()}
        {renderModal()}
        {renderMenu()}
      </View>
    );
  }
}


export default Undermenu;