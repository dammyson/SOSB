/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, StatusBar, Alert } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Picker, ListItem, Body, Radio, Input, Item } from 'native-base';
import { RadioButton } from 'react-native-paper';

// Our custom files and classes import
import { BaseUrl, getUserID, getSessionID, getCurrency, makeOrderId, getEmail } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';


export default class PayPalTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            aut: '',
            user_id: '',
            session_id: '',
            currency: '',
            shipreq: "null",
            amount:10,
            data:'',
            email:''
            
        };
    }

    async componentWillMount() {
        const { paymentDetails, paymentinfo } = this.props.route.params;
        console.warn( paymentDetails, paymentinfo );
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
            currency: await getCurrency(),
            email: await getEmail(),
            amount: paymentinfo.fullBill
        });
    }

   


    componentDidMount() {

    }



    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

      pay(res) {

      
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
                <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} right={right} title="Rave" />
                <Content padder>
                    <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20, }}>

                      <TouchableOpacity  onPress={()=> this.pay()}>
                          <Text>Pay</Text>
                      </TouchableOpacity>

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
