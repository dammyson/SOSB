// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TextInput, StatusBar, Platform, View, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Text, Right, Button, Left, } from 'native-base';
import {
    BarIndicator,
} from 'react-native-indicators';
import { WebView } from 'react-native-webview';
import { BaseUrl, getUserID, getSessionID, getCurrency, makeOrderId } from '../../utilities';

import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import Utils from '../../component/Utils'


const WEBVIEW_REF = 'webview';
const TEXT_INPUT_REF = 'urlInput';
export default class Paypal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            status: '',
            currentUrl: Utils.sanitizeUrl('https://www.google.com/'),
            url: Utils.sanitizeUrl('https://www.google.com/'),
            loading: false,
            progress: true
        };
        this.inputText = '';

    }


    async componentDidMount() {
        const { paymentDetails, paymentinfo } = this.props.route.params;
        console.warn(paymentinfo.fullBill);
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
            currency: await getCurrency()
        });
        var address = paymentinfo.addr1 + paymentinfo.addr2 + paymentinfo.addr3 + paymentinfo.city + paymentDetails.billadd.city + paymentDetails.billadd.country;
        var postData = "cmd=_xclick" +
            "&business=" + (await getCurrency() == "USD" ? "93KXD9JD8JVZA" : "DGMYBJ9GE6ZVA") +
            "&lc=GB" +
            "&item_name\" value=\"All items in cart\">\n" +
            "&amount=" + paymentinfo.fullBill +
            "&currency_code=" + await getCurrency() +
            "&button_subtype=services" +
            "&no_note=1" +
            "&no_shipping=1" +
            "&shipping=" + paymentDetails.shippadd.addressLine1 +
            "&bn=PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted" +
            "&custom=" + paymentinfo.invoiceid + "|" + address + "|" + address + paymentinfo.shipBill + "&Z3JncnB0=#/checkout/openButton";

        var url = "https://www.paypal.com/cgi-bin/webscr?";
        console.warn(url + postData);
         this.setState({url: url+postData})

    }







    onShouldStartLoadWithRequest(event) {
        return this.props.onShouldStartLoadWithRequest(event);
    }



    _onNavigationStateChange(navState) {
        console.warn(navState)
        let instant_array = []
        if (navState.url.includes('https://www.paypal.com/webapps/hermes?token=')) {
           
                this.processPostPayment()
          
          } else {
            
          }

    }

    processPostPayment() {

        const { session_id, user_id, currency } = this.state
        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('code', "order");
        formData.append('action', "paypalVerify");
        formData.append('sid', session_id);
        formData.append('id', user_id);

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
              })
              if(res.message == 'Transaction reference not found'){
    
              }else{
                this.props.navigation.navigate('confirm')
              }
             
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
                <ActivityIndicator color={colors.primary_color} message={'Processing payment'} />
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
        var right = (
            <Right style={{ flex: 1 }}>

            </Right>
        );

        return (
            <View style={{ flex: 1 }}>


                <View style={{ flex: 1 }}>
                    <View style={styles.toolbar}>
                    <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} right={right} title="PAYPAL" />

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
                        startInLoadingState={true}
                        scalesPageToFit={this.state.scalesPageToFit}
                    />



                </View>


            </View>
        );
    }

    onShouldStartLoadWithRequest(event) {

    }

    onNavigationStateChange(navState) {


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



