import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import config from '../../aws-exports';
import { Categories } from "../categories";
import { icons, SIZES, COLORS, FONTS } from '../contants'
import styles from './styles/Restaurant.component.style';
import TabsStyles from '../layouts/styles/Tabs.component.style';

import Amplify, { Predicates } from '@aws-amplify/core';
Amplify.configure(config);

import { DataStore } from '@aws-amplify/datastore'
import { Food, Restaurant } from '../../models'
let subscription;

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSearch:false,
      Categories: '',
      selectedCategory: '',
      Restaurantsdata: '',
      currentLocation: '',
      origData:''
    };
  }

  componentDidMount() {
    this.onQuery();
    subscription = DataStore.observe(Food).subscribe((msg) => {
      console.log("SUBSCRIPTION_UPDATE", msg);
      this.onQuery();
    });
  }

  componentWillUnmount() {
    subscription.unsubscribe();
  }
   onSearch(){
    this.setState({
      viewSearch: true
    });
  }
  onQuery = async () => {
    const { zipCode } = this.props.route.params;

    const Restaurantsdata = await DataStore.query(Restaurant, (s) => s.zipCode('eq', zipCode));
    this.setState({ Restaurantsdata, origData: Restaurantsdata });
    console.log("QUERY_COMMENTS_RESULT", Restaurantsdata);
  };

  onSelectCategory = (category) => {
    const { origData } = this.state

    //filter restaurant
   let restaurantList = origData.filter(a => a.categories.includes(category.id))

    console.log(' Restaurantsdata ', origData)

    this.setState({
      selectedCategory: category,
      Restaurantsdata: restaurantList
    })
  }

  render() {
    const { onSelectCategory,onSearch } = this;
    const { navigate } = this.props.navigation;
    const { Restaurantsdata, selectedCategory,viewSearch } = this.state

    function getCategoryNameById(id) {
      let category = Categories.filter(a => a.id == id)

      if (category.length > 0)
        return category[0].title

      return ""
    }


    function renderHeader() {
      return (
        <View style={{ flexDirection: 'row', height: 50, position: 'absolute', zIndex: 99, paddingTop: '13%' }}>
          <TouchableOpacity
            style={{
              width: 50,
              paddingLeft: SIZES.padding * 2,
              justifyContent: 'center'
            }}
            onPress={() => navigate("Home")}
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
          onPress={() => onSearch()}
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

    function renderMainCategories() {
      const renderItem = ({ item }) => {

        return (
          <TouchableOpacity
            style={{
              padding: SIZES.padding,
              paddingBottom: SIZES.padding * 2,
              marginTop: '80%',
              backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              marginRight: SIZES.padding,
              ...styles.shadow
            }}
            
            onPress={() => onSelectCategory(item)}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
              }}
            >
              <Image
                source={item.imageUrl}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30
                }}
              />
            </View>

            <Text
              style={{
                marginTop: SIZES.padding,
                color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                ...FONTS.body5
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )
      }

      return (
        <View >
          <FlatList
            data={Categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
          />
        </View>
      )
    }

    function renderRestaurantList() {
      const renderItem = ({ item }) => (
        <TouchableOpacity
          style={{ marginBottom: SIZES.padding * 2 }}
          onPress={() => navigate("RestaurantMenu", {
            item
          })}
        >
          {/* Image */}
          <View style={{ marginBottom: SIZES.padding }}>

            <Image
              source={require('../../assets/images/burger-restaurant.jpg')}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: 15
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow
              }}
            >
              <Text style={{ ...FONTS.h4 }}>{item.duration} min</Text>
            </View>
          </View>

          {/* Restaurant Info */}
          <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

          <View style={{ marginTop: SIZES.padding, flexDirection: 'row' }} >
            {/* Rating */}
            <Image
              source={icons.star}
              style={{
                height: 20, width: 20, tintColor: COLORS.primary, marginRight: 10
              }}
            />
            <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
            {/* Categories */}
            <View style={{ flexDirection: 'row', marginLeft: 10 }} >
              {
                item.categories && JSON.parse(item.categories).map((categoryId) => {
                  return (
                    <View style={{ flexDirection: 'row' }}
                      key={categoryId}
                    >
                      <Text  key={categoryId + 3} style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                      <Text key={categoryId + 4} style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                    </View>
                  )
                })
              }

              {/* Price */}
              {
                [1, 2, 3].map((priceRating) => (
                  <Text
                    key={priceRating}
                    style={{
                      ...FONTS.body3,
                      color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                    }}
                  >$</Text>
                ))
              }
            </View>

          </View>
        </TouchableOpacity>
      )

      return (
        <View>
          <View style={{ borderRadius: 20, marginBottom: '3%', width: '90%', marginLeft: '5%' }} />
          <FlatList
            data={Restaurantsdata}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding * 2,
              paddingBottom: 30
            }}
          />
        </View>
      )
    }
    function MyTabs() {
      return (
        <View style={TabsStyles.main}>
          <TouchableOpacity onPress={() => navigate('Restaurant')}>
            <Image style={TabsStyles.homeBtn} source={icons.home} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Orderhistorik')}>
            <Image style={styles.personTabs} source={icons.shoppingbag} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          {renderHeader()}
          {renderMainCategories()}
        </View>
        {renderRestaurantList()}
        {MyTabs()}
      </SafeAreaView>
      
    )
  }
}


export default Restaurants