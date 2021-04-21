import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import LocationView from "./LocationView";

export default function App(props) {

  /*const [region, setRegion] = useState({
    latitude: 31.4627166,
    longitude: 74.2882092,
    latitudeDelta: 0.555,
    longitudeDelta: 0.5121
  });
  const [location, setLocation] = useState(false);*/


  /*  const setMapRegion = (newRegion, animate = true) => {
      if (animate) this._map.animateToRegion(region);
      setRegion({
        ...region,
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      })
    };

    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(position => {
        setMapRegion(position.coords);
        if (this.state.location === false) {
          setLocation(true);
        }
      }, () => {

      }, {enableHighAccuracy: false});
    };*/

  return (

    <ImageBackground
      style={{
        width: '100%',
        height: hp('100%'),
        alignItems: 'center',
      }}>
      <View style={{width: '100%', backgroundColor: '#F7F7F7', paddingBottom: hp('1%')}}>
        {/*<Titlebar
          action={'Save'}
          navigation={props.navigation}
          title={'Choose location'}
          statusBarColor={'#F7F7F7'}
          onAction={() => {
            props.navigation.pop()
          }}
        />*/}
      </View>
      <View style={{width: '100%', height: hp('89%'), marginTop: hp('0%')}}>
        <LocationView
          apiKey={"AIzaSyAKDROA41TDDsuhJLUGUBKJ3zFLaufkf2w"}
          initialLocation={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onLocationSelect={(location) => {
            console.log('location ... ', location)
            props.navigation.state.params.onComplete(location);
          }}
        />
      </View>
      {/*<View style={styles.addressBox}>
        <LocationIcon width={18} height={21} style={{marginLeft: 19}}/>
        <Text style={styles.address}>
          {'Where are you?'}
        </Text>
        <NextIcon width={8} height={13} style={{}}/>
      </View>*/}
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    opacity: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  inputContainerStyle: {marginTop: -10},
  imageContainer: {
    height: 116,
    width: 116,
    borderRadius: 58,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  address: {
    width: wp('65%'),
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#303349",
    alignSelf: 'center',
    marginLeft: 13
  }

});
