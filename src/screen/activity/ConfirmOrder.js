/**
* This is the Checkout Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Text, View, Grid, Col, Left, Right, Button, Item } from 'native-base';


// Our custom files and classes import
import { BaseUrl, getUserID, getSessionID } from '../../utilities';
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
      loading: true,
      user_id: '',
      session_id: '',


    };
  }

  async componentWillMount() {
    const { paymentDetails } = this.props.route.params;
    if (paymentDetails) {
      this.setState({ paymentDetails: paymentDetails });
      console.warn(paymentDetails.billadd.addressLine1);
    }
   
   

  }


  async componentDidMount() {
    this.setState({
      user_id: await getUserID(),
      session_id: await getSessionID()
    });

   this.getBill();

}


  getBill() {
    const { user_id, session_id, paymentDetails } = this.state
    console.warn(user_id, session_id);
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
          Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
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

  deliveryVerification() {
    const { user_id, session_id, paymentDetails } = this.state
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('feature', "order");
    formData.append('action', "DeliveryVerify");
    formData.append('id', user_id,);
    formData.append('sid', session_id);

    fetch('https://www.ita-obe.com/mobile/v1/order.php', {
      method: 'POST', headers: {
        Accept: 'application/json',
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (!res.error) {
          this.setState({
            loading: false,
          })

          Alert.alert(
            'Success',
            'Order registered succesfully',
            [
              { text: 'Cancel', onPress: () => Actions.confirmation({ paymentDetails: paymentDetails }) },
              { text: 'OK', onPress: () => Actions.confirmation({ paymentDetails: paymentDetails }) },
            ],
            { cancelable: false }
          )

        } else {
          Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
          this.setState({ loading: false })
        }
      }).catch((error) => {
        console.warn(error);
        alert(error.message);
      });
  }

  render() {
    const { paymentDetails, bill } = this.state

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
      <Container>
      <Navbar left={left} right={right} title="Confirm Order" />
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
          <Text style={styles.actionbuttonText}> NGN { this.currencyFormat(bill)}</Text>               
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
     
    );
  }

  checkout() {
    const { paymentDetails, bill } = this.state
    if (paymentDetails.paymethod == 'bank') {
      Actions.bank({ paymentDetails: paymentDetails });
    } else if (paymentDetails.paymethod == 'delivery') {
      this.deliveryVerification();
    } else {
      Actions.pay({ paymentDetails: paymentDetails, total: bill });
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
