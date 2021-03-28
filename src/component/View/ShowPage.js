// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, StatusBar, Platform, View, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Text, Right, Button, Left, } from 'native-base';
import {
  BarIndicator,
} from 'react-native-indicators';

import { Icon, } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import {
  MaterialIndicator,
} from 'react-native-indicators';
//import ProgressWebView from "react-native-progress-webview";
import { Toast, } from 'native-base';

const URL = require("../server");
import Navbar from '../Navbar';
import colors from '../color';
import Utils from '../Utils'


const WEBVIEW_REF = 'webview';
const TEXT_INPUT_REF = 'urlInput';
export default class ShowPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      status: '',
      currentUrl: Utils.sanitizeUrl('https://www.google.com/'),
      url: Utils.sanitizeUrl('https://www.google.com/'),
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      homeButtonEnabled: true,
      loading: true,
      scalesPageToFit: true,
      urlText: '',
      aut: '',
      user_id: '',
      session_id: '',
      is_visible_choose_color: false,
      is_visible_choose_qty: false,
      is_visible_choose_size: false,
      qty: 1,
      color: 'default',
      size: 'default',
      loading_addcart: false,
      progress: true
    };
    this.inputText = '';

  }


  componentDidMount() {
    this.setState({ id: this.props.id });
   
  }



  goBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  goForward() {
    this.refs[WEBVIEW_REF].goForward();
  }

  goHome() {
    this.load(this.props.url);
  }



  reload() {
    this.refs[WEBVIEW_REF].reload();
  }

  onShouldStartLoadWithRequest(event) {
    return this.props.onShouldStartLoadWithRequest(event);
  }



  _onNavigationStateChange(navState) {
    console.warn(navState.canGoBack)
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      currentUrl: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true,
      data: navState
    });

  }


  render() {
    const { url, onClose } = this.props

    return (
      <View style={{
        paddingTop: 2, flex: 1, position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}>


        <View style={{
          paddingTop: 2, borderColor: colors.primary_color, borderWidth: 3, width: Dimensions.get('window').width - 40,
          height: Dimensions.get('window').height - 60,
        }}>

          <WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{ uri: url }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
          />




        </View>

        {

          <TouchableOpacity onPress={() => onClose()} style={styles.fabButton} >
            <Icon
              active
              name="close"
              type='antdesign'
              color='red'
              size={35}
            />
          </TouchableOpacity>

        }

      </View>
    );
  }

  onShouldStartLoadWithRequest(event) {

  }

  onNavigationStateChange(navState) {


  }


}
ShowPage
const styles = StyleSheet.create({
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
    backgroundColor: 'red',
  },
  title: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'NunitoSans-Bold'
  },
  placeholder: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },
  urlinput: {
    height: 36,
    marginTop: 10,
    padding: 6,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'left',
    fontSize: 16
  },
  toolbar: {
    height: 80,
    padding: 14,
    backgroundColor: '#004701',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fabButton: {
    height: 60,
    width: 60,
    borderRadius: 200,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',

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
  proceed_btn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#004701',
  },
  modal: {
    width: Dimensions.get('window').width - 30,
  },
  modal_title: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10,
    marginTop: 5,
  },
  modal_text: {
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 10,
    marginTop: 10,
  },
  placeholder: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },


});



