import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../../screen/onboarding/Splash';

import Login from '../../screen/user/Login';
import Register from '../../screen/user/Register';
import Home from '../../screen/activity/Home';
import Welcome from '../../screen/user/Welcome';
import ForgetPassword from '../../screen/user/ForgetPassword';
import ChangePassword from '../../screen/user/ChangePassword';
import Cart from '../../screen/activity/Cart';
import Order from '../../screen/activity/Order';
import ConfirmOrder from '../../screen/activity/ConfirmOrder';
import BankDetails from '../../screen/activity/BankDetails';
import Confirmation from '../../screen/activity/Confirmation';

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, //tomato
              //headerLeft: null,
              headerShown: false,
             }}
             initialRouteName="cart"
             >

            <Stack.Screen name="splash" component={Splash}   />
            <Stack.Screen name="login" component={Login}   />
            <Stack.Screen name="reg" component={Register}   />
            <Stack.Screen name="home" component={Home}   />
            <Stack.Screen name="welcome" component={Welcome}   />
            <Stack.Screen name="forgetpass" component={ForgetPassword}   />
            <Stack.Screen name="changepass" component={ChangePassword}   />
            <Stack.Screen name="cart" component={Cart}   />
            <Stack.Screen name="order" component={Order}   />
            <Stack.Screen name="confirm_order" component={ConfirmOrder}   />
            <Stack.Screen name="confirm" component={Confirmation}   />
            <Stack.Screen name="bank_details" component={BankDetails}   />
          </Stack.Navigator>
         </NavigationContainer>
      );
  }

}

export default AppStack;