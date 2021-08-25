// React native and others libraries imports
import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, TextInput, ImageBackground,Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, } from 'native-base';
import { Icon, } from 'react-native-elements';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import { BaseUrl, getUserID, getSessionID, getCurrency, getEmail } from '../../utilities';

import ActivityIndicator from '../../component/View/ActivityIndicator';

export default class NoReciever extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'gggg',
            user_id: '',
            session_id: '',
            message_info: ""
        };
    }

    async componentWillMount() {
       
        this.setState({
            user_id: await getUserID(),
            session_id: await getSessionID(),
        });
    }


    proceedRating() {
        const {message, user_id, session_id}=this.state
        this.setState({ loading: true })
        const formData = new FormData();

        formData.append('code', "customer");
        formData.append('action', "sendchatwithoutreceiver");
        formData.append('msg', message);
        formData.append('outgoingmsgid', user_id);

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
                    })

                    Alert.alert(
                        'Operation Sucessful',
                        'Please check back in few minutes your message will be Attended to by one of our agents',
                        [
                          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                          { text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                      )

                   
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
        var left =(
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <Icon
                name="arrowleft"
                size={20}
                type='antdesign'
                color={colors.white}
            />
        </TouchableOpacity>
        )


        if (this.state.loading) {
            return (
                <ActivityIndicator color={colors.primary_color} message={'Getting Conversations'} />
            );
        }
        return (
            <ImageBackground
            style={{
                flex: 1
            }}
            source={require('../../assets/bg.png')}>
            <Container style={{ backgroundColor: 'transparent' }}>
                    <Navbar left={left} title="New Message" />
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.primary_color} />
                <Content>
                    <View style={styles.body}>
                      
                        <View style={styles.mainbody}>
                            <View style={{ marginLeft: 2, borderRadius: 10, marginTop: 10, marginBottom: 80, width: Dimensions.get('window').width, backgroundColor: "#fff" }}>
                                
                                <View style={{ marginRight: 25, marginLeft: 25, }}>
                                    <View style={styles.textAreaContainer} >
                                        <TextInput
                                            style={styles.textArea}
                                            underlineColorAndroid="transparent"
                                            placeholder="Comment"
                                            placeholderTextColor={colors.primary_color}
                                            placeholderTextColor="gray"
                                            numberOfLines={5}
                                            multiline={true}
                                            onChangeText={text => [this.setState({ message: text})]}
                                        />
                                    </View>
                                </View>

                               
                                <View style={{}}>
                                <TouchableOpacity  onPress={()=> this.proceedRating()} style={styles.buttonContainer}>
                                        <Text style={styles.button_text}>Next</Text>
                                    </TouchableOpacity>
                                </View>

                              
                            </View>

                        </View>

                    </View>
                </Content>
            </Container>
            </ImageBackground>
        );
    }



}

const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
   
    buttonContainer: {
        height: 55,
        backgroundColor:  colors.primary_color,
        marginLeft: 25,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20
    },
    button_text: {
        fontSize: 13,
        marginLeft: 12,
        color:  colors.white,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    textAreaContainer: {
        height: 105,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor:  colors.white,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 15,
        borderColor: colors.primary_color,
        borderWidth: 0.5,
        justifyContent: 'center',
    },
    textArea: {
        height: 75,
        justifyContent: "flex-start",
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
    }


});

