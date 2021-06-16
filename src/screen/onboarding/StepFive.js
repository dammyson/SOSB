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



export default class StepFive extends React.Component {


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
            <Image source={images.five} style={styles.imageStyle} />
          </View>


         
          <View style={{ height: 60, alignItems: 'flex-end',  }}>
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
  
    justifyContent: 'center',

  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode:'contain',
    height: height * 0.9
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
    color: colors.primary_color,
    fontFamily: 'Montserrat-Medium'
  },

  skipRegion: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },

  skipText: {
    fontSize: 15,
    color: colors.primary_color,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20
  },

  nextIconStyle: {
    color: "red",
    fontSize: 20,
    marginHorizontal: 8
  }
});
