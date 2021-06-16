/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, StatusBar, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Header, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';

import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {
    getLocation,
} from '../../utilities/locationService';

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            loading: false,
            currency: '',
            user_id: '',
            session_id: '',
            latitude: 6.5244,
            longitude: 3.3792,
        };
    }

    async componentWillMount() {

        var cordinates = getLocation();
        cordinates.then((result) => {
            this.setState({
                latitude: result.latitude,
                longitude: result.longitude
            });
            console.log(result);
        }, err => {
            console.log(err);
        });


        console.warn(await getEmail())
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
            currency: await getCurrency()
        });


    }








    render() {
        var left = (
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon
                    name="menu"
                    type='entypo'
                    color='#fff'
                />
            </TouchableOpacity>
        );
        return (
            <ImageBackground
                style={{
                    flex: 1
                }}
                source={require('../../assets/bg.png')}>
                <Container style={{ backgroundColor: 'transparent' }}>

                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
                    <Navbar onCurrencyChange={(text) => this.setState({ currency: text })} left={left} title="Shopper's Home" />

                    <View style={{ flex: 1, }}>
                        <View style={{ marginLeft: 10, marginBottom: 5, marginRight: 10, flexDirection: 'row', marginBottom: 5, }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                                {this.renderItem(doctors)}
                            </ScrollView>
                        </View>
                    </View>

                </Container>
            </ImageBackground>
        );
    }

    renderItem(data) {
        let packages = [];
        for (var i = 0; i < data.length; i++) {
            let nna = i;
            packages.push(
                <>
                    <TouchableOpacity onPress={() => this.itemPressed(data[nna])}
                        style={[
                            { marginHorizontal: 20, paddingLeft: 10, marginTop: 15, paddingVertical: 15, paddingRight: 10, flexDirection: 'row', marginBottom: 5, borderRadius: 15 },
                            { backgroundColor: '#fff', shadowColor: 'gray', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1, elevation: 2 }
                        ]}>

                        <View style={{ margin: 2, justifyContent: 'center', borderRadius: 4, marginRight: 20, backgroundColor: '#B7DFF550', height: 40, width: 40 }}>
                            <Icon
                                name={data[i].icon}
                                type={data[i].icon_type}
                                color={colors.primary_color}
                            />
                        </View>

                        <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1, }}>
                            <Text style={{ color: colors.primary_color, fontFamily: 'NunitoSans-ExtraBold', fontSize: 16, marginBottom: 2, marginTop: 2 }}>{data[i].title}</Text>
                            <Text style={{ color: colors.text_inputplace_holder, fontFamily: 'NunitoSans-Regular', fontSize: 16, marginBottom: 2, marginTop: 2 }}>{data[i].details}</Text>
                        </View>



                    </TouchableOpacity>




                </>
            );
        }
        return packages;
    }

    itemPressed(item) {
        console.warn(item)
        this.props.navigation.navigate(item.navigation)
    }



}

const styles = StyleSheet.create({

    buttonContainer: {
        height: 40,
        backgroundColor: colors.primary_color,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    buttonBortherContainer: {
        height: 40,
        borderColor: colors.primary_color,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
});



const doctors = [
    {
        title: 'Completed Sales',
        icon_type: 'font-awesome',
        icon:'cart-arrow-down',
        navigation: 'orders',
        details: 'See Completed sales'
    },


];

