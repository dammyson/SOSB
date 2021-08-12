

import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Text } from 'native-base';
import colors from './color';
import { View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { setCurrency, getCurrency } from '../utilities';

export default class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
    };
  }

  async componentWillMount() {
    this.setState({ currency: await getCurrency() })
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = (curr) => {
    const { onCurrencyChange } = this.props
    this.setState({ currency: curr })
    setCurrency(curr);
    onCurrencyChange(curr);
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    const { title, left, right } = this.props
    return (
      <View style={{ backgroundColor: colors.primary_color }}>
        <View style={styles.header}>
          <View style={{
           
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
            marginLeft: 20,

          }}>
            {left}
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
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
    marginTop: 15,
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
    fontFamily: "NunitoSans-Bold",
  },
  currency_text: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: "NunitoSans-Bold",
  },
};

