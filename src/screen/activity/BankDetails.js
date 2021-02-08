/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, AsyncStorage, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';


import { BaseUrl, getUserID, getSessionID } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payement: {},
      user_id: '',
      session_id: '',
      loading: false,
      bill:''
    };
  }


  async componentWillMount() {
    const { paymentDetails } = this.props.route.params;
    if (paymentDetails) {
      this.setState({ paymentDetails: paymentDetails });
      console.warn(paymentDetails.billadd.addressLine1);
    }
   
   

  }
 async componentWillMount() {
  const { bill } = this.props.route.params;
  this.setState({ bill: bill });
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID()
    });

    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
    })


  }

  bankTransferVerification() {
    const { user_id, session_id, payement } = this.state
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('code', "order");
    formData.append('action', "bankVerify");
    formData.append('id', user_id,);
    formData.append('sid', session_id);

    fetch(BaseUrl(), {
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text>Processing Order</Text>
        </View>
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
        <Navbar left={left} right={right} title="Bank Details" />
        <Content padder>
          <View>
            <Text style={{ marginTop: 15, fontSize: 18 }}>Bank Details</Text>

            <View regular style={styles.item}> 
            <Text style={styles.actionbutton}>Bank Name: </Text>
            <Text style={styles.actionbuttonText}> Zenith Bank</Text>
            </View>


            <View regular style={styles.item}> 
            <Text style={styles.actionbutton}>Account Name: </Text>
            <Text style={styles.actionbuttonText}>Ofidy Global</Text>
            </View>

            <View regular style={styles.item}> 
            <Text style={styles.actionbutton}>Account Number: </Text>
            <Text style={styles.actionbuttonText}>1234567890</Text>
            </View>

            <View regular style={styles.item}> 
            <Text style={styles.actionbutton}>Account Sort Code: </Text>
            <Text style={styles.actionbuttonText}>1567890</Text>
            </View>

            <View regular style={styles.item}> 
            <Text style={styles.actionbutton}>Total: </Text>
            <Text style={styles.actionbuttonText}>{this.currencyFormat(this.state.bill)}</Text>
            </View>

          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>

            <Button onPress={() => this.checkout()} style={styles.buttonContainer} block iconLeft>
              <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>I Have made payement </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }


  currencyFormat(n) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

  checkout() {
    this.bankTransferVerification();
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50
  },

  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    marginBottom:-5,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Regular'
  },

})
