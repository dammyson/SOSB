// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, View, Dimensions, TouchableOpacity, Image, StyleSheet , AsyncStorage} from 'react-native';
import { Container, Content, Text, Icon, Button, Left, } from 'native-base';

import {
  getLocation,
} from '../../utilities/locationService';

import Navbar from '../../component/Navbar';
import color from '../../component/color';
import colors from '../../component/color';


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


  

  

  render() {
  
  
    return (
        <Container style={{ backgroundColor: 'transparent' }}>
        
          <Content>
            <View style={styles.body}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')} />
           </View>
              <Text style={{ color: colors.primary_color, margin: 20, fontWeight: '900', fontSize: 25, }}>Sign In </Text>
              <View style={styles.bottom}>

              
                    <View>
                      <Button onPress={() => this.requestLocationPermission()} style={styles.buttonContainer} block iconLeft>
                        <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>SIGN IN </Text>
                      </Button>

                      <Button onPress={() =>this.props.navigation.navigate('reg')}  style={styles.whiteButtonContainer} block iconLeft>
                        <Text style={{ color: colors.primary_color,fontWeight: '600' }}>SIGN UP </Text>
                      </Button>
                    </View>



              </View>

              <View style={{height:100}}></View>

            </View>
          </Content>
        </Container>
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
    borderColor:colors.primary_color,
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
    paddingLeft:15,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    borderColor: '#000000',
    borderWidth: 0.8,
    borderRadius:20,
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



