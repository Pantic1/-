import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  ViewPropTypes
} from 'react-native';
import Events from 'react-native-simple-events';
import MapView, {Marker} from 'react-native-maps';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const DEFAULT_DELTA = {latitudeDelta: 0.015, longitudeDelta: 0.0121};

export default class LocationView extends React.Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    initialLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    markerColor: PropTypes.string,
    actionButtonStyle: ViewPropTypes.style,
    actionTextStyle: Text.propTypes.style,
    actionText: PropTypes.string,
    onLocationSelect: PropTypes.func,
    debounceDuration: PropTypes.number,
    components: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    markerColor: 'black',
    actionText: 'DONE',
    onLocationSelect: () => ({}),
    debounceDuration: 300,
    components: [],
  };

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    Events.listen('InputBlur', this.constructor.displayName, this._onTextBlur);
    Events.listen('InputFocus', this.constructor.displayName, this._onTextFocus);
    Events.listen('PlaceSelected', this.constructor.displayName, this._onPlaceSelected);
    this._getCurrentLocation();
  }

  componentWillUnmount() {
    Events.rm('InputBlur', this.constructor.displayName);
    Events.rm('InputFocus', this.constructor.displayName);
    Events.rm('PlaceSelected', this.constructor.displayName);
  }

  state = {
    inputScale: new Animated.Value(1),
    inFocus: false,
    region: {
      ...DEFAULT_DELTA,
      ...this.props.initialLocation,
    },
  };

  _animateInput = () => {
    Animated.timing(this.state.inputScale, {
      toValue: this.state.inFocus ? 1.2 : 1,
      duration: 300,
    }).start();
  };

  _onMapRegionChange = region => {
    this._setRegion(region, false);
    if (this.state.inFocus) {
      this._input.blur();
    }
    this.props.onLocationSelect({...region})
  };

  _onMapRegionChangeComplete = region => {
    //this._input.fetchAddressForLocation(region);
  };

  _onTextFocus = () => {
    this.state.inFocus = true;
    this._animateInput();
  };

  _onTextBlur = () => {
    this.state.inFocus = false;
    this._animateInput();
  };

  _setRegion = (region, animate = true) => {
    this.state.region = {...this.state.region, ...region};
    if (animate) this._map.animateToRegion(this.state.region);
  };

  _onPlaceSelected = placeId => {
    this._input.blur();
    /*axios.get(`${PLACE_DETAIL_URL}?key=${this.props.apiKey}&placeid=${placeId}`).then(({data}) => {
      let region = (({lat, lng}) => ({latitude: lat, longitude: lng}))(data.result.geometry.location);
      this._setRegion(region);
    });*/
  };

  _getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let location = (({latitude, longitude}) => ({latitude, longitude}))(position.coords);
      console.log('_getCurrentLocation ', location);
      this._setRegion(position.coords);
    }, error => {
      //alert(error)
    });
  };


  render() {
    let {inputScale} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          showsMyLocationButton={true}
          showsUserLocation={true}
          loadingEnabled
          userLocationAnnotationTitle={'Your Location'}
          ref={mapView => (this._map = mapView)}
          style={styles.mapView}
          region={this.state.region}
          onPress={({nativeEvent}) => this._setRegion(nativeEvent.coordinate)}
          onRegionChange={this._onMapRegionChange}
          onRegionChangeComplete={this._onMapRegionChangeComplete}
          onUserLocationChange={(e) => {
            console.log('location ', e)
          }}
        />
        <View style={{position: 'absolute', paddingBottom: hp('7%')}}>
          <Image
            resizeMode={'contain'}
            source={require('./../../../assets/images/location_pick_icon.png')}
            style={{width: 30, height: 35}}/>
        </View>
        <TouchableOpacity
          onPress={() => {
            this._getCurrentLocation()
          }}
          style={{position: 'absolute', bottom: '3%', right: '3%'}}>
          <Image
            resizeMode={'contain'}
            source={require('./../../../assets/images/location_icon.png')}
            style={{width: 50, height: 50}}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: '80%',
    padding: 5,
  },
  currentLocBtn: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 70,
    right: 10,
  },
  actionButton: {
    backgroundColor: '#218bbc',
    height: 50,
    position: 'absolute',
    bottom: 40,
    left: 100,
    right: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 23,
  },
});
