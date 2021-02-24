import { AsyncStorage } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


const stage = 'test';

const paystack_test_key = 'pk_test_c78f193a7340923195cea7b1e4108f585346e254';
const paystack_live_key = 'pk_live_3306d8098964f020dffa793c158560f5e52aa1f0';


export const BaseUrl = () => {

  //return 'https://www.ofidy.com/dev-mobile/v1/api.php';
  return 'https://ofidyshopping.azurewebsites.net/dev-mobile/v1/api.php'
};

export const getUserID = async () => {
  return AsyncStorage.getItem('user_id')
};

export const getSessionID = async () => {
  return AsyncStorage.getItem('session_id')
};


export const getAuth = async () => {
  return AsyncStorage.getItem('aut')
};

export const setCurrency = (curr) => {
  AsyncStorage.setItem('curr', curr);
};
export const getCurrency = async () => {
  return AsyncStorage.getItem('curr')
};

export const getEmail = async () => {
  return AsyncStorage.getItem('email')
};

export const getPaystackKey = () => {
  if( stage == 'test')
    return  paystack_test_key;
  else 
    return  paystack_live_key;
};


export const showTopNotification = (type, message, duration)=> {
  showMessage({
    message: message,
    type: type,
    duration: duration,
    icon: type ,
    hideStatusBar: true
  });
}

export const makeOrderId = (length) => {
  var result = '';
  var characters = '1234567899876543210123456789abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

