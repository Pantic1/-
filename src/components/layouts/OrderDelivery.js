import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../contants"
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import OpenMap from "react-native-open-map";
import Geocoder from 'react-native-geocoding';
import config from '../../aws-exports';
import Amplify, { DataStore } from "aws-amplify";
import { Order, Restaurant } from '../../models'

Amplify.configure(config);
Geocoder.init(GOOGLE_API_KEY); // use a valid API key

const OrderDelivery = ({ route, navigation }) => {

  const mapView = React.useRef()

  const [restaurant, setRestaurant] = React.useState(null)
  const [streetName, setStreetName] = React.useState("")
  const [fromLocation, setFromLocation] = React.useState(null)
  const [toLocation, setToLocation] = React.useState(null)
  const [region, setRegion] = React.useState(null)

  const [duration, setDuration] = React.useState(0)
  const [isReady, setIsReady] = React.useState(false)
  const [angle, setAngle] = React.useState(0)
  const [acceptBtn, setAcceptBtn] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState(false)

  React.useEffect(() => {
    fecthOrder()
  }, [])

  async function fecthOrder() {
    let { item } = route.params;
    const restaurants = await DataStore.query(Restaurant, c => c.id("eq", item.restaurantID));
    setPhoneNumber(restaurants[0].phone)
    // henter adressen her fra og laver den om til cordinater
    Geocoder.from(JSON.stringify(restaurants[0].address))
      .then(json => {
        var Restaurantlnglat = json.results[0].geometry.location;

        // henter adressen her fra og laver den om til cordinater
        Geocoder.from(item.address)
          .then(json => {
            var Customerlnglat = json.results[0].geometry.location;
            // sender dem til mappen 
            runMap(Customerlnglat, Restaurantlnglat)
          })
          .catch(error => console.warn(error));
      })
      .catch(error => console.warn(error));

  }

  function runMap(Customerlnglat, Restaurantlnglat) {
    let { item } = route.params;
    const newAddress = item.address.split(',')[0];

    const initialCurrentLocation = {
      streetName: newAddress,
      gps: {
        latitude: Customerlnglat.lat,
        longitude: Customerlnglat.lng
      },
      restaurant: {
        latitude: Restaurantlnglat.lat,
        longitude: Restaurantlnglat.lng
      }
    }


    let fromLoc = initialCurrentLocation.gps
    let toLoc = initialCurrentLocation.restaurant
    let street = initialCurrentLocation.streetName

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
    }

    setRestaurant(restaurant)
    setStreetName(street)
    setFromLocation(fromLoc)
    setToLocation(toLoc)
    setRegion(mapRegion)
  }

  async function Call() {
     Linking.openURL(`tel:`+ phoneNumber)
  }

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
  }

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2
    }

    setRegion(newRegion)
    mapView.current.animateToRegion(newRegion, 200)
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2
    }

    setRegion(newRegion)
    mapView.current.animateToRegion(newRegion, 200)
  }

  function renderMap() {
    if (!toLocation == '') {
      const destinationMarker = () => (
        <Marker
          coordinate={toLocation}
        >
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary
              }}
            >
              <Image
                source={icons.pin}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white
                }}
              />
            </View>
          </View>
        </Marker>
      )

      const carIcon = () => (
        <Marker
          coordinate={fromLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          flat={true}
          rotation={angle}
        >
          <Image
            source={icons.car}
            style={{
              width: 40,
              height: 40
            }}
          />
        </Marker>
      )

      return (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapView}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            style={{ flex: 1 }}
          >
            <MapViewDirections
              origin={fromLocation}
              destination={toLocation}
              apikey={GOOGLE_API_KEY}
              strokeWidth={5}
              strokeColor={COLORS.primary}
              optimizeWaypoints={true}
              onReady={result => {
                setDuration(result.duration)

                if (!isReady) {
                  // Fit route into maps
                  mapView.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (SIZES.width / 20),
                      bottom: (SIZES.height / 4),
                      left: (SIZES.width / 20),
                      top: (SIZES.height / 8)
                    }
                  })

                  // Reposition the car
                  let nextLoc = {
                    latitude: result.coordinates[0]["latitude"],
                    longitude: result.coordinates[0]["longitude"]
                  }

                  if (result.coordinates.length >= 2) {
                    let angle = calculateAngle(result.coordinates)
                    setAngle(angle)
                  }

                  setFromLocation(nextLoc)
                  setIsReady(true)
                }
              }}
            />
            {destinationMarker()}
            {carIcon()}
          </MapView>
        </View>
      )
    }
  }

  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('OrdersList')}>
            <Image
              source={icons.back}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
          <Image
            source={icons.red_pin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding
            }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
          </View>

          <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    )
  }

  function renderDeliveryInfo() {
    let { derliveryTime } = route.params;
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Avatar */}
            <View style={{ flex: 1, marginLeft: SIZES.padding }}>
              {/* Name & Rating */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h3 }}>{streetName}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...FONTS.h3, marginRight: '7%' }}>{derliveryTime}</Text>
                </View>
              </View>

              {/* Restaurant */}
              <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between'
            }}
          >
            {/* Her henter vi accept knappen */}
            {renderCallBtn()}

            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
              onPress={() => OpenMap.show({
                latitude: toLocation.latitude,
                longitude: toLocation.longitude,
              })}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Åben i maps</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }

  function renderCallBtn() {
    if (acceptBtn == false) {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            height: 50,
            marginRight: 10,
            backgroundColor: COLORS.logoGreen,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
          }}
          onPress={() => Call()}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>Ring</Text>
        </TouchableOpacity>
      )
    }
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between'
        }}
      >
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => zoomIn()}
        >
          <Text style={{ ...FONTS.body1 }}>+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => zoomOut()}
        >
          <Text style={{ ...FONTS.body1 }}>-</Text>
        </TouchableOpacity>
      </View>

    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderButtons()}
    </View>
  )
}

export default OrderDelivery;