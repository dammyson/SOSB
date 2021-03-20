import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from 'react-native'
import AppNavigator from "./app-stack";
import { DrawerContent } from './DrawerContent';
import Backoffice from "./backoffice-stack";
import Shoppers from "./shopper-stack";
import Welcome from "../../screen/user/Welcome";



const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: Dimensions.get('window').width - 100,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={AppNavigator} />
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="Shoppers" component={Shoppers} />
      <Drawer.Screen name="Backoffice" component={Backoffice} />
     
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;