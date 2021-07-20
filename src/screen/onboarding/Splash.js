
import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, View, Image, StatusBar, ImageBackground } from 'react-native';
import {
  BarIndicator,
} from 'react-native-indicators';
import {
  MaterialIndicator,
} from 'react-native-indicators';
import messaging from '@react-native-firebase/messaging';
import {getIsFirstTime} from '../../utilities'

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      loading: false,
      token: "",

    };
  }
  async componentDidMount() {
  this.checkPermission();
    setTimeout(() => {
      this.lunch();
    }, 3000);
  }
  async lunch() {

    if (await getIsFirstTime() == "No") {
      this.initPage();
    } else {
      this.props.navigation.replace('intro')
     
    }

  }


  getUser() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.getSessionId(value)
    })
  }

  getSessionId(user) {

    this.setState({ loading: true, })


    fetch('https://www.ofidy.com/dev-mobile/v1/api.php?code=customer&action=getSessionId&userid=' + user, {
      method: 'Get', headers: {
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState({ loading: false })
          AsyncStorage.setItem("session_id", res.sid);
          this.props.navigation.replace('home')
        } else {
          this.props.navigation.replace('home')
        }

      }).catch((error) => {
        this.setState({ loading: false })
        this.props.navigation.replace('welcome')
      });
  }

  initPage = () => {
    
    AsyncStorage.getItem('aut').then((value) => {
      if (value == 'yes') {
        //this.getUser();
        this.props.navigation.navigate('home')
      } else if (value == null) {
        this.props.navigation.navigate('welcome')
      } else {
        this.props.navigation.navigate('welcome')
      }

    }) 

  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      this.getToken()
      console.log('Authorization status:', authStatus);
    }

  }

  
  async checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      console.warn('enabled');
      this.getToken();
    } else {
      console.warn('not enabled');
      this.requestUserPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.warn(fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.warn(fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.warn(fcmToken);
        this.setState({ token: fcmToken })
      }
    } else {
      this.setState({ token: fcmToken })
    }
  }


  render() {
    return (
      <ImageBackground
        style={{
          flex: 1
        }}
        source={require('../../assets/bg.png')}>
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')} />

          <View style={{ height: 50 }}>
            {this.state.loading ? <MaterialIndicator color='#004701' /> : null}

          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 120,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
});
