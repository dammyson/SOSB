// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, ImageBackground, View, Dimensions, TouchableOpacity, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Icon, Button, Left, } from 'native-base';
import {
  BarIndicator,
} from 'react-native-indicators';

const URL = require("../../component/server");

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';


export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.state = {
        loading: false,
        email: "",
        username: "",
    }

}
componentDidMount() {
    AsyncStorage.getItem('email').then((value) => {
        if (value.toString() == '') {
            this.setState({ 'demail': "" })
        } else {

            this.setState({ 'demail': value.toString() })
        }

    })


}

componentWillMount() {
    if (this.props.email) {
        //  this.setState({email: this.props.email});
    }
}



checkLogin() {

    let mail = "";
    const { email, username } = this.state

    if (email == "") {
        Alert.alert('Validation failed', 'Email field cannot be empty', [{ text: 'Okay' }])
        return
    }
    if (username == "") {
        Alert.alert('Validation failed', 'Password field cannot be empty', [{ text: 'Okay' }])
        return
    }

    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('code', "customer");
    formData.append('action', "forgot");
    formData.append('email', email);
    formData.append('username', username);

    fetch('https://www.ofidy.com/dev-mobile/v1/api.php', {
        method: 'POST', headers: {
            Accept: 'application/json',
        }, body: formData,
    })
        .then(res => res.json())
        .then(res => {
            this.setState({ loading: false })
            console.warn(res);
            if (!res.error) {
              Alert.alert('Success', res.data, [{ text: 'Okay' }])
            } else {
                Alert.alert('Operatiob failed', res.message, [{ text: 'Okay' }])
                this.setState({ loading: false })
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


        <Content>
          <View style={styles.body}>
            <View style={styles.top}>
              <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} />
            </View>
            <Text style={{ color: colors.primary_color, margin: 20, fontFamily:"NunitoSans-Bold", fontSize: 20,}}>Forget Password </Text>
            <View style={styles.bottom}>

              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ email: text })}
              />

<TextInput
                placeholder="Enter your username"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() =>this.checkLogin()}
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                inlineImageLeft='ios-call'
                onChangeText={text => this.setState({ username: text })}
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
                      <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Continue </Text>
                    </Button>
                  </View>
              }



              <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30, marginRight: 30 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('login') }>
                  <Text style={{ color: colors.primary_color, fontWeight: '600', fontSize: 13, }}>Back To Login </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', }} />



                <View style={{ width: 1, backgroundColor: colors.primary_color }} />

                <View style={{ flex: 1, justifyContent: 'center', }} />



                <TouchableOpacity onPress={() => this.props.navigation.navigate('reg')}>
                <Text style={{ color: colors.primary_color, fontWeight: '600', fontSize: 13, }}>Create New Account  </Text>
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
  }
});



