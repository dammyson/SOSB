/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';

import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail, showTopNotification } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import SelectCountry from '../../component/View/SelectCountry';
import { showMessage } from 'react-native-flash-message';
import ShowPage from '../../component/View/ShowPage';


export default class EditTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: '',
      loading: true,
      currency: '',
      user_id: '',
      session_id: '',
      item: '',
      show_country: false,
      country_name: 'Select Region',
      details_list: []

    };
  }

  async componentDidMount() {
    const { item } = this.props.route.params;
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID(),
      currency: await getCurrency(),
      item: item
    });

    this.getDetails()

  }


  async getDetails() {

    const { user_id, session_id, item, currency } = this.state
    this.setState({ loading: true })
    const formData = new FormData();

    formData.append('code', "shopper");
    formData.append('action', "viewOrderInfo");
    formData.append('sid', item.id);
    formData.append('curr', currency);

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res)
        this.setState({ loading: false, })

        if (!res.error) {
          this.setState({
            details: res.data
          })

          this.getInfo()

        } else {
          showMessage('error', res.message)
        }
      }).catch((error) => {
        console.warn(error);
        showMessage('error', error.message)
      });
  }



  async getInfo() {

    const { user_id, session_id, details, item, currency } = this.state
    this.setState({ loading: true })
    const formData = new FormData();

    formData.append('code', "shopper");
    formData.append('action', "viewSalesDetails");
    formData.append('id', details.custID);
    formData.append('custid', details.custID);
    formData.append('sid', details.sessionID);
    formData.append('curr', currency);
    console.warn(formData);

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false, })
        console.warn(res)
        if (!res.error) {
          this.setState({
            details_list: res.data
          })

        } else {
          showMessage('error', res.message)
        }
      }).catch((error) => {
        console.warn(error);
        showMessage('error', error.message)
      });
  }

  render() {
    const { details } = this.state

    if (this.state.loading) {
      return (
        <ActivityIndicator color={colors.primary_color} message={'Loading...'} />
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
    return (
      <>
      <ImageBackground
        style={{
          flex: 1
        }}
        source={require('../../assets/bg.png')}>
        <Container style={{ backgroundColor: 'transparent' }}>
          <StatusBar barStyle="light-content" translucent hidden={false} backgroundColor={colors.primary_color} />
          <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} title="Edit Transaction" />
          <View style={{ flex: 1, }}  >

            <ScrollView >

              <View style={{ marginHorizontal: 20, }}>
                <Text style={styles.actionbutton}>Shipping Address</Text>
                <View regular style={styles.item}>
                  <Text style={[{ fontFamily: 'NunitoSans-Regular', color: colors.primary_color, fontSize: 12, marginRight: 5 },]}>{details.shippingAddr}</Text>
                </View>

              </View>

          


              <View style={{ marginHorizontal: 20, }}>
                <Text style={styles.actionbutton}>Items</Text>

              </View>


              {this.renderItems()}


            </ScrollView>

            <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row', }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.onAccept()} style={styles.buttonContainer}>

                  <Text style={{ fontFamily: "NunitoSans-SemiBold", textAlign: 'center', fontSize: 12, color: '#fdfdfd', flex: 1 }}>Accept</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.onReject()} style={styles.buttonBortherContainer} >
                  <Text style={{ color: colors.primary_color, fontFamily: "NunitoSans-SemiBold", flex: 1, textAlign: 'center', fontSize: 12, }}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Container>
      </ImageBackground>
      </>
    );
  }


  renderItems() {
    let items = [];
    this.state.details_list.map((item, i) => {
      items.push(

        <View style={{ paddingLeft: 10, marginHorizontal: 20, borderBottomColor:'red', borderBottomWidth:1, }}>
          <Text style={{ fontSize: 12, fontFamily: "NunitoSans-Regular", color: colors.primary_color, marginBottom: 2 }}>{item.itemName}</Text>
          <View style={{  }}>
            <Text style={{ fontSize: 12, fontFamily: "NunitoSans-Regular", color: colors.primary_color, }}>price: {item.currency} {item.unitPrice}</Text>
          </View>
        </View>


      );
    });
    return items;
  }



  onAccept() {
    const { user_id, session_id, item, currency } = this.state
    this.setState({ loading: true })
    const formData = new FormData();

    formData.append('code', "shopper");
    formData.append('action', "acceptOrder");
    formData.append('adminid', user_id);
    formData.append('sid', item.id);
    console.warn(formData);

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false, })
        console.warn(res)
        if (!res.error) {
          showMessage('success', "You have accepted this order")

        } else {
          showMessage('error', res.message)
        }
      }).catch((error) => {
        console.warn(error);
        showMessage('error', error.message)
      });
  }

  onReject() {
    const { user_id, session_id, item, currency } = this.state
    this.setState({ loading: true })
    const formData = new FormData();

    formData.append('code', "shopper");
    formData.append('action', "rejectorder");
    formData.append('adminid', user_id);
    formData.append('sid', item.id);
    console.warn(formData);

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false, })
        console.warn(res)
        if (!res.error) {
          showMessage('success', "You have accepted this order")

        } else {
          showMessage('error', res.message)
        }
      }).catch((error) => {
        console.warn(error);
        showMessage('error', error.message)
      });
  }




}

const styles = StyleSheet.create({

  buttonContainer: {
    height: 40,
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },

  buttonBortherContainer: {
    height: 40,
    backgroundColor: 'orange',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
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
    opacity: 1,
    fontSize: 10,
    color: '#0F0E43',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Bold'
  },
  item: {

    flexDirection: 'row',
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

