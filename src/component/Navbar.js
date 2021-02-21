

import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Text } from 'native-base';
import colors from '../component/color';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { setCurrency, getCurrency } from '../utilities';

export default class Navbar extends Component {

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
            <Menu
              ref={this.setMenuRef}
              style={{ width: 80 }}
              button={

                <TouchableOpacity onPress={this.showMenu} style={{ flexDirection: 'row' }}>
                  <View style={{ borderWidth: 1,  flexDirection: 'row', borderColor: '#fff', borderRadius: 3, alignItems:'center', paddingRight:5 }}>
                    <Text style={styles.currency_text}>{this.state.currency}</Text>
                    <Icon
                    name="caretdown"
                    size={10}
                    type='antdesign'
                    color={'#fff'}
                  />
                  </View>
                 
                </TouchableOpacity>
              }
            >
              <MenuItem onPress={() => this.hideMenu("NGN")}>NGN</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => this.hideMenu("USD")}>USD</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => this.hideMenu("GBP")}>GBP</MenuItem>
            </Menu>
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

