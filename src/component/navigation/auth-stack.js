import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../../screen/onboarding/Splash';

import Login from '../../screen/user/Login';
import Register from '../../screen/user/Register';
import Home from './DrawerNavigator';
import Welcome from '../../screen/user/Welcome';
import ForgetPassword from '../../screen/user/ForgetPassword';
import ChangePassword from '../../screen/user/ChangePassword';
import Transactions from '../../screen/backoffice/Transactions';
import EditTransactions from '../../screen/backoffice/EditTransaction';
import Intro from '../../screen/onboarding/Intro';
import Chat from '../../screen/Tele/Chat';

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
             initialRouteName="splash"
             >

            <Stack.Screen name="splash" component={Splash}   />
            <Stack.Screen name="login" component={Login}   />
            <Stack.Screen name="reg" component={Register}   />
            <Stack.Screen name="intro" component={Intro}   />
            <Stack.Screen name="welcome" component={Welcome}   />
            <Stack.Screen name="forgetpass" component={ForgetPassword}   />
            <Stack.Screen name="changepass" component={ChangePassword}   />
            <Stack.Screen name="home" component={Home}   />
            <Stack.Screen name="chat" component={Chat} />
            <Stack.Screen name="edittransactions_" component={EditTransactions}   />

          </Stack.Navigator>
         </NavigationContainer>
      );
  }

}

export default AppStack;