import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from '../../Redux/Slices/authSlice';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import AuthBtn from '../../Components/AuthBtn';
import Images from '../../Images';
import CommanButton from '../../Components/CommanButton';
import {NavigationProps} from '../../Routes/NavigationTypes';
import useCommonStyles from '../../hooks/useCommonStyles';

type Props = {navigation: any};

const FirstRegisterScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const styles = useCommonStyles(allColors);

  return (
    <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
      <View>
        <Text style={[styles.title, {color: allColors.black}]}>
          Let's you in
        </Text>
      </View>
      <View style={styles.authButtonsContainer}>
        <AuthBtn
          icon={Images.facebook}
          bgcolor={allColors.white}
          onpress={() => console.log('')}
          titel="Continue with Facebook"
          titelcolor={allColors.black}
        />
        <AuthBtn
          icon={Images.google}
          bgcolor={allColors.white}
          onpress={() => console.log('')}
          titel="Continue with Google"
          titelcolor={allColors.black}
        />
        <AuthBtn
          titel="Continue with Apple"
          onpress={() => console.log('')}
          bgcolor={allColors.white}
          titelcolor={allColors.black}
          icon={Images.apple}
        />
      </View>
      <View style={styles.signInButtonContainer}>
        <Image source={Images.line} style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <Image source={Images.line} style={styles.line} />
      </View>

      <CommanButton
        titel="Sign in with password"
        onpress={() => navigation.navigate(AllRouteNames.LoginScreen)}
        bgcolor={allColors.primaryColor}
        titelcolor={allColors.white}
      />
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: allColors.placeholder,
            fontFamily: fontNames.JostRegular,
          }}>
          Don’t have an account?
        </Text>
        <Text
          onPress={() => navigation.navigate(AllRouteNames.Register)}
          style={styles.signUpText}>
          {` Sign up`}
        </Text>
      </View>
    </View>
  );
};

export default FirstRegisterScreen;
