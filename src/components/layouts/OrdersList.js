import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import config from '../../aws-exports';
import { Categories } from "../categories";
import { icons, SIZES, COLORS, FONTS } from '../contants'

import Amplify, { Predicates } from '@aws-amplify/core';

Amplify.configure(config);

import { DataStore } from '@aws-amplify/datastore'
import { Order } from '../../models'
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import styles from '../layouts/styles/OrdersList.component.style';


class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSearch: false,
      orders: ''
    };
  }

  onSearch() {
    this.setState({
      viewSearch: true
    });
  }



  render() {
    const { navigate } = this.props.navigation;
    const OrderData = [this.props.route.params.order]

    function renderHeader() {
      return (
        <View style={styles.Contanier}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
              <Image source={icons.back} style={styles.hambugerMenu} />
            </TouchableOpacity>
            <Text style={styles.headline}>Min Ordre</Text>
          </View>
        </View>
      )
    }

    function renderOrdersList() {
      const renderItem = ({ item }) => (
        <TouchableOpacity
          style={{ marginBottom: SIZES.padding * 2 }}
          onPress={() => navigate("OrderDelivery", { item })}
        >
          {/* Image */}
          <View style={{ marginBottom: SIZES.padding, width: '80%', alignSelf: 'center' }}>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ ...FONTS.h4 }}>Leverings tid</Text>
              <Text style={{ ...FONTS.h4 }}>Kl.{item.derliveryTime}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}
            >
              <Text style={{ ...FONTS.h4 }}>Total </Text>
              <Text style={{ ...FONTS.h4 }}>{item.total} Kr</Text>
            </View>

            <View style={styles.note}>
              <Text style={styles.kunde}> Din bestilling:</Text>
              <SafeAreaView>
                <ScrollView style={styles.noteScroll}>
                  {Object.entries(JSON.parse(item.foodItems)).map(([key, value]) => {
                    return (
                      <Text key={value.foodId} style={styles.items}>{value.qty} X <Text>#{value.menuNr}</Text><Text>  {value.name}</Text></Text>
                    )
                  })}
                </ScrollView>
              </SafeAreaView>
            </View>

            <Button
              onPress={() => navigate("OrderDelivery", { item })}
              title={'Track Order'}
              containerStyle={{ marginTop: 40 }} />
          </View>
        </TouchableOpacity>
      )

      return (
        <View>
          <View style={{ borderRadius: 20, marginBottom: '3%', width: '90%', marginLeft: '5%' }} />
          <FlatList
            data={OrderData}
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

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          {renderHeader()}
        </View>
        {renderOrdersList()}
      </SafeAreaView>
    )
  }
}


const mapStateToProps = (state) => {
  return { app: state.app }
}
export default connect(mapStateToProps, null)(OrdersList);