import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';


export default class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  render() {
    return (
      <Swiper style={styles.wrapper}
        index={this.state.index}
        onIndexChanged={(index) => this.onIndexChanged(index)}
        showsButtons={false}
        ref={(swiper) => { this.swiper = swiper; }}
        loop={false}
        showsPagination ={false}
      >
        <View style={styles.slide1}>
          <StepOne
            onSkip={() => this.onSkip()}
            onSignIn={() => this.onSignIn()}
          />
        </View>
        <View style={styles.slide2}>
          <StepTwo
            onSkip={() => this.onSkip()}
            onSignIn={() => this.onSignIn()} />
        </View>
        <View style={styles.slide3}>
          <StepThree
            onStarted={() => this.onStarted()}
            onSignIn={() => this.onSignIn()} />
        </View>
      </Swiper>
    )
  }


  onIndexChanged(ind) {

    this.setState({ index: ind })
  }
  onSkip() {

    if (this.state.index > 1) {
      return
    } else {
      this.swiper.scrollBy(1, true);

    }

  }

  onSignIn() {
    this.props.navigation.navigate('SignIn')
  }

  onStarted() {
    this.props.navigation.navigate('SignIn')
  }
}



const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})