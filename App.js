import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Restaurant from './src/components/layouts/Restaurant';
import RestaurantMenu from './src/components/layouts/Restaurantmenu';
import OrderDelivery from './src/components/layouts/OrderDelivery';
import UnderMenu from './src/components/layouts/UnderMenu';
import Home from './src/components/layouts/Home';
import Cart from './src/components/layouts/Cart';
import Order from './src/components/layouts/Order';
import LoginScreen from './src/components/layouts/login/login';
import EmailLogin from './src/components/layouts/EmailLogin';
import OrdersList from './src/components/layouts/OrdersList';
import LocationSelect from './src/components/layouts/location/LocationSelect';
import StripeCheckout from './src/components/layouts/Checkout';
import {persistor, store} from './src/containers/store';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {SafeAreaProvider} from 'react-native-safe-area-context';

Amplify.configure(awsconfig);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={"LoginScreen"}
            >
              <Stack.Screen name="Restaurant" component={Restaurant}/>
              <Stack.Screen name="RestaurantMenu" component={RestaurantMenu}/>
              <Stack.Screen name="OrderDelivery" component={OrderDelivery}/>
              <Stack.Screen name="UnderMenu" component={UnderMenu}/>
              <Stack.Screen name="Cart" component={Cart}/>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Order" component={Order}/>
              <Stack.Screen name="StripeCheckout" component={StripeCheckout}/>
              <Stack.Screen name="LocationSelect" component={LocationSelect}/>
              <Stack.Screen name="LoginScreen" component={LoginScreen}/>
              <Stack.Screen name="EmailLogin" component={EmailLogin}/>
              <Stack.Screen name="OrdersList" component={OrdersList}/>
            </Stack.Navigator>

          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )

}
export default App