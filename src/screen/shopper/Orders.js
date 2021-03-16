/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, StatusBar, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Header, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';

import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


export default class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      loading: true,
      currency: '',
      user_id: '',
      session_id: '',
    };
  }

  async componentWillMount() {
     console.warn(await getEmail())
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID(),
      currency: await getCurrency() 
    });


   
      this.getCart();
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getCart();
    });
  

  }

  componentDidMount() {

  }

  async getCart() {

    const { user_id, session_id, currency } = this.state
    console.warn(await getUserID(), session_id);
    this.setState({ loading: true })
    const formData = new FormData();
    
    formData.append('code', "shopper");
    formData.append('action', "viewSales");
   


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
           // cartItems: res.data
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

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator color={colors.primary_color} message={'Getting transaction'} />
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
        flex: 1
      }}
      source={require('../../assets/bg.png')}>
      <Container style={{ backgroundColor: 'transparent' }}>

        <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
        <Navbar onCurrencyChange={(text)=> this.setState({currency: text})} left={left} title="Transaction" />
        {this.state.cartItems.length <= 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="shoppingcart" type='antdesign' size={38} style={{ fontSize: 38, color: '#95a5a6', marginBottom: 7 }} />
            <Text style={{ color: '#95a5a6' }}>Your transaction is empty</Text>
          </View>
          :
          <View style={{ flex: 1, }}>
            <ScrollView style={{ flex: 1, }}>
              {this.renderItems()}
            </ScrollView>
          </View>
        }
      </Container>
      </ImageBackground>
    );
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i + 1}
          onPress={() => this.editItemPressed(item)}
        >
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.quantity > 1 ? item.quantity + "x " : null}
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "NunitoSans-SemiBold", marginBottom: 2 }}>{item.itemName}</Text>
            <Text style={{ fontSize: 12, fontFamily: "NunitoSans-Regular", }}>price: {item.currency} {item.unitPrice}</Text>
          </Body>
          <Right>
            <Button style={{ marginLeft: -25 }} transparent onPress={() => this.editItemPressed(item)}>
              <Icon size={20} type='antdesign' name='edit' color={'#95a5a6'} />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  editItemPressed(item) {
   this.props.navigation.navigate('edittransactions', { item: item })
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

