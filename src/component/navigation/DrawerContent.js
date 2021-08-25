import React, { useState, useEffect } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { ImageBackground, Platform, StyleSheet, Image, Text, Dimensions, TouchableOpacity, View } from 'react-native';

import colors from '../color';
import { Icon, Avatar } from 'react-native-elements'
import { getAccountType, getUser } from '../../utilities';

export function DrawerContent(props) {

    const [level, setLevel] = useState('1')
    const [user, setUser] = useState({ firstName: " ", lastName: '' })
    const readData = async () => {
        try {
            const userAge = await getAccountType()
            const userD = await getUser()
            if (userAge !== null) {
                setLevel(userAge)
            }
            if (userD !== null) {
                setUser(JSON.parse(userD))
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }
    useEffect(() => {
        readData()
    }, [])
    return (
        <ImageBackground
            style={{
                flex: 1
            }}
            source={require('../../assets/bg.png')}>
            <View style={{ flex: 1, }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            {renderSettingHeader(props, level, user)}
                        </View>
                        <View style={styles.drawerSection}>
                            {renderSettingsMenu(props, level)}
                        </View>
                    </View>
                </DrawerContentScrollView>

            </View>
        </ImageBackground>
    );
}


const renderSettingHeader = (props, level, user) => {

    return (

        <View style={{ backgroundColor: colors.primary_color + '95', height: 170, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{}}>
                <Avatar
                    rounded
                    size="large"
                    overlayContainerStyle={{}}
                    source={{ uri: "data:image/png;base64,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" }}
                />

            </View>
            <Text style={{ color: colors.white, fontSize: 12, fontFamily: 'NunitoSans-Bold', }}>{user.firstName} {user.lastName}</Text>
            <Text style={{ color: colors.white, fontSize: 10, fontFamily: 'NunitoSans-Regular', }}>Customer </Text>
        </View>



    )
}


const renderSettingsMenu = (props, level) => {


    return (
        <View style={{
            flex: 1,
            height: Dimensions.get('window').height,
        }}>


            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.drawerMenuItem}>
                <View style={{}}>
                    <Icon
                        name={'home'}
                        type='entypo'
                        size={25}
                        color={colors.primary_color}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                    <Text style={{ color: colors.primary_color, fontSize: 15, fontFamily: 'NunitoSans-Bold', }}>Home</Text>
                </View>
            </TouchableOpacity>


            {/* <TouchableOpacity onPress={() =>console.warn('k')} style={styles.drawerMenuItem}>
                <View style={{}}>
                    <Icon
                        name={'user'}
                        type='entypo'
                        size={25}
                        color={colors.primary_color}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                    <Text style={{ color: colors.primary_color, fontSize: 15, fontFamily: 'NunitoSans-Bold', }}>Account </Text>
                </View>
            </TouchableOpacity> */}


            <TouchableOpacity onPress={() => props.navigation.navigate('Messages')} style={styles.drawerMenuItem}>
                <View style={{}}>
                    <Icon
                        name="wechat"
                        type='font-awesome'
                        size={25}
                        color={colors.primary_color}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                    <Text style={{ color: colors.primary_color, fontSize: 15, fontFamily: 'NunitoSans-Bold', }}>Messages </Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() =>  props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                        })
            
            } style={styles.drawerMenuItem}>
                <View style={{}}>
                    <Icon
                        name={'logout'}
                        type='antdesign'
                        size={25}
                        color={colors.primary_color}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                    <Text style={{ color: colors.primary_color, fontSize: 15, fontFamily: 'NunitoSans-Bold', }}>Logout </Text>
                </View>
            </TouchableOpacity>

            {level == '3' || level == '4'  || level == '5' || level == '6' ?
                <TouchableOpacity onPress={() => props.navigation.navigate('Shoppers')} style={styles.drawerMenuItem}>
                    <View style={{}}>
                        <Icon
                            name={'list'}
                            type='entypo'
                            size={25}
                            color={colors.primary_color}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                        <Text style={{ color: colors.primary_color, fontSize: 15, fontFamily: 'NunitoSans-Bold', }}>Shoppers </Text>
                    </View>
                </TouchableOpacity>
                :
                null
            }

            {level == '3' || level == '4'  || level == '5' ?
                <TouchableOpacity onPress={() => props.navigation.navigate('Backoffice')} style={styles.drawerMenuItem}>
                    <View style={{}}>
                        <Icon
                            name={'list'}
                            type='entypo'
                            size={25}
                            color={colors.primary_color}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
                        <Text style={{ color: colors.primary_color, fontSize: 15, fontFamily: 'NunitoSans-Bold', }}>Backoffice </Text>
                    </View>
                </TouchableOpacity>
                :
                null
            }


        </View>
    )
}



const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        backgroundColor: colors.secondary_color,
        borderBottomRightRadius: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {

    },

    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    drawerMenuItem: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 15,
        paddingTop: 15
    },
});