// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, TouchableOpacity, Image, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native';
import { Container, Content, Text, Icon, Button, Left, } from 'native-base';
import _ from "lodash";
import {
  BarIndicator,
} from 'react-native-indicators';
import {
  getLocation,
  geocodeLocationByName,
  geocodeAddressByName,
  geocodeLocationByCoords
} from '../../utilities/locationService';

const URL = require("../../component/server");

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';
import { BaseUrl , showTopNotification} from '../../utilities';


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      phone: "",
      uname: "",
      address: "",
      lname: "",
      lname: "",
      password: "",
      latitude: 6.5244,
      longitude: 3.3792,
      locationPredictions: []

    }

    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );

  }



  async componentDidMount() {


    var cordinates = getLocation();
    cordinates.then((result) => {
      this.setState({
        latitude: result.latitude,
        longitude: result.longitude
      });
      console.log(result);
    }, err => {
      console.log(err);
    });
  }

  checkReg() {

    const { email, phone, uname, fname, lname, password } = this.state
    if (email == "" || password == "" || phone == "" || uname == "" || lname == "" || fname == "") {
      Alert.alert('Validation failed', 'field(s) cannot be empty', [{ text: 'Okay' }])
      return
    }
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('code', "customer");
    formData.append('action', "register");
    formData.append('pwd', password);
    formData.append('email', email);
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('uname', uname);
    formData.append('mobile', phone);
    formData.append('telephone', phone);
    formData.append('memword', "food");
    formData.append('day', "2");
    formData.append('month', "2");
    formData.append('year', "1990");
    formData.append('gender', "M");

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (!res.error) {
          this.setState({ loading: false })
          showTopNotification("success", "Registration  successful, Welcome To Ofidy")
          this.props.navigation.replace('login')
        } else {
          Alert.alert('Operation failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });
  }



  onChangeDestination = async (venue) => {
    const { longitude, latitude } = this.state;
    if (venue.lenght < 4) {
      return
    }
    const apiKey = 'AIzaSyBuEYeKLbJ0xnFwHKT-z2Kq174a3f7u4ac'
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${venue}&location=${latitude},${longitude}&radius=2000`;
    console.log(apiUrl);
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      console.log(json)
      this.setState({
        locationPredictions: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }


  onAddressSelected = (location) => {
    this.setState({ locationPredictions: [], address: location })
    geocodeLocationByName(location).then((result) => {
      console.warn(result)
      this.setState({
        latitude: result.lat, longitude: result.lng

      })
      this.getRealDirection(result.lat, result.lng);
    }, err => {
      console.log(err);
    });
  }


  getRealDirection(lat, log) {
    geocodeLocationByCoords(lat, log).then((result) => {
      console.warn(result)
    }, err => {
      console.log(err);
    });
  }

  renderPrediction = (predictions) => {
    let cat = [];
    for (var i = 0; i < predictions.length; i++) {
      let location = predictions[i].structured_formatting.main_text
      cat.push(
        <TouchableHighlight
          onPress={() => this.onAddressSelected(location)}>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={styles.suggestions}>
              {predictions[i].structured_formatting.main_text}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }
    return cat;
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
        <Text style={{ fontSize: 14, color: '#000', }}>Oriental Hotel Lekki Lagos </Text>
        <Text style={{ fontSize: 12, color: '#000', }}>Lekki-expressway Lagos LA </Text>
      </View>

    )

  }


  render() {


    return (
      <ImageBackground
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={require('../../assets/bg.png')}>

        <Container style={{ backgroundColor: 'transparent' }}>

          <Content>
            <View style={styles.body}>
              <View style={styles.top}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')} />
              </View>
              <Text style={{ color: colors.primary_color, margin: 20, fontWeight: '900', fontSize: 25, }}>Sign Up </Text>
              <View style={styles.bottom}>
                {this.renderFirst()}

              </View>

            </View>
          </Content>
        </Container>
      </ImageBackground>
    );
  }



  renderFirst() {
    return (
      <>


        <TextInput
          placeholder="Email"
          placeholderTextColor='#3E3E3E'
          returnKeyType="next"
          onSubmitEditing={() => this.phone.focus()}
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          placeholder="Phone number"
          placeholderTextColor='#3E3E3E'
          returnKeyType="next"
          onSubmitEditing={() => this.uname.focus()}
          keyboardType='numeric'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          onChangeText={text => this.setState({ phone: text })}
          ref={(input) => this.phone = input}
        />
         <TextInput
          placeholder="Username"
          placeholderTextColor='#3E3E3E'
          returnKeyType="next"
          onSubmitEditing={() => this.uname.focus()}
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          onChangeText={text => this.setState({ uname: text })}
          ref={(input) => this.firstname = input}
        />
        <TextInput
          placeholder="First name"
          placeholderTextColor='#3E3E3E'
          returnKeyType="next"
          onSubmitEditing={() => this.lastname.focus()}
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          onChangeText={text => this.setState({ fname: text })}
          ref={(input) => this.firstname = input}
        />
        <TextInput
          placeholder="Last name"
          placeholderTextColor='#3E3E3E'
          returnKeyType="next"
          onSubmitEditing={() => this.username.focus()}
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          onChangeText={text => this.setState({ lname: text })}
          ref={(input) => this.lastname = input}
        />
        <TextInput
          placeholder="Address"
          placeholderTextColor='#3E3E3E'
          returnKeyType="next"
          onSubmitEditing={() => this.phone.focus()}
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          defaultValue={this.state.address}
          onChangeText={venue => {
            this.setState({ venue });
            this.onChangeDestinationDebounced(venue);
          }}
        />
        <View style={{ backgroundColor: '#fff' }}>
          {this.renderPrediction(this.state.locationPredictions)}
        </View>
        <TextInput
          placeholder="Password"
          placeholderTextColor='#3E3E3E'
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => this.checkReg()}
          keyboardType='password'
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          inlineImageLeft='ios-call'
          onChangeText={text => this.setState({ password: text })}
          ref={(input) => this.passwordInput = input}
        />
        {
          this.state.loading ?
            <View>
              <Button style={styles.buttonContainer} block iconLeft>
                <BarIndicator count={4} color={'#fff'} />
              </Button>
            </View>
            :
            <View>
              <Button onPress={() => this.checkReg()} style={styles.buttonContainer} block iconLeft>
                <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN UP </Text>
              </Button>
            </View>
        }



        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30, marginRight: 30, marginBottom: 40 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
            <Text style={{ color: colors.primary_color, fontWeight: '600', fontSize: 13, }}>Login Account  </Text>
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', }} />



          <View style={{ width: 1, backgroundColor: colors.primary_color }} />

          <View style={{ flex: 1, justifyContent: 'center', }} />



          <TouchableOpacity onPress={() => this.props.navigation.navigate('forgetpass')}>
            <Text style={{ color: colors.primary_color, fontWeight: '400', fontSize: 13, }}>Forgot Password </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }



}
const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  gcontainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  body: {
    width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
  },
  buttonContainer: {
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    marginTop: 10,
  },

  top: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {

  },
  input: {
    height: 45,
    color: '#3E3E3E',
    paddingLeft: 15,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    borderColor: colors.primary_color,
    borderWidth: 0.8,
    borderRadius: 10,
    marginTop: 1,
    backgroundColor:'#edf3eb'
  },
  actionbutton: {
    marginTop: 2,
    marginRight: 13,
    marginLeft: 20,
    fontSize: 12,
    color: '#3E3E3E',
    textAlign: 'left',
    fontWeight: '200'
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },

  logo: {
    width: 120,
    height: 100,
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  suggestions: {
    padding: 8,
    fontSize: 14,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'NunitoSans-Light'
  },
});



