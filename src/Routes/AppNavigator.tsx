import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {selectIsLoggedIn} from '../Redux/Slices/authSlice';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/AuthScreens/SplashScreen';
import IntroSlider from '../Components/IntroSlider';
import Register from '../Screens/AuthScreens/Register';
import FillProfileScreen from '../Screens/AuthScreens/FillProfileScreen';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import FirstRegisterScreen from '../Screens/AuthScreens/FirstRegisterScreen';
import ForgotScreen from '../Screens/AuthScreens/ForgotScreen';
import OtpScreen from '../Screens/AuthScreens/OtpScreen';
import CreatePassword from '../Screens/AuthScreens/CreatePassword';
import {AllRouteNames} from '../Utils/AllColors';

// const Stack = createStackNavigator();

export type RootStackParamList = {
  Splash: undefined;
  App: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={AllRouteNames.Splash}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={AllRouteNames.Splash} component={SplashScreen} />

        <Stack.Screen
          name={AllRouteNames.App}
          component={isLoggedIn ? AppStack : AuthStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
