/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, StatusBar, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';

import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail, showTopNotification } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import SelectCountry from '../../component/View/SelectCountry';


export default class EditTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      loading: false,
      currency: '',
      user_id: '',
      session_id: '',
      item: '',
      show_country: false,
      country_name: 'Select Region',

      transID: '',
      prodName: '',
      prodQty: '',
      prodPrice: '',
      itemColour: '',
      priceCurrency: 'USD',
      dscntPercent: '',
      adminShipping: '',
      promoCode: '',
      weight: '',
      bulkSize: '',
      srcRegion: '12',
      itemSize: '',
      fragileyn: 'n',
      blacklist: 'n',
      invalid: 'n',
      packQty: '',
      srcShipping: '',
    };
  }

  async componentWillMount() {
    const { item } = this.props.route.params;
    console.warn(item)
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID(),
      currency: await getCurrency(),
      unitPrice: item.unitPrice,
      prodName: item.itemName,
      prodQty:item.quantity,
      transID:item.cryptTID
    });



  }

  componentDidMount() {

  }

  async updateTransaction() {

    const { user_id, session_id, currency } = this.state
    const { 
      transID, 
      prodName,
      prodQty, 
      prodPrice,
      itemColour, priceCurrency, dscntPercent, adminShipping, promoCode, weight, bulkSize, srcRegion, itemSize, fragileyn, blacklist, invalid, packQty,srcShipping  } = this.state
    console.warn(await getUserID(), session_id);
   
    const formData = new FormData();
     
    if (transID == "") {
      showTopNotification("warning", "Transaction id is required")
      return
    }
    if (prodPrice == "" || prodPrice == "0"|| prodPrice == "0.00") {
      showTopNotification("warning", "Product Price is required")
      return
    }
    if (weight == "" || weight == 0) {
      showTopNotification("warning", "Weight is required")
      return
    }


    if (srcRegion == "" || srcRegion == 0) {
      showTopNotification("warning", "Source Region is required")
      return
    }


    if (bulkSize == "" || bulkSize == 0) {
      showTopNotification("warning", "Bulk sizeis required")
      return
    }

    this.setState({ loading: true })
    formData.append('action', "updateTrans");
    formData.append('code', "backoffice");
    formData.append('cusID', user_id);
    formData.append('transID', transID);
    formData.append('prodName', prodName);
    formData.append('prodQty', prodQty);
    formData.append('prodPrice', prodPrice);
    formData.append('itemColour', itemColour);
    formData.append('priceCurrency', priceCurrency);
    formData.append('dscntPercent', dscntPercent);
    formData.append('adminShipping', adminShipping);
    formData.append('promoCode', promoCode);
    formData.append('weight', weight); 
    formData.append('bulkSize', bulkSize);
    formData.append('srcRegion', srcRegion);
    formData.append('itemSize', itemSize);
    formData.append('fragileyn', fragileyn);
    formData.append('blacklist', blacklist);
    formData.append('invalid', invalid);
    formData.append('packQty', packQty);
    formData.append('srcShipping', srcShipping);

    console.warn(formData);

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
            cartItems: res.data
          })
          showTopNotification("success", "Transaction updated successfully")
          setTimeout(() => {
            this.props.navigation.goBack()
          }, 1000);
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
        <ActivityIndicator color={colors.primary_color} message={'Updating transaction'} />
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
      <ImageBackground
      style={{
       flex:1
      }}
      source={require('../../assets/bg.png')}>

      <Container style={{ backgroundColor: 'transparent' }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
        <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} title="Edit Transaction" />
        <Content padder>
          <View style={{ marginHorizontal: 20, }}>
            <Text style={styles.actionbutton}>prodName</Text>
            <View regular style={styles.item}>
              <Input placeholder='' onChangeText={(text) => this.setState({ prodName: text })} defaultValue={this.state.prodName} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>prodQty</Text>
            <View regular style={styles.item}>
              <Input placeholder='prodQty' onChangeText={(text) => this.setState({ prodQty: text })} defaultValue={this.state.prodQty} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>prodPrice</Text>
            <View regular style={styles.item}>
              <Input placeholder='prodPrice' onChangeText={(text) => this.setState({ prodPrice: text })} defaultValue={this.state.unitPrice} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>itemColour</Text>
            <View regular style={styles.item}>
              <Input placeholder='itemColour' onChangeText={(text) => this.setState({ itemColour: text })} defaultValue={this.state.itemColour} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>priceCurrency</Text>

            <View style={{ justifyContent: 'center' }}>

              <View regular style={styles.item}>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, marginLeft: 17, }}>USD</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ priceCurrency: 'USD' })}
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
                  {this.state.priceCurrency == 'USD' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }


                </TouchableOpacity>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>GBP</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ priceCurrency: 'GBP' })}
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
                  {this.state.priceCurrency == 'GBP' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }
                </TouchableOpacity>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>NGN</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ priceCurrency: 'NGN' })}
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
                  {this.state.priceCurrency == 'NGN' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }
                </TouchableOpacity>
              </View>

            </View>

            <Text style={styles.actionbutton}>dscntPercent</Text>
            <View regular style={styles.item}>
              <Input placeholder='dscntPercent' onChangeText={(text) => this.setState({ dscntPercent: text })} defaultValue={this.state.dscntPercent} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>adminShipping</Text>
            <View regular style={styles.item}>
              <Input placeholder='adminShipping' onChangeText={(text) => this.setState({ adminShipping: text })} defaultValue={this.state.adminShipping} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>promoCode</Text>
            <View regular style={styles.item}>
              <Input placeholder='promoCode' onChangeText={(text) => this.setState({ promoCode: text })} defaultValue={this.state.unitPrice} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>weight</Text>
            <View regular style={styles.item}>
              <Input placeholder='weight' onChangeText={(text) => this.setState({ weight: text })} defaultValue={this.state.weight} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>bulkSize</Text>
            <View regular style={styles.item}>
              <Input placeholder='bulkSize' onChangeText={(text) => this.setState({ bulkSize: text })} defaultValue={this.state.bulkSize} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>srcRegion</Text>
            <View regular style={styles.item}>
              <TouchableOpacity onPress={() => this.setState({ show_country: true })} style={{ marginLeft: 5, alignItems: 'center', flex: 1, justifyContent: 'flex-start', flexDirection: "row" }}>
                <Text style={[{ fontFamily: 'NunitoSans-Regular', fontStyle: 'italic', color: colors.secondary_color, fontSize: 12, marginRight: 5 }, this.state.country_name == 'Select Region' ? { color: colors.text_inputplace_holder } : {}]}>{this.state.country_name}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.actionbutton}>fragileyn</Text>

            <View style={{ justifyContent: 'center' }}>

              <View regular style={styles.item}>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, marginLeft: 17, }}>Yes</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ fragileyn: 'y' })}
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
                  {this.state.fragileyn == 'y' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }


                </TouchableOpacity>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>No</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ fragileyn: 'n' })}
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
                  {this.state.fragileyn == 'n' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }
                </TouchableOpacity>
              </View>

            </View>


            <Text style={styles.actionbutton}>blacklist</Text>
            <View style={{ justifyContent: 'center' }}>

              <View regular style={styles.item}>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, marginLeft: 17, }}>Yes</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ blacklist: 'y' })}
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
                  {this.state.blacklist == 'y' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }


                </TouchableOpacity>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>No</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ blacklist: 'n' })}
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
                  {this.state.blacklist == 'n' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }
                </TouchableOpacity>
              </View>

            </View>
            <Text style={styles.actionbutton}>invalid</Text>
            <View style={{ justifyContent: 'center' }}>

              <View regular style={styles.item}>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, marginLeft: 17, }}>Yes</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ invalid: 'y' })}
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
                  {this.state.invalid == 'y' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }


                </TouchableOpacity>
                <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 12, }}>No</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ invalid: 'n' })}
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
                  {this.state.invalid == 'n' ?
                    <View style={{ width: 15, borderRadius: 15, height: 15, backgroundColor: colors.primary_color, }} />
                    : null
                  }
                </TouchableOpacity>
              </View>

            </View>
            <Text style={styles.actionbutton}>packQty</Text>
            <View regular style={styles.item}>
              <Input placeholder='packQty' onChangeText={(text) => this.setState({ packQty: text })} defaultValue={this.state.packQty} placeholderTextColor="#687373" style={styles.input} />
            </View>
            <Text style={styles.actionbutton}>srcShipping</Text>
            <View regular style={styles.item}>
              <Input placeholder='srcShipping' onChangeText={(text) => this.setState({ srcShipping: text })} defaultValue={this.state.srcShipping} placeholderTextColor="#687373" style={styles.input} />
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
           
                <View>
                  <Button onPress={() => this.updateTransaction()} style={styles.buttonContainer} block iconLeft>
                    <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Update </Text>
                  </Button>
                </View>
          
          </View>
        </Content>
        {this.state.show_country ? this.renderSelectCountry() : null}
      </Container>
      </ImageBackground>
    );
  }



  renderSelectCountry() {
    return (
      <SelectCountry
        onSelect={(v) => this.onSelectCountry(v)}
        onClose={() => this.setState({ show_country: false })} />
    )
  }
  onSelectCountry(item) {
    this.setState({ show_country: false, srcRegion: item.id, country_name: item.name })
  }

  removeItemPressed(item) {
    Alert.alert(
      'Remove ' + item.title,
      'Are you sure you want this item from your cart ?',
      [
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.removeItem(item) },
      ]
    )
  }

  removeItem(itemToRemove) {
    console.warn(itemToRemove)
    const { user_id, session_id } = this.state

    this.setState({ loading: true })
    const formData = new FormData();


    formData.append('action', "delete");
    formData.append('code', "cart");
    formData.append('id', user_id);
    formData.append('sid', session_id);
    formData.append('tid', itemToRemove.id);
    formData.append('prf', "NGN");

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState({
            loading: false,
          })
          this.getCart();

        } else {
          Alert.alert('Operation failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });
  }

  removeAllPressed() {
    Alert.alert(
      'Empty cart',
      'Are you sure you want to empty your cart ?',
      [
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.removeAll() }
      ]
    )
  }

  removeAll() {
    this.setState({ cartItems: [] })
    const { user_id, session_id } = this.state

    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('action', "empty");
    formData.append('code', "cart");
    formData.append('id', user_id);
    formData.append('sid', session_id);
    formData.append('prf', "NGN");

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState({
            loading: false,
            cartItems: []
          })

        } else {
          Alert.alert('Operation failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });


  }



  checkout() {

    this.props.navigation.navigate('order', { cartItems: this.state.cartItems });
  }

  itemClicked(item) {
    // Actions.product({product: item});
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
    borderColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
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
    opacity: 0.7,
    fontSize: 12,
    color: '#0F0E43',
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
    borderColor:  colors.primary_color,
    borderWidth: 0.6,
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#edf3eb'

  },
  itemtwo: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,

  },
});

