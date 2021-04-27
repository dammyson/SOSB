import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import { Icon } from 'native-base';
import colors from '../../component/color'
import * as images from '../../assets';



export default class StepOne extends React.Component {


  onSwipeLeft() {
    this.props.navigation.navigate("StepTwo")
  }

  render() {
    const { onSkip, onSignIn, } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={'#fff'}
          barStyle="dark-content"
        />
        <View style={{ height:height}}>

          <View style={styles.imageRegion}>
            <Image source={images.search} style={styles.imageStyle} />
          </View>


          <View style={styles.actionRegion}>
            <View style={styles.dotsRegion}>
              <View style={{ height: 10, width: 32, borderRadius: 10, marginHorizontal: 5, backgroundColor: colors.primary_color }} />
              <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: colors.primary_color }} />
              <View style={{ height: 10, width: 10, borderRadius: 10, marginHorizontal: 5, backgroundColor: colors.primary_color }} />

            </View>

            <View style={{ marginTop: 20, marginHorizontal:20, }}>
              <Text style={styles.titleText}> Step one  </Text>
              <Text style={styles.bodyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
            </View>



          </View>
          <View style={{ height: 70, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => onSkip()} style={styles.skipRegion}>
              <Text style={styles.skipText}>Next</Text>

            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  imageRegion: {
    marginTop: 40,
    flex: 1,
    width: width,

  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode:'contain',
    height: height * 0.45
  },
  actionRegion: {
   
    marginTop: 20,

  },
  dotsRegion: {
    width: width - 40,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'flex-start'
  },
  titleText: {
    fontSize: 30,
    color: colors.primary_color,
    fontFamily: 'Poppins-Bold'
  },
  bodyText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: 'Poppins-Medium'
  },

  signInText: {
    fontSize: 15,
    color: "red",
    fontFamily: 'Montserrat-Medium'
  },

  skipRegion: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },

  skipText: {
    fontSize: 15,
    color: "red",
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20
  },

  nextIconStyle: {
    color: "red",
    fontSize: 20,
    marginHorizontal: 8
  }
});
