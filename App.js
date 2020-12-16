import * as React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Main from './src/component/navigation/app-stack';

import { Platform } from 'react-native';
import Loader from './src/components/loader/Loader';
 // console.disableYellowBox = true;

function App() {
	const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {}
	const navigationOptions = {
		headerShown: false,
		...TransitionPreset,
		gestureResponseDistance: {
			vertical: 800
		}
	}
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	)
}
export default App;