import React from 'react'
import { StyleSheet, Text, Dimensions, ImageBackground, View, } from 'react-native'
import PropTypes from 'prop-types';
import {
    BarIndicator,
} from 'react-native-indicators';

const width = Dimensions.get('window').width


const ActivityIndicator = ({ name, message, color }) => {
    return (
        <ImageBackground
        style={{
         flex:1
        }}
        source={require('../../assets/bg.png')}>
        <View style={styles.backgroundImage}>
            <View style={styles.welcome}>
                <Text style={{ fontSize: 13, color: color }}>{message}</Text>
                <BarIndicator count={4} color={color} />
                <Text style={{ fontSize: 11, flex: 1, color: color }}>Please wait...</Text>
            </View>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
    },
    welcome: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ActivityIndicator