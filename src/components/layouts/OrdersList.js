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
import {TextInput} from "react-native-gesture-handler";
import config from '../../aws-exports';
import {Categories} from "../categories";
import {icons, SIZES, COLORS, FONTS} from '../contants'

import Amplify, {Predicates} from '@aws-amplify/core';

Amplify.configure(config);

import {DataStore} from '@aws-amplify/datastore'
import {Order} from '../../models'
import {connect} from "react-redux";
import {Button} from "react-native-elements";

let subscription;

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: '10%',
    marginTop: '0%',
    backgroundColor: 'white',
    shadowColor: COLORS.darkgray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.41,
    elevation: 1,
  },
  viewRestaurants: {
    width: '82%',
    height: 220,
    backgroundColor: 'white',
    marginTop: '9%',
    marginLeft: '9%',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSearch: false,
      orders: ''
    };
  }

  componentDidMount() {
    this.onQuery();
  }

  componentWillUnmount() {
  }

  onSearch() {
    this.setState({
      viewSearch: true
    });
  }

  onQuery = async () => {
    /*const OrderData = await DataStore.query(Order);
    this.setState({OrderData, origData: OrderData});
    console.log("QUERY_COMMENTS_RESULT", OrderData);*/
  };


  render() {
    const {onSearch} = this;
    const {navigate} = this.props.navigation;
    const OrderData = [this.props.route.params.order]

    function renderHeader() {
      return (
        <View style={{flexDirection: 'row', height: 50, position: 'absolute', zIndex: 99, paddingTop: '5%'}}>
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
        </View>
      )
    }

    function renderOrdersList() {
      const renderItem = ({item}) => (
        <TouchableOpacity
          style={{marginBottom: SIZES.padding * 2}}
          onPress={() => navigate("OrderDelivery", {item})}
        >
          {/* Image */}
          <View style={{marginBottom: SIZES.padding, width: '80%', alignSelf: 'center'}}>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text style={{...FONTS.h4}}>Delivery time </Text>
              <Text style={{...FONTS.h4}}>{item.duration} min</Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}
            >
              <Text style={{...FONTS.h4}}>Total </Text>
              <Text style={{...FONTS.h4}}>{item.total} </Text>
            </View>
            <Button
              onPress={() => navigate("OrderDelivery", {item})}
              title={'Track Order'}
              containerStyle={{marginTop: 40}}/>
          </View>

        </TouchableOpacity>
      )

      return (
        <View>
          <View style={{borderRadius: 20, marginBottom: '3%', width: '90%', marginLeft: '5%'}}/>
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
  return {app: state.app}
}
export default connect(mapStateToProps, null)(OrdersList);