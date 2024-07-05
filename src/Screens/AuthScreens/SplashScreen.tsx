import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Image, Text, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Routes/AppNavigator';
import {loginSuccess} from '../../Redux/Slices/authSlice';
import Images from '../../Images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import {NavigationProps} from '../../Routes/NavigationTypes';
import {useIsFocused} from '@react-navigation/native';
type Props = {navigation: any};

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const opacity = useRef(new Animated.Value(0)).current;
  const [showSecondImage, setShowSecondImage] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(isFocused);

    if (isFocused) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, [isFocused]);
  useEffect(() => {
    // Animate the first image
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Show the first image for 2 seconds
      setTimeout(() => {
        // Hide the first image and show the second image
        setShowSecondImage(true);
        opacity.setValue(0); // Reset opacity for the second image animation

        // Animate the second image
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          //   Show the second image for 3 seconds
          setTimeout(() => {
            //   For demonstration, we assume the user is logged in
            const user = {id: '1', name: 'John Doe', email: 'devi@gmail.com'};
            const token = 'fakeToken123';
            // dispatch(loginSuccess({user, token}));
            navigation.replace(AllRouteNames.App);
          }, 3000); // Wait for 3 seconds
        });
      }, 2000); // Wait for 2 seconds
    });
  }, [opacity, dispatch, navigation]);

  return (
    <View style={styles.container}>
      {showSecondImage ? (
        <>
          <Animated.Image
            source={Images.caronly} // Replace with your image paths
            style={[styles.imagecar, {opacity}]}
          />
          <View
            style={{
              position: 'absolute',
              left: wp(7),
              bottom: hp(4),
              flex: 1,
            }}>
            <Animated.Image
              source={Images.welcomtext} // Replace with your image paths
              style={[styles.imageWelcom, {opacity}]}
            />
            <Animated.Image
              source={Images.sevenovn} // Replace with your image paths
              style={[styles.imageWelcom, {opacity}]}
            />
            <Text
              style={{
                color: allColors.white,
                width: '60%',
                fontSize: 16,
                fontFamily: fontNames.JostRegular,
              }}>
              The best sevenovn app of the century for all people in the world
            </Text>
          </View>
        </>
      ) : (
        <Animated.Image
          source={Images.logo} // Replace with your image paths
          style={[styles.image, {opacity}]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BC0063', // Your primary color
  },
  image: {
    width: 200, // Adjust the size as needed
    height: 200, // Adjust the size as needed
    resizeMode: 'contain',
  },
  imagecar: {
    width: wp(100), // Adjust the size as needed
    height: hp(9), // Adjust the size as needed
    resizeMode: 'stretch',
    flex: 1,
  },
  imageWelcom: {
    width: wp(60), // Adjust the size as needed
    height: hp(6), // Adjust the size as needed
    resizeMode: 'cover',
  },
});

export default SplashScreen;
