// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, BackHandler, StatusBar, ActivityIndicator, Platform, View, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Text, Right, Button, Left, } from 'native-base';
import {
  BarIndicator,
} from 'react-native-indicators';
import { WebView } from 'react-native-webview';
import { Icon, } from 'react-native-elements';

import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import {
  MaterialIndicator,
} from 'react-native-indicators';
//import ProgressWebView from "react-native-progress-webview";
import { Toast, } from 'native-base';

const URL = require("../../component/server");
import Navbar from '../../component/Navbar';
import colors from '../../component/color';
import Utils from './../../component/Utils'
import EnterQuantity from '../../component/View/EnterQuantity';
import EnterColor from '../../component/View/EnterColor';
import EnterSize from '../../component/View/EnterSize';

const searchEngines = {
  'google': (uri) => `https://www.google.com/search?q=${uri}`,
  'duckduckgo': (uri) => `https://duckduckgo.com/?q=${uri}`,
  'bing': (uri) => `https://www.bing.com/search?q=${uri}`
};

const WEBVIEW_REF = 'webview';
const TEXT_INPUT_REF = 'urlInput';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.state = {
      data: '',
      status: '',
      currentUrl: Utils.sanitizeUrl('https://ofidyshopping.azurewebsites.net/shopping-browser.php'),
      url: Utils.sanitizeUrl('https://ofidyshopping.azurewebsites.net/shopping-browser.php'),
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      homeButtonEnabled: true,
      loading: true,
      scalesPageToFit: true,
      urlText: '',
      aut: '',
      user_id: '',
      session_id: '',
      qty: 1,
      color: 'default',
      size: 'default',
      loading_addcart: false,
      progress: true,
      can_goBack: false,
      show_quantity: false,
      show_color: false,
      show_sizeL: true
    };
    this.inputText = '';

  }


  upgradeURL(uri, searchEngine = 'google') {
    const isURL = uri.split(' ').length === 1 && uri.includes('.');
    if (isURL) {
        if (!uri.startsWith('http')) {
            return 'https://www.' + uri;
        }
        return uri;
    }
    // search for the text in the search engine
    const encodedURI = encodeURI(uri);
    return searchEngines[searchEngine](encodedURI);
}

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if (this.state.backButtonEnabled) {
      this.refs[WEBVIEW_REF].goBack();

    } else {
      Platform.OS === 'android' ?
        BackHandler.exitApp()
        :
        exit(9)
    }
    return true;
  }

  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.gBack.bind(this))
  // }


  componentDidMount() {
    this.setState({ id: this.props.id });
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ 'user_id': value.toString() })
    })
    AsyncStorage.getItem('session_id').then((value) => {
      this.setState({ 'session_id': value.toString() })
    })
    AsyncStorage.getItem('aut').then((value) => {
      this.setState({ 'aut': value.toString() })
    })

    setTimeout(() => {
      this.setState({ progress: false })
    }, 9000);
  }
  addTocart() {
    const { data, aut, user_id, session_id, qty, color, size, } = this.state
    this.setState({ is_visible_choose_color: false, })



    this.setState({ loading_addcart: true, show_size:false })

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('session_id', session_id);
    formData.append('quantity', qty);
    formData.append('size', size);
    formData.append('colour', color);

    formData.append('url', data.url);
    formData.append('ttl', data.title);
    formData.append('app', Platform.OS);
    formData.append('guestlogin', 0);

    console.warn(formData)

    fetch('https://ofidyshopping.azurewebsites.net/asp_files/write_text.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.text())
      .then(res => {
        console.warn(res);
        if (res.includes("Success")) {
          this.setState({ loading_addcart: false })
          Alert.alert('Success', 'Thank you.'+ data.title+' has been submitted, and should appear in your cart within the next 2-3 minutes', [{ text: 'Okay' }])
        } else {
          Alert.alert('Action Fail', 'Please try to add your item to cart again', [{ text: 'Okay' }])
          this.setState({ loading_addcart: false })
        }
      }).catch((error) => {
        console.warn(error);
        this.setState({ loading_addcart: false })
        alert(error.message);
      });

  }


  gBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  goForward() {
    this.refs[WEBVIEW_REF].goForward();
  }

  goHome() {
    this.load(this.props.url);
  }


  home() {
    this.setState({ url: 'https://m.ofidy.com/shopping-browser.php' })
  }


  cart() {
    this.props.navigation.navigate('cart')

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
      // currentUrl: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true,
      data: navState
    });

    if (navState.url.includes('shopping-cart.php?user_id=')) {
      this.setState({ currentUrl: 'https://www.ofidy.com/' });
    } else {
      this.setState({
        currentUrl: navState.url
      });
    }


  }

  handleTextInputChange(event) {
   // const url = Utils.sanitizeUrl(event.nativeEvent.text);
    //this.inputText = url;
   // 
   const url =event.nativeEvent.text
    this.setState({ urlText: url })
  }

  onSubmitEditing() {
    var nre = this.state.urlText;
    const newURL = this.upgradeURL(nre, 'google');
    const url = Utils.sanitizeUrl(newURL);
    this.setState({ url: url })
  }



  render() {
    return (
      <View style={{ flex: 1 }}>

        <StatusBar backgroundColor={colors.primary_color} barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={styles.toolbar}>
            <View style={{ height: 36, width: 30, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon
                  name="menu"
                  type='entypo'
                  color='#fff'
                  size={20}
                />

              </TouchableOpacity>
            </View>


            <TextInput
              selectTextOnFocus
              ref={TEXT_INPUT_REF}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize='none'
              autoCorrect={false}
              style={styles.urlinput}
              defaultValue={this.state.currentUrl}
              onSubmitEditing={this.onSubmitEditing}
              onChange={this.handleTextInputChange}
              clearButtonMode="while-editing"
            />
            <View style={{ height: 36, width: 30, justifyContent: 'center', alignItems: 'center' }}>
              {this.state.loading ?
                <View style={{ marginLeft: 10, }}>
                  <ActivityIndicator size="small" color="#fff" />
                </View> :
                <TouchableOpacity onPress={() => this.reload()} style={{ marginLeft: 10 }}>
                  <Icon
                    active
                    name="refresh"
                    type='material-community'
                    color='#fff'
                  />

                </TouchableOpacity>
              }
            </View>
          </View>
          <WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{ uri: this.state.url }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
          />

          <View style={{ backgroundColor: '#004701', flexDirection: 'row', height: 45 }}>


            <View style={{ alignSelf: "center", marginLeft: 10 }}>
              <TouchableOpacity onPress={() => this.gBack()}>
                <Icon
                  active
                  name="left"
                  type='antdesign'
                  color='#D3D3D3'
                />

              </TouchableOpacity>

            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: "center", }}>
              <TouchableOpacity onPress={() => this.cart()} style={{ marginRight: 30 }}>
                <Icon
                  active
                  name="shoppingcart"
                  type='antdesign'
                  color='#D3D3D3'
                />

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.home()}>
                <Icon
                  active
                  name="home"
                  type='antdesign'
                  color='#D3D3D3'
                  size={30}

                />
              </TouchableOpacity>



              {this.state.loading ?
                <View style={{ marginLeft: 30 }}>
                  <ActivityIndicator size="small" color="#fff" />
                </View> :
                <TouchableOpacity onPress={() => this.reload()} style={{ marginLeft: 30 }}>
                  <Icon
                    active
                    name="refresh"
                    type='material-community'
                    color='#fff'
                  />

                </TouchableOpacity>
              }


            </View>


            <View style={{ alignSelf: "center", marginRight: 10 }}>
              <TouchableOpacity onPress={() => this.goForward()}>

                <Icon
                  active
                  name="right"
                  type='antdesign'
                  color='#D3D3D3'
                />
              </TouchableOpacity>
            </View>
          </View>


        </View>

        {
          this.state.loading_addcart ?

            <TouchableOpacity style={styles.fabButton} >
              <MaterialIndicator color='white' />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.setState({ show_quantity: true })} style={styles.fabButton} >
              <Icon
                active
                name="cart-plus"
                type='font-awesome'
                color='#fff'
                size={25}
              />
            </TouchableOpacity>

        }
        {this.state.show_quantity ? this.renderEnterQuantity() : null}
        {this.state.show_color ? this.renderEnterColor() : null}
        {this.state.show_size ? this.renderEnterSize() : null}
      </View>

    );
  }

  onShouldStartLoadWithRequest(event) {

  }

  onNavigationStateChange(navState) {


  }


  renderEnterQuantity() {
    return (
      <EnterQuantity
        onSelect={(value) => this.onQuantity(value)}
        onClose={() => this.setState({ show_quantity: false })} />
    )
  }

  onQuantity(value) {
    this.setState({
      qty: value,
      show_quantity: false,
      show_color: true
    })
  }


  renderEnterColor() {
    return (
      <EnterColor
        onSelect={(value) => this.onColor(value)}
        onClose={() => this.setState({ show_color: false })} />
    )
  }

  onColor(value) {
    this.setState({
      color: value,
      show_color: false,
      show_size: true
    })
  }


  renderEnterSize() {
    return (
      <EnterSize
        onSelect={(value) => this.onSize(value)}
        onClose={() => this.setState({ show_size: false })} />
    )
  }


  onSize(value) {
    this.setState({
      size: value,
      show_size: false,
    })
    this.addTocart()
  }
}


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

    padding: 6,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'left',
    fontSize: 14
  },
  toolbar: {
    height: 80,
    padding: 5,
    paddingTop: 25,
    backgroundColor: '#004701',

    flexDirection: 'row',
    alignItems: 'center',
  },
  fabButton: {
    height: 60,
    width: 60,
    borderRadius: 200,
    position: 'absolute',
    bottom: 55,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004701',
  },
  input: {
    height: 45,
    color: '#3E3E3E',
    paddingLeft: 15,
    marginHorizontal: 25,
    marginBottom: 20,
    borderColor: '#000000',
    borderWidth: 0.8,
    borderRadius: 20,
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



