/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, StatusBar, ImageBackground, Platform } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item, } from 'native-base';
import { RadioButton } from 'react-native-paper';

// Our custom files and classes import
import { BaseUrl, getUserID, getSessionID, getCurrency } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import SelectAddress from '../../component/View/SelectAddress';
import SelectMethod from '../../component/View/SelectMethod';
import AddAddress from '../../component/View/AddAddress';





export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      aut: '',
      user_id: '',
      session_id: '',
      shipping_address: 'Select address',
      billing_address: 'Select address',
      toadd: 'yes',
      paymethod: 'bank transfer',
      shipping_method: 'Select Method',
      tip: '',
      show_billing_address: false,
      show_shipping_address: false,
      show_method: false,
      show_address: false,
      cost_add_id: '4',

      selectedSize: '',
      delto: true,
      billadd: '',
      shippadd: '',
      shipping_method: 'Select Method',
      shipmed: '',
      shippingmethod: [],
      currency: '',
      shipreq: "null"
    };
  }

  async componentWillMount() {
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID(),
      currency: await getCurrency()
    });

    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
      this.getAddress();
    })


  }

  componentDidMount() {

  }

  onLoadPaymentInfo(paymentDetails) {

    const { session_id, currency } = this.state
    console.warn(paymentDetails)
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('code', "order");
    formData.append('action', "paymentInfo");
    formData.append('sid', session_id);
    formData.append('prf', currency);
    formData.append('bill_addr', paymentDetails.billadd.id);
    formData.append('ship_addr', paymentDetails.shippadd.id);
    formData.append('shipmethod', paymentDetails.shipmed.id);
    formData.append('shipreq', paymentDetails.shipreq);
    formData.append('paymethod', paymentDetails.paymethod);
    formData.append('shoppertip', paymentDetails.tip);


    console.log(formData)

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
          this.props.navigation.navigate('confirm_order', { paymentDetails: paymentDetails, paymentinfo: res.data, });
        } else {
          Alert.alert('Operation failed', res.message, [{ text: 'Okay' }])
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
        <ActivityIndicator color={colors.primary_color} message={'Getting cart'} />
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
      <ImageBackground
        style={{
          flex: 1
        }}
        source={require('../../assets/bg.png')}>
        <Container style={{ backgroundColor: 'transparent' }}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
          <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} right={right} title="CHECKOUT" />
          <Content padder>
            <View style={{ marginHorizontal: 20, }}>
              <Text style={styles.actionbutton}>BILLING ADDRESS</Text>

              <View regular style={styles.item}>


                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.setState({ show_billing_address: true })} style={{ marginLeft: 5, alignItems: 'center', flex: 1, justifyContent: 'flex-start', flexDirection: "row" }}>
                    <Text style={[{ fontFamily: 'NunitoSans-Regular', fontStyle: 'italic', color: colors.secondary_color, fontSize: 12, marginRight: 5 }, this.state.billing_address == 'Select address' ? { color: colors.text_inputplace_holder } : {}]}>{this.state.billing_address}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setState({ show_address: true })}>
                  <Icon name='addfile' type='antdesign' size={20} />
                </TouchableOpacity>
              </View>


              <Text style={styles.actionbutton}>SELECT DELIVERY OPTIONS</Text>


              <View style={{ justifyContent: 'center' }}>

                <View regular style={styles.item}>
                  <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, marginLeft: 7, }}>Deliver to my address</Text>
                  <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, marginLeft: 17, }}>Yes</Text>
                  <TouchableOpacity
                    onPress={() => this.setToadd('yes')}
                    style={{
                      borderRadius: 15,
                      width: 25,
                      height: 25,
                      borderColor: '#8d96a6',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}>
                    {this.state.toadd == 'yes' ?
                      <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                      : null
                    }


                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>No</Text>
                  <TouchableOpacity
                    onPress={() => this.setToadd('no')}
                    style={{
                      borderRadius: 15,
                      width: 25,
                      height: 25,
                      borderColor: '#8d96a6',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 7,
                      marginRight: 5,

                    }}
                  >
                    {this.state.toadd == 'no' ?
                      <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                      : null
                    }
                  </TouchableOpacity>
                </View>

              </View>





              <Text style={styles.actionbutton}>SHIPPING INFORMATION</Text>

              <View regular style={styles.item}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.setState({ show_shipping_address: true })} style={{ marginLeft: 5, alignItems: 'center', flex: 1, justifyContent: 'flex-start', flexDirection: "row" }}>
                    <Text style={[{ fontFamily: 'NunitoSans-Regular', fontStyle: 'italic', color: colors.secondary_color, fontSize: 12, marginRight: 5 }, this.state.shipping_address == 'Select address' ? { color: colors.text_inputplace_holder } : {}]}>{this.state.shipping_address}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setState({ show_address: true })}>
                  <Icon name='addfile' type='antdesign' size={20} />
                </TouchableOpacity>
              </View>



              <Text style={styles.actionbutton}>SHIPPING METHOD</Text>
              <View regular style={styles.item}>


                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.setState({ show_method: true })} style={{ marginLeft: 5, alignItems: 'center', flex: 1, justifyContent: 'flex-start', flexDirection: "row" }}>
                    <Text style={[{ fontFamily: 'NunitoSans-Regular', fontStyle: 'italic', color: colors.secondary_color, fontSize: 12, marginRight: 5 }, this.state.shipping_method == 'Select Method' ? { color: colors.text_inputplace_holder } : {}]}>{this.state.shipping_method}</Text>
                  </TouchableOpacity>
                </View>

              </View>


              <Text style={styles.actionbutton}>Any comments/notes</Text>
              <View regular style={styles.item}>
                <Input placeholder='Any comments/notes for shipping & delivery:' onChangeText={(text) => this.setState({ shipreq: text })} placeholderTextColor="#687373" style={styles.input} />
              </View>

              <Text style={styles.actionbutton}>PAYMENT METHOD</Text>


              <View regular style={{ borderColor: '#8d96a6', borderWidth: 0.6, marginVertical: 5, paddingHorizontal: 10, borderRadius: 5, }}>
                {this.state.currency == "NGN" ?
                  <>
                    <View regular style={styles.itemtwo}>
                      <TouchableOpacity
                        onPress={() => this.setPaymethod('bank transfer')}
                        style={{
                          borderRadius: 15,
                          width: 25,
                          height: 25,
                          borderColor: '#8d96a6',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 7,
                          marginRight: 5,

                        }}
                      >
                        {this.state.paymethod == 'bank transfer' ?
                          <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                          : null
                        }
                      </TouchableOpacity>
                      <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>Bank Transfer</Text>
                    </View>




                    {/**
                  <View regular style={styles.itemtwo}>
                    <TouchableOpacity
                      onPress={() => this.setPaymethod('paystack')}
                      style={{
                        borderRadius: 15,
                        width: 25,
                        height: 25,
                        borderColor: '#8d96a6',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 7,
                        marginRight: 5,

                      }}
                    >
                      {this.state.paymethod == 'paystack' ?
                        <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                        : null
                      }
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>Card (Paystack) - Naira</Text>
                  </View>

                */}

                    <View regular style={styles.itemtwo}>
                      <TouchableOpacity
                        onPress={() => this.setPaymethod('rave')}
                        style={{
                          borderRadius: 15,
                          width: 25,
                          height: 25,
                          borderColor: '#8d96a6',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 7,
                          marginRight: 5,

                        }}
                      >
                        {this.state.paymethod == 'rave' ?
                          <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                          : null
                        }
                      </TouchableOpacity>
                      <Text style={{ fontSize: 15 }}>Card (Rave) - Naira</Text>
                    </View>
                  </>

                  :


                  <View regular style={styles.itemtwo}>
                    <TouchableOpacity
                      onPress={() => this.setPaymethod('paypal')}
                      style={{
                        borderRadius: 15,
                        width: 25,
                        height: 25,
                        borderColor: '#8d96a6',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 7,
                        marginRight: 5,

                      }}
                    >
                      {this.state.paymethod == 'paypal' ?
                        <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                        : null
                      }
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15 }}>PayPal USD</Text>
                  </View>

                }



                {Platform.OS === 'android' ?
                  <View regular style={styles.itemtwo}>
                    <TouchableOpacity
                      onPress={() => this.setPaymethod('Google Pay')}
                      style={{
                        borderRadius: 15,
                        width: 25,
                        height: 25,
                        borderColor: '#8d96a6',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 7,
                        marginRight: 5,

                      }}
                    >
                      {this.state.paymethod == 'Google Pay' ?
                        <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                        : null
                      }
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15 }}>Google Pay</Text>
                  </View>
                  :
                  null}


              </View>


              <Text style={styles.actionbutton}>Add Tip</Text>
              <View regular style={styles.item}>
                <Input keyboardType="numeric" placeholder='Add Tip' onChangeText={(text) => this.setState({ tip: text })} placeholderTextColor="#687373" style={styles.input} />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
              {
                this.state.loading ?
                  <View>
                    <Button style={styles.buttonContainer} block iconLeft>
                      <BarIndicator count={4} color={'#fff'} />
                    </Button>
                  </View>
                  :
                  <View>
                    <Button onPress={() => this.checkout()} style={styles.buttonContainer} block iconLeft>
                      <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Place Order </Text>
                    </Button>
                  </View>
              }
            </View>
          </Content>
          {this.state.show_billing_address ? this.renderSelectBillingAddress() : null}
          {this.state.show_shipping_address ? this.renderSelectShippingAddress() : null}
          {this.state.show_method ? this.renderSelectMethod() : null}
          {this.state.show_address ? this.renderAddAddress() : null}
        </Container>
      </ImageBackground>
    );
  }


  checkout() {
    const { paymethod, toadd, shipreq, billadd, shippadd, shipmed, tip } = this.state
    const shippingmethod =
      { paymethod: paymethod, toadd: toadd, shipreq: shipreq, billadd: billadd, shippadd: shippadd, shipmed: shipmed, tip: tip }

    this.onLoadPaymentInfo(shippingmethod);

  }


  setToadd(value) {
    this.setState({ toadd: value })
  }

  setPaymethod(value) {
    this.setState({ paymethod: value })
  }

  renderSelectBillingAddress() {
    return (
      <SelectAddress
        onSelect={(v) => this.onSelectBillingAddress(v)}
        onClose={() => this.setState({ show_billing_address: false })} />
    )
  }
  onSelectBillingAddress(item) {
    this.setState({
      billing_address: item.addressLine1 + " " + item.city + " " + item.state + " " + item.state,
      show_billing_address: false,
      billadd: item
    })
  }

  renderSelectShippingAddress() {
    return (
      <SelectAddress
        onSelect={(v) => this.onSelectShippingAddress(v)}
        onClose={() => this.setState({ show_shipping_address: false })} />
    )
  }

  onSelectShippingAddress(item) {
    this.setState({
      shipping_address: item.addressLine1 + " " + item.city + " " + item.state + " " + item.state,
      show_shipping_address: false,
      shippadd: item,
      cost_add_id: item.id
    })
  }

  renderSelectMethod() {
    return (
      <SelectMethod
        address={this.state.shippadd}
        onSelect={(v) => this.onSelectMethod(v)}
        onClose={() => this.setState({ show_method: false })} />
    )
  }


  onSelectMethod(item) {
    this.setState({ shipping_method: item.name + " " + item.price, shipmed: item, show_method: false })
  }

  renderAddAddress() {
    return (
      <AddAddress
        onClose={() => this.setState({ show_address: false })} />

    )
  }


}

const styles = StyleSheet.create({
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
    opacity: 0.8,
    fontSize: 10,
    color: colors.primary_color,
    textAlign: 'left',
    fontFamily: 'NunitoSans-Bold'
  },
  buttonContainer: {
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  item: {
    height: 45,
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
});
