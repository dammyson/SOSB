// React native and others libraries imports
import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Left, } from 'native-base';
import colors from '../../component/color';
import { Icon, Avatar } from 'react-native-elements';
import Navbar from '../../component/Nav';
import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail } from '../../utilities';
import ActivityIndicator from '../../component/View/ActivityIndicator';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            session_id: '',
            message: '',
            messages: [],
            message_info: ""
        };
    }

    async componentDidMount() {
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
        });


        this.getMessages()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMessages()
        });


    }



    async getMessages() {

        const { user_id, session_id, message_info } = this.state
        console.warn(await getUserID(), session_id);
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('code', "shopper");
        formData.append('action', "viewShopperAssignedtoCustomer");

        formData.append('custid', message_info.user_id);
        console.warn(formData);

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
                        messages: res.data.reverse()

                    })

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
                <ActivityIndicator color={colors.primary_color} message={'Getting Conversations'} />
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
        )

        return (
            <ImageBackground
                style={{
                    flex: 1
                }}
                source={require('../../assets/bg.png')}>
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Navbar left={left} title="Message History" />
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
                    <Content scrollEnabled={false}>
                        <View style={styles.body}>
                            {this.state.messages.length < 1 ?

                                <View style={styles.mainbody}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                        <TouchableOpacity  >
                                            <Icon
                                                name="trash"
                                                size={30}
                                                type='entypo'
                                                color={colors.primary_color}
                                            />
                                        </TouchableOpacity>

                                        <Text style={{
                                            fontSize: 18, fontFamily: 'Montserrat-SemiBold',
                                            marginTop: 15, color: colors.primary_color
                                        }}> No Conversation found</Text>


                                        {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',   marginTop: 15,  justifyContent: 'center', borderColor: colors.primary_color, borderWidth: 1, borderRadius:5 , padding: 10,}}
                                          onPress={() => this.props.navigation.navigate('nr')}>
                                            <Text style={{
                                                fontSize: 18, fontFamily: 'Montserrat-SemiBold',
                                               color: colors.primary_color
                                            }}> Start </Text>
                                            <Icon
                                                name="wechat"
                                                size={20}
                                                type='antdesign'
                                                color={colors.primary_color}
                                            />
                                        </TouchableOpacity> */}
                                    </View>

                                </View>

                                :

                                <View style={styles.mainbody}>
                                    <ScrollView style={{ flex: 1 }}>
                                        <View style={{ flex: 1, }}>
                                            <View style={{ paddingTop: 20 }}>
                                                <View style={{ marginBottom: 10, marginTop: 1, }}>
                                                    {this.renderResuts(this.state.messages)}
                                                </View>
                                            </View>

                                        </View>
                                    </ScrollView>
                                </View>

                            }


                        </View>
                    </Content>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('nr')} style={styles.fabButton} >
                        <Icon
                            active
                            name="wechat"
                            type='antdesign'
                            color='#fff'
                            size={25}
                        />
                    </TouchableOpacity>
                </Container>
            </ImageBackground>
        );
    }

    renderResuts(data) {

        let cat = [];
        for (var i = 0; i < data.length; i++) {
            let id = i;
            cat.push(
                <TouchableOpacity style={styles.list_container} onPress={() => this.props.navigation.navigate('chat')}>
                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                        <Text style={styles.list_text}>{data[i].title}</Text>
                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                            <Text style={styles.time_text}> {data[i].date}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            );
        }
        return cat;
    }

}

const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        paddingBottom: 40
    },

    list_container: {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderBottomColor: colors.white + '40',
        borderBottomWidth: 0.5,
        paddingBottom: 5
    },
    list_text: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        flexDirection: 'row',
        marginTop: 15,
        color: colors.red
    },
    time_text: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        flexDirection: 'row',
        color: colors.primary_color + '60'
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
});

