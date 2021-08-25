/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';



// Our custom files and classes import
import { BaseUrl, getUserID, getSessionID } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';

export default class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payement: {},
      bill: '',
      loading: true,


    };
  }

  componentWillMount() {
   
  }


  render() {
    var left = (
      <TouchableOpacity >
        <Icon
          name="arrowleft"
          size={20}
          type='antdesign'
          color={colors.white}
        />
      </TouchableOpacity>
    );
    var right = (
      <Right style={{ flex: 1 }}>

      </Right>
    );



    return (
      <ImageBackground
      style={{
       flex:1
      }}
      source={require('../../assets/bg.png')}>
      <Container style={{ backgroundColor: 'transparent' }}>
        <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} title="Confirm" />
        <Content padder>

          <View style={{ flex: 1, height: Dimensions.get('window').height, }}>

            <View style={{ flex: 1 ,  justifyContent: 'center', alignItems: 'center',}}>

              <Text style={{ marginLeft: 20, fontSize: 18, marginRight: 30, marginBottom: 30, textAlign: 'center', fontWeight: '500', }}>
                Your order has been completed you will get a call from one of our customer representative </Text>



            </View>

            <View style={{ flex: 1 }}>


              <Button onPress={() => this.checkout()} style={styles.buttonContainer} block iconLeft>
                <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Go Home </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
      </ImageBackground>
    );
  }

  checkout() {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'home' }],
  });
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  input: {
    height: 38,
    borderColor: '#3E3E3E',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    backgroundColor: colors.grey,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 13,
  },
  actionbutton: {
    marginTop: 7,
    marginBottom: 2,
    opacity: 0.5,
    fontSize: 10,
    color: '#0F0E43',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Regular'
  },
  buttonContainer: {
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  item: {
    height: 40,
    flexDirection: 'row',
    borderColor: '#8d96a6',
    borderWidth: 0.6,
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,

  },
  itemtwo: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,

  },
  actionbuttonText: {
    opacity: 0.9,
    fontSize: 13,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Regular'
  },
});


