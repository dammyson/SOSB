// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, View, Dimensions, StatusBar, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Text, Icon, Button, Left, } from 'native-base';

import {
  getLocation,
} from '../../utilities/locationService';

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';
import { ImageBackground } from 'react-native';


export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      phone: "",
      uname: "",
      lname: "",
      lname: "",
      password: "",
      latitude: 6.5244,
      longitude: 3.3792,
    }

  }



  async componentDidMount() {


    var cordinates = getLocation();
    cordinates.then((result) => {
      this.setState({
        latitude: result.latitude,
        longitude: result.longitude
      });
      console.log(result);
      this.updateProfileRequest()
    }, err => {
      console.log(err);
    });
  }


  setToRemember() {
    if (this.state.remember_me) {
      this.setState({ remember_me: false })
      AsyncStorage.setItem('first_time', "Yes");
    } else {
      this.setState({ remember_me: true })
      AsyncStorage.setItem('first_time', "No");
    }
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
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <Content>
            <View style={styles.body}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')} />
              </View>
              <Text style={{ color: colors.primary_color, margin: 20, fontWeight: '900', fontSize: 25, }}>Sign In </Text>
              <View style={styles.bottom}>


                <View>
                  <Button onPress={() => this.props.navigation.replace('login')} style={styles.buttonContainer} block iconLeft>
                    <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN IN </Text>
                  </Button>

                  <Button onPress={() => this.props.navigation.replace('reg')} style={styles.whiteButtonContainer} block iconLeft>
                    <Text style={{ color: colors.primary_color, fontWeight: '600' }}>SIGN UP </Text>
                  </Button>


                  <View style={{   marginLeft: 30,flexDirection: 'row', alignItems: 'center', marginTop:20 }}>

                    <TouchableOpacity
                      onPress={() => this.setToRemember()}
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 2,
                        marginRight: 5,
                        backgroundColor: colors.white,

                      }}>
                      {this.state.remember_me ?
                        <View>
                          <Icon
                            name="check"
                            type="Entypo"
                            size={20}
                            color={colors.primary_color}
                          />

                        </View>

                        : null
                      }


                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>Dont Show me intro again</Text>
                  </View>

                </View>



              </View>

              <View style={{ height: 100 }}></View>

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
    backgroundColor: '#fff',
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
    borderRadius: 20,
    marginTop: 20,
  },
  whiteButtonContainer: {
    backgroundColor: '#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: colors.primary_color,
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
    borderColor: '#000000',
    borderWidth: 0.8,
    borderRadius: 20,
    marginTop: 1
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
    width: 220,
    height: 170,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});



