/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Header, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';

import { BaseUrl, getUserID, getSessionID, getCurrency } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      loading: false,
      aut: '',
      user_id: '',
      session_id: '',
      currency:''
    };
  }

  async componentWillMount() {

    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID(),
      currency: await getCurrency() 
    });


    AsyncStorage.getItem('aut').then((value) => {
      if (value.toString() == 'no') {
        Alert.alert(
          'Login Out',
          'You are not logged in, log in to add this item to cart',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
            { text: 'OK', onPress: () => console.wanr('') },
          ],
          { cancelable: false }
        )
        return
      }
      this.setState({ 'aut': value.toString() })
     // this.getCart();
    })

  }

  componentDidMount() {

  }

  async getCart() {
    const { user_id, session_id, currency } = this.state
    console.warn(await getUserID(), session_id);
    this.setState({ loading: true })
    const formData = new FormData();

    formData.append('action', "get");
    formData.append('code', "cart");
    formData.append('id', user_id);
    formData.append('sid', session_id);
    formData.append('prf', currency);

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
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
        <Navbar left={left} title="MY CART" />
        {this.state.cartItems.length <= 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="shoppingcart" type='antdesign' size={38} style={{ fontSize: 38, color: '#95a5a6', marginBottom: 7 }} />
            <Text style={{ color: '#95a5a6' }}>Your cart is empty</Text>
          </View>
          :
          <View style={{ flex: 1, }}>
            <ScrollView style={{ flex: 1, }}>
              {this.renderItems()}
            </ScrollView>
            <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.checkout()} style={styles.buttonContainer} block iconLeft>
                  <Icon name="shoppingcart" color={colors.white} size={15} type='antdesign' />
                  <Text style={{ fontFamily: "NunitoSans-SemiBold", textAlign: 'center', fontSize: 12, color: '#fdfdfd', flex: 1 }}>Checkout</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.removeAllPressed()} style={styles.buttonBortherContainer} block iconRight transparent>
                  <Text style={{ color: colors.primary_color, fontFamily: "NunitoSans-SemiBold", flex: 1, textAlign: 'center', fontSize: 12, }}>Emtpy Cart</Text>
                  <Icon color={colors.primary_color} size={15} type='antdesign' name='delete' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i + 1}
          onPress={() => this.itemClicked(item)}
        >
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.quantity > 1 ? item.quantity + "x " : null}
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "NunitoSans-SemiBold", marginBottom: 2 }}>{item.name}</Text>
            <Text style={{ fontSize: 12, fontFamily: "NunitoSans-Regular", }}>price: {item.currency} {item.unitPrice}</Text>
          </Body>
          <Right>
            <Button style={{ marginLeft: -25 }} transparent onPress={() => this.removeItemPressed(item)}>
              <Icon size={20} type='antdesign' name='delete' color={'#95a5a6'} />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
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
          Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
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
            cartItems:[]
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
});

