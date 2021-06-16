import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Orders from '../../screen/shopper/Orders';
import EditOrders from '../../screen/shopper/EditOrder';
import Index from '../../screen/shopper/index';

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, //tomato
              //headerLeft: null,
              headerShown: false,
             }}
             initialRouteName="index"
             >
                 <Stack.Screen name="index" component={Index}   />
            <Stack.Screen name="orders" component={Orders}   />
            <Stack.Screen name="editorders" component={EditOrders}   />
          </Stack.Navigator>
      );
  }

}

export default AppStack;