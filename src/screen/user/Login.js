// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, TouchableOpacity, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Button, Left, } from 'native-base';
import {
  BarIndicator,
} from 'react-native-indicators';

const URL = require("../../component/server");

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';
import { BaseUrl, getFmc } from '../../utilities';
import { StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.state = {
      loading: false,
      email: "",
      password: "",
      demail: "",
      token: "",

    }

  }
  async componentDidMount() {
    this.setState({ token: await getFmc() })

  }


  checkLogin() {
    const { email, password, token } = this.state

    if (password == "" || email == "") {
      Alert.alert('Validation failed', 'Password field cannot be empty', [{ text: 'Okay' }])
      return
    }

    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('code', "customer");
    formData.append('action', "login");
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobileToken', token);

    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false })
        console.warn(res);
        if (!res.error) {
          AsyncStorage.setItem('curr', res.currency);
          AsyncStorage.setItem('aut', "yes");
          AsyncStorage.setItem('email', res.email);
          AsyncStorage.setItem("user_id", res.id);
          AsyncStorage.setItem("session_id", res.sid);
          AsyncStorage.setItem("user", JSON.stringify(res));
          AsyncStorage.setItem("account_type", res.accountType);
          setTimeout(() => {
            this.props.navigation.replace('home')
          }, 1000);


        } else {
          if (res.message == 'Please update password') {
            this.props.navigation.navigate('changepass')
          } else {
            showMessage('info',res.message )
           
           
          }
        }

      }).catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });
  }


  render() {


    return (
      <ImageBackground
        style={{
          flex: 1
        }}
        source={require('../../assets/bg.png')}>
        <Container style={{ backgroundColor: 'transparent' }}>

          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <Content>
            <View style={styles.body}>
              <View style={styles.top}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')} />
              </View>
              <Text style={{ color: colors.primary_color, margin: 20, fontFamily: "NunitoSans-Bold", fontSize: 20, }}>Sign In </Text>
              <View style={styles.bottom}>

                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor='#3E3E3E'
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType='email-address'
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  inlineImageLeft='ios-call'
                  onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor='#3E3E3E'
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => this.checkLogin()}
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
                      <Button onPress={() => this.checkLogin()} style={styles.buttonContainer} block iconLeft>
                        <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN IN </Text>
                      </Button>
                    </View>
                }



                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30, marginRight: 30 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('reg')}>
                    <Text style={{ color: colors.primary_color, fontWeight: '600', fontSize: 13, }}>Create New Account  </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1, justifyContent: 'center', }} />



                  <View style={{ width: 1, backgroundColor: colors.primary_color }} />

                  <View style={{ flex: 1, justifyContent: 'center', }} />



                  <TouchableOpacity onPress={() => this.props.navigation.navigate('forgetpass')}>
                    <Text style={{ color: colors.primary_color, fontWeight: '400', fontSize: 13, }}>Forgot Password </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </Content>

        </Container>
      </ImageBackground>

    );
  }


}
const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  whiteButtonContainer: {
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 1,
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
    backgroundColor: '#edf3eb'
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
    height: 80,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});



