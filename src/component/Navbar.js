

import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Text } from 'native-base';
import colors from '../component/color';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

export default class Navbar extends Component {
  render() {
    const { title, left, right } = this.props
    return (
      <View style={{ backgroundColor: colors.primary_color }}>
        <View style={styles.header}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
            marginLeft: 20,
           
          }}>
            {left}
            <View style={{  justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
            </View>

            {right}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.primary_color,
  },
  title: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 13,
    marginLeft: 20,
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    fontFamily:"NunitoSans-Bold",
  },
};

