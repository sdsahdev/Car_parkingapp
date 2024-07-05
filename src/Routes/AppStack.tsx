import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/AppScreens/HomeScreen';
import BookMarkScreen from '../Screens/AppScreens/BookMarkScreen';
import SettingScreen from '../Screens/AppScreens/SettingScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Material Community Icons
import {AllRouteNames, allColors} from '../Utils/AllColors';
import NotificationScreen from '../Screens/AppScreens/NotificationScreen';
import SeachScreen from '../Screens/AppScreens/SeachScreen';
import ParkingDetails from '../Screens/AppScreens/ParkingDetails';
import SelectVehicle from '../Screens/AppScreens/SelectVehicle';
import BookingParkingScreen from '../Screens/AppScreens/BookingParkingScreen';
import ParkingSportScreen from '../Screens/AppScreens/ParkingSportScreen';
import SelectPaymentScreen from '../Screens/AppScreens/SelectPaymentScreen';
import AddCardScreen from '../Screens/AppScreens/AddCardScreen';
import ReviewSummryScreen from '../Screens/AppScreens/ReviewSummryScreen';
import ParkingTicketScreen from '../Screens/AppScreens/ParkingTicketScreen';
import DirectoionMapScreen from '../Screens/AppScreens/DirectoionMapScreen';
import ArrivedScreen from '../Screens/AppScreens/ArrivedScreen';
import ParkingTimer from '../Screens/AppScreens/ParkingTimer';
import ExtendtimeScreen from '../Screens/AppScreens/ExtendtimeScreen';
import BookingStatusScreen from '../Screens/AppScreens/BookingStatusScreen';
import CancelParkingScreen from '../Screens/AppScreens/CancelParkingScreen';
import ProfileScreen from '../Screens/AppScreens/ProfileScreen';
import EditProfile from '../Screens/AppScreens/EditProfile';
import NatificationSetting from '../Screens/AppScreens/NatificationSetting';
import SecurityScreen from '../Screens/AppScreens/SecurityScreen';

// Define the screen stack for each tab
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();

// Function to create stack navigator for each tab
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name={AllRouteNames.HomeScreen} component={HomeScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="Profile" component={BookMarkScreen} />
  </ProfileStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{headerShown: false}}>
    <SettingsStack.Screen name="Settings" component={SettingScreen} />
  </SettingsStack.Navigator>
);

// Create bottom tab navigator
const Tab = createBottomTabNavigator();
function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: allColors.primaryColor, // Color of the active tab
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="saved"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingStatusScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const AppStack = () => {
  return (
    <Stack.Navigator
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
      }}
      initialRouteName={AllRouteNames.HomeScreen}>
      <Stack.Screen name={AllRouteNames.HomeScreen} component={BottomTab} />
      <Stack.Screen
        name={AllRouteNames.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={AllRouteNames.ParkingDetails}
        component={ParkingDetails}
      />
      <Stack.Screen name={AllRouteNames.SeachScreen} component={SeachScreen} />
      <Stack.Screen
        name={AllRouteNames.SelectVehicle}
        component={SelectVehicle}
      />
      <Stack.Screen
        name={AllRouteNames.BookingParkingScreen}
        component={BookingParkingScreen}
      />
      <Stack.Screen
        name={AllRouteNames.ParkingSportScreen}
        component={ParkingSportScreen}
      />
      <Stack.Screen
        name={AllRouteNames.SelectPaymentScreen}
        component={SelectPaymentScreen}
      />
      <Stack.Screen
        name={AllRouteNames.AddCardScreen}
        component={AddCardScreen}
      />
      <Stack.Screen
        name={AllRouteNames.ReviewSummryScreen}
        component={ReviewSummryScreen}
      />
      <Stack.Screen
        name={AllRouteNames.ParkingTicketScreen}
        component={ParkingTicketScreen}
      />
      <Stack.Screen
        name={AllRouteNames.DirectoionMapScreen}
        component={DirectoionMapScreen}
      />
      <Stack.Screen
        name={AllRouteNames.ArrivedScreen}
        component={ArrivedScreen}
      />
      <Stack.Screen
        name={AllRouteNames.ParkingTimer}
        component={ParkingTimer}
      />
      <Stack.Screen
        name={AllRouteNames.ExtendtimeScreen}
        component={ExtendtimeScreen}
      />
      <Stack.Screen
        name={AllRouteNames.CancelParkingScreen}
        component={CancelParkingScreen}
      />

      <Stack.Screen
        name={AllRouteNames.ProfileScreen}
        component={ProfileScreen}
      />
      <Stack.Screen name={AllRouteNames.EditProfile} component={EditProfile} />
      <Stack.Screen
        name={AllRouteNames.NatificationSetting}
        component={NatificationSetting}
      />
      <Stack.Screen
        name={AllRouteNames.SecurityScreen}
        component={SecurityScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
