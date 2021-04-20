import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, Image, Platform, TouchableOpacity, View} from 'react-native';
import {PropTypes} from 'prop-types';
import WebView from "react-native-webview";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {icons, SIZES} from "../contants";


class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      total: 0
    }
  }
  componentDidMount() {
    this.readBasket()
  }

  readBasket = async () => {
    let _total = 0;
    const Basket = await AsyncStorage.getItem('Basket');
    const basketItems = JSON.parse(Basket);
    basketItems.forEach((item) => {
      _total += (Number.parseFloat(item.itemPrice) * Number.parseFloat(item.qty))
    })
    this.setState({total: _total});
  }
  renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50, position: 'absolute', zIndex: 99, top: '5%'}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center'
          }}
          onPress={() => this.props.navigation.navigate('Order')}
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

  render() {
    const {
      publicKey,
      allowRememberMe,
      currency,
      description,
      imageUrl,
      storeName,
      prepopulatedEmail,
      style,
      onPaymentSuccess,
      onClose
    } = this.props;
    const amount = this.state.total * 100;
    const jsCode = `(function() {
                    var originalPostMessage = window.postMessage;

                    var patchedPostMessage = function(message, targetOrigin, transfer) {
                      originalPostMessage(message, targetOrigin, transfer);
                    };

                    patchedPostMessage.toString = function() {
                      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
                    };
                    window.postMessage = patchedPostMessage;
                  })();`;
    return (
      <View style={{paddingTop: 50}}>
        {this.renderHeader()}
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          scrollEnabled={true}
          bounces={false}
          injectedJavaScript={jsCode}
          onLoadStart={(event) => {
            console.log(' start ....', event.nativeEvent.url)
            if(event.nativeEvent.url.includes('http://localhost/success'))
            {
              this.props.onPaymentSuccess()
            }
            this.setState({loading: true})
          }}
          onLoadEnd={() => {
            this.setState({loading: false})
          }}
          source={{
            html: `<script src="https://checkout.stripe.com/checkout.js"></script>
            <script>
            var handler = StripeCheckout.configure({
              key: '${publicKey}',
              image: '${imageUrl}',
              locale: 'auto',
              token: function(token) {
                window.open("http://localhost/success/", "_self")
                window.postMessage(token.id, token.id);
              },
            });

            window.onload = function() {
              handler.open({
                image: '${imageUrl}',
                name: '${storeName}',
                description: '${description}',
                amount: ${amount},
                currency: '${currency}',
                allowRememberMe: ${allowRememberMe},
                email: '${prepopulatedEmail}',
                closed: function() {
                  alert(' closed ')
                  window.postMessage("WINDOW_CLOSED", "*");
                }
              });
            };
            </script><meta name="viewport" content="width=device-width, initial-scale=1"/>`, baseUrl: ''
          }}
          onMessage={event => event.nativeEvent.data === 'WINDOW_CLOSED' ? onClose() : onPaymentSuccess(event.nativeEvent.data)}
          style={{width: wp(100), height: hp(100), backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
          scalesPageToFit={Platform.OS === 'android'}
        />
        {this.state.loading && <View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}><ActivityIndicator size="large"/></View>}
      </View>
    );
  }
}

CheckoutPage.propTypes = {
  publicKey: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  allowRememberMe: PropTypes.bool.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  currency: PropTypes.string,
  prepopulatedEmail: PropTypes.string,
  style: PropTypes.object
};

CheckoutPage.defaultProps = {
  prepopulatedEmail: '',
  currency: 'USD',
};

export default CheckoutPage;