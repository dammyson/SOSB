import { AsyncStorage } from 'react-native';


export const BaseUrl = () => {

  return 'https://www.ofidy.com/dev-mobile/v1/api.php';
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




