// React native and others libraries imports
import React, { Component } from 'react';
import { FlatList, Dimensions, View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Easing, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import colors from '../color';

export default class EnterSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            value: "Default",


        };

    }

    componentDidMount() {


        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
        }).start();

    }

    render() {
        const { onClose } = this.props;
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#00000040',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >

                    <Animatable.View style={{ height: Dimensions.get('window').height / 3, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }} animation="fadeInUpBig" >

                        <View style={{ height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width - 50, }} >
                            <View style={styles.body_top}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                    <TouchableOpacity onPress={() => onClose()}>


                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 14, margin: 7, flex: 1, fontFamily: 'NunitoSans-Bold', color: '#fff', textAlign: 'center', marginRight: 10 }}>Add Color</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 25 }}>
                                    <TouchableOpacity onPress={() => onClose()}>
                                        <Icon
                                            name="closecircle"
                                            size={20}
                                            type='antdesign'
                                            color={colors.white}
                                        />

                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.body}>
                                <View style={{ marginTop: 30, marginLeft: 30, marginRight: 30 }}>

                                </View>

                                <View style={{ paddingTop: 1, flexDirection: 'row', alignItems: 'center', }}>
                                    <View style={{ paddingTop: 1, flex: 1 }}>
                                        <TextInput
                                            selectTextOnFocus
                                            defaultValue={this.state.value}
                                            value={this.state.count}
                                            placeholderTextColor='#3E3E3E'
                                            returnKeyType="next"
                                            onSubmitEditing={() => console.warn('')}
                                            keyboardType='numeric'
                                            style={styles.input}
                                            onChangeText={text => this.setState({ gty: text })}

                                        />

                                    </View>

                                   
                                </View>
                                <TouchableOpacity onPress={() => this._handleCategorySelect()} style={styles.proceed_btn}    >


                                    <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>

                                </TouchableOpacity>


                            </View>
                        </View>
                    </Animatable.View>

                </View>
            </>
        )
    }



    _handleCategorySelect = () => {
        const { onSelect, } = this.props;
        onSelect(this.state.value);
    }

}



EnterSize;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        position: "absolute",
        top: 40,
        left: 30,
        bottom: 0,
        right: 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    body_top: {
        backgroundColor: colors.primary_color,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexDirection: 'row'

    },

    body: {
        flex: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#fff'
    },

    input: {
        height: 45,
        color: '#3E3E3E',
        paddingLeft: 15,
        marginHorizontal: 25,
        borderColor: '#000000',
        borderWidth: 0.8,
        fontSize: 14,
        borderRadius: 10,
    },
    proceed_btn: {
        padding: 15,
        marginHorizontal: 20,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#004701',
    },

});

