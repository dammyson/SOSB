// React native and others libraries imports
import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, StatusBar, FlatList, Image, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Card, } from 'native-base';
import { Icon, Avatar } from 'react-native-elements';
import colors from '../../component/color';
import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail } from '../../utilities';
import Moment from 'moment';
Moment.locale('en');
const moment = require('moment');

export default class Chat extends Component {
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
        const { message_info } = this.props.route.params;
        console.warn(message_info);
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
            message_info: message_info
        });
        this.getMessages()


    }
ar



    async getMessages() {

        const { user_id, session_id, message_info } = this.state
        console.warn(await getUserID(), session_id);
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('code', "shopper");
        formData.append('action', "viewMessages");

        formData.append('incomingMsgId', message_info.user_id);
        formData.append('outgoingMsgId', message_info.custorm_id);

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


    processSendMessage() {
        const { message } = this.state
        if (message == "") {
            return
        }
        let temp_array = []

        temp_array = this.state.messages
        temp_array[temp_array.length] = {
            MessageChat: message,
            MessageDate: Moment(new Date()).format('llll'),
            type: 'se',
        };
        this.setState({ messages: temp_array })
        this.sendMessage()

    }

    async sendMessage() {

        const { user_id, session_id, message, message_info } = this.state
        console.warn(await getUserID(), session_id);
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('code', "shopper");
        formData.append('action', "AddNewMessage");

        formData.append('incomingMsgId', message_info.user_id);
        formData.append('outgoingMsgId', message_info.custorm_id);
        formData.append('Msg', message);

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
                       // cartItems: res.data
                    })

                    this.getMessages()

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

        return (
            <ImageBackground
                style={{
                    flex: 1
                }}
                source={require('../../assets/bg.png')}>
                <Container style={{ backgroundColor: 'transparent', height: Dimensions.get('window').height, }}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />




                    <View style={{ height: 60, backgroundColor: colors.primary_color }}>
                        <View style={styles.header}>
                            <View style={styles.profile_container}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: 20, }}>
                                    <Icon
                                        name="arrowleft"
                                        size={20}
                                        type='antdesign'
                                        color={colors.white}
                                    />
                                </TouchableOpacity>
                                <View style={{ margin: 2, marginLeft: 20, marginRight: 20 }}>

                                </View>
                                <View style={{ flex: 1, }}>
                                    <Text style={styles.profile_name}>Ofidy care</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginRight: 10 }}>

                                </View>
                            </View>
                        </View>
                    </View>
                    <Content>
                        <View style={styles.body}>


                            <View style={styles.mainbody}>

                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 1, justifyContent: 'flex-start' }}>
                                    <FlatList
                                        style={{ paddingBottom: 5 }}
                                        data={this.state.messages}
                                        renderItem={this.renderItem}
                                        keyExtractor={item => item.id}
                                        ItemSeparatorComponent={this.renderSeparator}
                                        ListHeaderComponent={this.renderHeader}
                                    />
                                </View>

                            </View>

                            <KeyboardAvoidingView style={styles.input_container}>
                                <TouchableOpacity style={{ height: 40, width: 40, marginRight: 10, justifyContent: 'center', alignItems: 'center', borderColor: colors.primary_color, borderRadius: 15, borderWidth: 1 }}>
                                    <Icon
                                        name="camera"
                                        size={20}
                                        type='antdesign'
                                        color={colors.primary_color}
                                    />
                                </TouchableOpacity>
                                <View style={{ height: 40, flex: 1, flexDirection: 'row', borderColor: colors.primary_color, borderRadius: 15, borderWidth: 1 }}>
                                    <TextInput
                                        placeholder="Type message here"
                                        placeholderTextColor={'#bbb'}
                                        returnKeyType="next"
                                        keyboardType='email-address'
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        inlineImageLeft='ios-call'
                                        onSubmitEditing={()=>this.processSendMessage()}
                                        style={{ marginLeft: 10, flex: 1, color: colors.primary_color, fontFamily: 'Montserrat-Medium', fontSize: 12 }}
                                        onChangeText={text => this.setState({ message: text })}

                                    />
                                    <TouchableOpacity onPress={() => this.processSendMessage()} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', marginRight: 10, }}>
                                        <Icon
                                            name="send"
                                            size={20}
                                            type='font-awesome'
                                            color={colors.primary_color}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>


                        </View>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }




    renderItem = ({ item, }) => {
        return (
            <>
                { item.OutgoingMsgID == this.state.user_id ?
                    <View style={[styles.chat_re_container]}>
                        <View>
                            <Text style={styles.re_text}>{item.MessageChat}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
                            <Text style={styles.send_time}>{Moment(item.MessageDate).format('llll')}</Text>
                            </View>

                        </View>
                    </View>
                    :

                    <View style={[styles.chat_send_container]}>
                        <View>
                            <Text style={styles.send_text}>{item.MessageChat}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                <Text style={styles.send_time}>{Moment(item.MessageDate).format('llll')}</Text>
                            </View>

                        </View>
                    </View>}

            </>
        )

    }


}

const ratings_metrics = [
    {
        message: 'Valid Insurances',
        type: 're',


    },
    {
        message: 'Valid Insurances',
        type: 'clock-time-three-outline',

    },
    {
        message: 'Valid Insurances',
        type: 're',


    },
    {
        message: 'Valid Insurances',
        type: 'clock-time-three-outline',

    },
];
const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 70,
    },
    header: {
        paddingTop: 20,
        height: 60,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1

    },
    input_container: {
        marginRight: 15,
        marginLeft: 15,
        flexDirection: 'row',
        marginBottom: 35
    },
    inputtext_container: {
        flexDirection: 'row'
    },
    bodycontainer: {
        backgroundColor: colors.white,
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 15,
        marginVertical: 10
    },
    profile_container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    profile_name: {
        marginTop: 5,
        fontSize: 18,
        color: colors.white,
        textAlign: 'left',
        fontFamily: 'Montserrat-SemiBold'
    },
    profile_about: {
        marginTop: 5,
        fontSize: 10,
        color: colors.white,
        textAlign: 'left',
        fontFamily: 'Montserrat-Medium'
    },

    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4
    },
    chat_re_container: {
        margin: 10,
        borderRadius: 15,
        backgroundColor: colors.primary_color,
        width: Dimensions.get('window').width / 1.3,
        borderTopLeftRadius: 0,
    },
    re_text: {
        marginVertical: 5,
        marginHorizontal: 10,
        marginTop: 7,
        color: colors.white,
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,
    },
    re_time: {
        color: colors.white,
        fontFamily: 'Montserrat-Medium',
        fontSize: 10,
        marginLeft: 17,
    },

    chat_send_container: {
        margin: 10,
        borderRadius: 15,
        backgroundColor: colors.primary_color,
        width: Dimensions.get('window').width / 1.3,
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end'
    },
    send_text: {
        marginVertical: 5,
        marginHorizontal: 20,
        marginTop: 7,
        color: colors.white,
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,
    },
    send_time: {
        color: colors.white,
        fontFamily: 'Montserrat-Medium',
        fontSize: 10,
        marginRight: 17,
    }

});

