/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
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

    this.setState({ id: this.props.id });
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ 'user_id': value.toString() })
    })
    AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString() })
    })
    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
      //  this.registerPayment();
    })

    if (this.props.paymentDetails) {
      this.setState({ payement: this.props.paymentDetails });
      console.warn(this.props.paymentDetails);
    }
  }


  registerPayment() {

    const { session_id, payement } = this.state

    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('feature', "order");
    formData.append('action', "paymentInfo");
    formData.append('sid', session_id);

    formData.append('bill_addr', payement.billadd.id);
    formData.append('ship_addr', payement.shippadd.id);
    formData.append('shipmethod', payement.shipmed.id);
    formData.append('shipreq', payement.shipreq);
    formData.append('paymethod', payement.paymethod);


    fetch('https://www.ita-obe.com/mobile/v1/order.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (!res.error) {
          this.setState({
            loading: false,
          })

        } else {
          Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });

  }


  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator color={colors.primary_color} message={'placing order'} />
      );
    }


    var left = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
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
      <Container>
        <Navbar left={left} right={right} title="Confirm" />
        <Content padder>

          <View style={{ flex: 1,  height: Dimensions.get('window').height, }}>

            <View style={{ flex: 1 }}>

              <Text style={{ marginLeft: 20, fontSize: 18, marginRight: 30, marginBottom: 30, textAlign: 'center', fontWeight: '500', }}>
                Your order has been completed you will get a call from one of our customer representative </Text>



            </View>

            <View style={{ flex: 1 }}>


              <Button onPress={() => this.checkout()} style={styles.buttonContainer} block iconLeft>
                <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Place Order </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  checkout() {
    Actions.home();
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
    fontSize: 12,
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
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Regular'
  },
});


