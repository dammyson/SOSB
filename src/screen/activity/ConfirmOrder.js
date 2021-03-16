/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, ImageBackground } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Item } from 'native-base';


// Our custom files and classes import
import { BaseUrl, getUserID, getSessionID, getCurrency } from '../../utilities';
import colors from '../../component/color';
import Navbar from '../../component/Navbar';
import ActivityIndicator from '../../component/View/ActivityIndicator';
import { Icon, Avatar } from 'react-native-elements';

export default class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentDetails: '',
      bill: '',
      loading: false,
      user_id: '',
      session_id: '',
      currency:''


    };
  }

  async componentWillMount() {
    const { paymentDetails, paymentinfo } = this.props.route.params;
   
    console.warn( paymentDetails, paymentinfo)
    if (paymentDetails) {
      this.setState({ paymentDetails: paymentDetails, paymentinfo: paymentinfo });
      console.warn(paymentDetails.billadd.addressLine1);
    }
   

  }


  async componentDidMount() {
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID(),
      currency: await getCurrency() 
    });

}




  getBill() {
    const { user_id, session_id, paymentDetails } = this.state

    this.setState({ loading: true })

    const formData = new FormData();
    formData.append('code', "order");
    formData.append('action', "getBill");
    formData.append('sid', session_id);
    formData.append('id', user_id);
    formData.append('prf', "NGN");


    console.warn(formData)
    fetch(BaseUrl(), {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
        })
        console.warn(res.data)
        var array = res.data.split(".");
        var array2 = paymentDetails.shipmed.price.split(".");
        console.warn(array[0]);
        if (!res.error) {
          var total = parseInt(array[0]) + parseInt(array2[0])
          this.setState({
            loading: false,
            bill: total
          })

        } else {
          Alert.alert('Operation failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });
  }

  currencyFormat(n) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}


 

  render() {
    const { paymentDetails, paymentinfo } = this.state

    if (this.state.loading) {
      return (
        <ActivityIndicator color={colors.primary_color} message={'Getting Bill'} />
      );
    }


    var left = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
        <Icon
          name="arrowleft"
          size={20}
          type='antdesign'
          color={colors.white}
        />
      </TouchableOpacity>
    );
    var right = (
      <Right style={{ flex: 1 }}>

      </Right>
    );


    return (
      <ImageBackground
      style={{
       flex:1
      }}
      source={require('../../assets/bg.png')}>
      <Container style={{ backgroundColor: 'transparent' }}>
      <Navbar onCurrencyChange={(text)=> this.setState({currency: text})} left={left} right={right} title="Confirm Order" />
      <Content padder>
        <View  style={{marginHorizontal: 10,}}>
          <Text style={{marginTop: 15, fontSize: 14, fontFamily: 'NunitoSans-Bold',}}>Order Details </Text>



          <Text style={styles.actionbutton}>Billing Address:</Text>
           <View regular style={styles.item}>             
           <Text style={styles.actionbuttonText}>{paymentDetails.billadd.addressLine1}</Text>               
          </View>
          
         
          <Text style={styles.actionbutton}>Shipping Address: </Text>
          <View regular style={styles.item}>             
          <Text style={styles.actionbuttonText}>{paymentDetails.billadd.addressLine1}</Text>               
          </View>

          <Text style={styles.actionbutton}>Shipping Method: </Text>
           <View regular style={styles.item}>           
           <Text style={styles.actionbuttonText}>{paymentDetails.shipmed.name}</Text>               
          </View>

          <Text style={styles.actionbutton}>paymentDetails Method: </Text>
          <View regular style={styles.item}>         
          <Text style={styles.actionbuttonText}>{paymentDetails.paymethod}</Text>               
          </View>


          <Text style={styles.actionbutton}>Total: </Text>
          <View regular style={styles.item}>          
          <Text style={styles.actionbuttonText}> {this.state.currency} { this.currencyFormat(paymentinfo.fullBill)}</Text>               
          </View>



        </View>
        <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
        <View>
                    <Button onPress={() => this.checkout()} style={styles.buttonContainer} block iconLeft>
                      <Text style={{ color: '#fdfdfd', fontWeight: '600' }}>Place Order </Text>
                    </Button>
                  </View>
        </View>
      </Content>
    </Container>
    </ImageBackground>
     
    );
  }

  checkout() {
    const { paymentDetails, paymentinfo } = this.state
    if (paymentDetails.paymethod == 'bank transfer') {
      this.props.navigation.navigate('bank_details', { paymentinfo: paymentinfo });
    }
    else if (paymentDetails.paymethod == 'paypal') {
      this.props.navigation.navigate('paypal', { paymentinfo: paymentinfo, paymentDetails: paymentDetails });
    } 
    else if (paymentDetails.paymethod == 'rave') {
      this.props.navigation.navigate('rave', { paymentinfo: paymentinfo , paymentDetails: paymentDetails});
    }else {
      this.props.navigation.navigate('paystack', { paymentinfo: paymentinfo, paymentDetails: paymentDetails });
    }
  }


}



const styles = StyleSheet.create({
  input: {
    height: 38,
    borderColor: '#3E3E3E',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    backgroundColor: colors.grey,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
  },
  actionbutton: {
    marginTop: 7,
    marginBottom: 2,
    opacity: 0.5,
    fontSize: 10,
    color: '#0F0E43',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Regular'
  },
  buttonContainer: {
    backgroundColor: colors.primary_color,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  item: {
    height: 40,
    flexDirection: 'row',
    borderColor: '#8d96a6',
    borderWidth: 0.6,
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,

  },
  itemtwo: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,

  },
  actionbuttonText: {
    opacity: 0.9,
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Regular'
  },
});
