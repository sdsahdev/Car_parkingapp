import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import Register from '../Screens/AuthScreens/Register';
import {AllRouteNames} from '../Utils/AllColors';
import IntroSlider from '../Components/IntroSlider';
import ForgotScreen from '../Screens/AuthScreens/ForgotScreen';
import OtpScreen from '../Screens/AuthScreens/OtpScreen';
import CreatePassword from '../Screens/AuthScreens/CreatePassword';
import FirstRegisterScreen from '../Screens/AuthScreens/FirstRegisterScreen';
import FillProfileScreen from '../Screens/AuthScreens/FillProfileScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName={AllRouteNames.IntroScreen}
    screenOptions={{
      headerShown: false, // Optionally hide header
      transitionSpec: {
        open: {animation: 'timing', config: {duration: 0}}, // Disable animation
        close: {animation: 'timing', config: {duration: 0}}, // Disable animation
      },
      cardStyleInterpolator: ({current: {progress}}) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      }),
    }}>
    <Stack.Screen name={AllRouteNames.Register} component={Register} />
    <Stack.Screen name={AllRouteNames.IntroScreen} component={IntroSlider} />
    <Stack.Screen name={AllRouteNames.LoginScreen} component={LoginScreen} />
    <Stack.Screen name={AllRouteNames.ForgotScreen} component={ForgotScreen} />
    <Stack.Screen name={AllRouteNames.OtpScreen} component={OtpScreen} />
    <Stack.Screen
      name={AllRouteNames.CreatePassword}
      component={CreatePassword}
    />
    <Stack.Screen
      name={AllRouteNames.FillProfileScreen}
      component={FillProfileScreen}
    />
    <Stack.Screen
      name={AllRouteNames.FirstRegisterScreen}
      component={FirstRegisterScreen}
    />
  </Stack.Navigator>
);

export default AuthStack;
