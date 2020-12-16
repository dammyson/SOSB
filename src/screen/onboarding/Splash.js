
import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, View, Image, StatusBar, ImageBackground } from 'react-native';
import {
    BarIndicator,
} from 'react-native-indicators';
import {
  MaterialIndicator,
} from 'react-native-indicators';

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      loading: false

    };
  }
    async componentDidMount() {
      setTimeout(() => {
   this.initPage();
          }, 3000);
    }
    getUser(){
      AsyncStorage.getItem('user_id').then((value) => {
        this.getSessionId(value)
      })
    }

    getSessionId(user) {

      this.setState({ loading: true, })
  
  
      fetch('https://www.ofidy.com/dev-mobile/v1/api.php?code=customer&action=getSessionId&userid='+user, { method: 'Get',  headers: {
        Accept: 'application/json',
      }, 
      })
      .then(res => res.json())
      .then(res => {
        if(!res.error){
          this.setState({ loading: false})
          AsyncStorage.setItem("session_id", res.sid);
          this.props.navigation.navigate('home')
        }else{
          this.props.navigation.navigate('home')
        }
       
      }).catch((error)=>{
        console.warn(error);
        this.setState({ loading: false})
        alert(error.message);
     });
    }

    initPage = () => {
     
        AsyncStorage.getItem('aut').then((value) => {
          if(value=='yes'){
            this.getUser();
          }else if(value==null){
            this.props.navigation.navigate('welcome')
          }else{
            this.props.navigation.navigate('welcome')
          } 
            
        })
       
      }

    render() {
        return (
            <View style={styles.container}>
               <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
              <Image
          style={styles.logo}
          source={require('../../assets/logo.png')} />

          <View style={{height:50}}>
            {this.state.loading ?  <MaterialIndicator color='#004701' />: null }
           
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo:{
        width:300,
        height:120,
        justifyContent: 'center',
        resizeMode: 'contain'
    }
});
