// React native and others libraries imports
import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Left, } from 'native-base';
import { lightTheme } from '../../theme/colors';
import { Icon, Avatar } from 'react-native-elements';
import { borderRadius } from '../../constants'
import StarRating from 'react-native-star-rating';
import * as images from '../../assets/images'
import Navbar from '../../components/Navbar';
export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {

    }
    render() {

        var left = (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Icon
                    name="arrowleft"
                    size={20}
                    type='antdesign'
                    color={lightTheme.DEFAULT_COLOR}
                />
            </TouchableOpacity>
        )

        return (
            <Container>
                <Navbar left={left} title="Message History" />
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={lightTheme.PRIMARY_COLOR} />
                <Content scrollEnabled={false}>
                    <View style={styles.body}>
                        <View style={{ backgroundColor: lightTheme.DEFAULT_COLOR }}>
                            <View style={styles.header}>

                            </View>
                        </View>
                        <View style={styles.mainbody}>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={{ flex: 1, backgroundColor: lightTheme.LIGHT_PURPLE_BACKGROUND }}>
                                    <View style={{ paddingTop: 20 }}>
                                        <View style={{ marginBottom: 10, marginTop: 1, }}>
                                            {this.renderResuts(networks)}
                                        </View>
                                    </View>

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Content>

            </Container>
        );
    }

    renderResuts(data) {

        let cat = [];
        for (var i = 0; i < data.length; i++) {
            let id = i;
            cat.push(
                <TouchableOpacity style={styles.list_container} onPress={()=> this.props.navigation.navigate('chat')}>
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
        backgroundColor: lightTheme.LIGHT_PURPLE_BACKGROUND
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        backgroundColor: lightTheme.PRIMARY_COLOR,
        borderBottomLeftRadius: borderRadius.FIXED_HEADER_BORDER_RADIUS,
        borderBottomRightRadius: borderRadius.FIXED_HEADER_BORDER_RADIUS,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        backgroundColor: lightTheme.LIGHT_PURPLE_BACKGROUND,
        paddingBottom:40
    },

    list_container: {
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderBottomColor: lightTheme.PRIMARY_TEXT_COLOR + '40',
        borderBottomWidth: 0.5,
        paddingBottom: 5
    },
    list_text: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        flexDirection: 'row',
        marginTop: 15,
        color: lightTheme.PRIMARY_TEXT_COLOR
    },
    time_text: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        flexDirection: 'row',
        color: lightTheme.PRIMARY_TEXT_COLOR + '60'
    },
    menu_text: {
        fontSize: 12,
        color: lightTheme.DEFAULT_COLOR,
        textAlign: 'center',
        marginVertical: 15,
        fontFamily: 'Montserrat-Medium'
    },
    menu: {
        backgroundColor: lightTheme.PRIMARY_COLOR,
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: lightTheme.LIGHT_PINK_BACKGROUND,
        borderRadius: borderRadius.FIXED_RATING_BODY_RADIUS,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 10
    },
});

const networks = [
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'voice',
        statu: 'in'


    },
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'video',
        statu: 'in'


    },
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'voice',
        statu: 'out'


    },
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'video',
        statu: 'in'

    },
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'voice',
        statu: 'out'

    },
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'voice',
        statu: 'in'


    },
    {
        title: 'Mr. John Nova',
        date: '5 minutes ago',
        type: 'video',
        statu: 'in'


    },

];

