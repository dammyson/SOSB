import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../../screen/onboarding/Splash';
import Transactions from '../../screen/backoffice/Transactions';
import EditTransactions from '../../screen/backoffice/EditTransaction';
import Home from '../../screen/backoffice/index';

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
           
           <Stack.Screen name="index" component={Home}   />
            <Stack.Screen name="transactions" component={Transactions}   />
            <Stack.Screen name="edittransactions" component={EditTransactions}   />
          </Stack.Navigator>
      );
  }

}

export default AppStack;