/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, StatusBar, Alert } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import { RadioButton } from 'react-native-paper';

// Our custom files and classes import
import { BaseUrl, getUserID, getSessionID, getCurrency, getPaystackKey, getEmail } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';

import RNPaystack from 'react-native-paystack';
RNPaystack.init({ publicKey: getPaystackKey()});




export default class Paystack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            aut: '',
            user_id: '',
            session_id: '',
            cv: '',
            ex: '',
            cn: '',
            currency: '',
            shipreq: "null",
            amount:10,
            data:'',
            email:''
            
        };
    }

    async componentWillMount() {
        const { paymentDetails, paymentinfo } = this.props.route.params;
        console.warn( paymentDetails );
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
            currency: await getCurrency(),
            email: await getEmail(),
            amount: paymentinfo.fullBill
        });
    }


    currencyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    handleChange = (text) => {

        let textTemp = text;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0];
            } else if (this.state.ex.length === 1) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        this.setState({ ex: textTemp })
    }


    componentDidMount() {

    }


    chargeCard() {

        const { cn, ex, cv, amount, data, email } = this.state

        var card_lenghts = [16, 17, 18, 19, 20];
        if (!card_lenghts.includes(cn.length)) {
            Alert.alert('Operation failed', 'Invalide card number, remove spaces if present', [{ text: 'Okay' }])
            return
        }


        if (!ex.includes('/')) {
            Alert.alert('Operation failed', 'Invalide Expiry date', [{ text: 'Okay' }])
            return
        }
        if (cv.length != 3) {
            Alert.alert('Operation failed', 'Invalide card cvv', [{ text: 'Okay' }])
            return
        }
    
        var res = ex.split("/");
        this.setState({ loading: true })
        RNPaystack.chargeCard({
            cardNumber: cn,
            expiryMonth: res[0],
            expiryYear: res[1],
            cvc: cv,
            email: email,
            amountInKobo: amount * 100,
        })
            .then(response => {
                console.warn(response); // card charged successfully, get reference here
                this.processPostPayment(response)
            })
            .catch(error => {
                this.setState({ loading: false })
                console.warn(error);
                Alert.alert('Process failed', error.message, [{ text: 'Okay' }])// error is a javascript Error object
            })

    }


    processPostPayment(res) {

    const { session_id, user_id, currency } = this.state
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('code', "order");
    formData.append('action', "paystackVerify");
    formData.append('sid', session_id);
    formData.append('id', user_id);
    formData.append('ref', res.reference);
    formData.append('prf',currency);


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
            var result = res.message.split(":");
            AsyncStorage.setItem("session_id", result[1]);
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
            <Container style={{ backgroundColor: '#fdfdfd' }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
                <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} right={right} title="PAYSTACK" />
                <Content padder>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20, }}>

                        <Text style={styles.actionbutton}>CARD NUMBER</Text>
                        <View regular style={styles.item}>
                            <Input placeholder='CARD NUMBER' keyboardType='numeric' onChangeText={text => this.setState({ cn: text })} placeholderTextColor="#687373" style={styles.input} />
                        </View>

                        <Text style={styles.actionbutton}>EXP</Text>
                        <View regular style={styles.item}>
                            <Input placeholder='01/01' keyboardType='numeric' onChangeText={this.handleChange} defaultValue={this.state.ex} maxLength={5} placeholderTextColor="#687373" style={styles.input} />
                        </View>

                        <Text style={styles.actionbutton}>CVV</Text>
                        <View regular style={styles.item}>
                            <Input placeholder='CVV' keyboardType='numeric' onChangeText={text => this.setState({ cv: text })} placeholderTextColor="#687373" style={styles.input} />
                        </View>


                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>

                        <View>
                            <Button onPress={() => this.chargeCard()} style={styles.buttonContainer} block iconLeft>
                                <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Pay NGN {this.currencyFormat(this.state.amount)} </Text>
                            </Button>
                        </View>

                    </View>
                </Content>

            </Container>
        );
    }




}

const styles = StyleSheet.create({
    input: {
        height: 38,
        borderColor: '#3E3E3E',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'red',
        backgroundColor: colors.grey,
        fontFamily: 'NunitoSans-Regular',
        fontSize: 12,
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 10,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'NunitoSans-Regular'
    },
    buttonContainer: {
        backgroundColor: colors.primary_color,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        marginTop: 10,
    },
    item: {
        height: 45,
        flexDirection: 'row',
        borderColor: '#8d96a6',
        borderWidth: 0.6,
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,

    },
    itemtwo: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 10,

    },
});
