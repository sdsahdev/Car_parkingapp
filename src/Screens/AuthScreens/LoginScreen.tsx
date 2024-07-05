import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
  changeData,
} from '../../Redux/Slices/authSlice';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';

import Images from '../../Images';
import CommanButton from '../../Components/CommanButton';
import {NavigationProps} from '../../Routes/NavigationTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import CommanEdittxt from '../../Components/CommanEdittxt';
import CheckBox from '@react-native-community/checkbox';
import SigningIcons from '../../Components/SigningIcons';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {AppDispatch, RootState} from '../../Redux/Store/store';
import {validateEmail, validatePassword} from '../../Utils/helper';
import {login} from '../../Redux/Slices/authThunks';

type Props = {navigation: any};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [ActiveInput, setActiveInput] = useState(0);
  const [passwordvisible, setPasswordVisible] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleInputChange = () => {
    console.log(email, password);

    const emailvalide = validateEmail(email || '');
    const passwordvalid = validatePassword(password || '');
    setBadEmail(emailvalide.message);
    setBadPassword(passwordvalid.message);

    if (emailvalide.valid && passwordvalid.valid) {
      handleLogin();
      // navigation.navigate(AllRouteNames.Register);
      // All fields are valid, proceed with form submission or other actions
      // console.log('Login successfully:');
    } else {
      // Handle form validation errors, display error messages or take appropriate action
      console.log('Form validation failed. Please check errors.');
    }

    const user = {
      password: password,
      email: email,
    };
    dispatch(changeData({email: email, password: password}));
  };

  const handleLogin = () => {
    dispatch(login(email, password));
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: allColors.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <HeaderWithTitel onpress={() => navigation.pop()} titel="" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login to your Account</Text>
          </View>
          <View style={styles.inputContainer}>
            <CommanEdittxt
              activeInput={ActiveInput === 1}
              onFocus={() => setActiveInput(1)}
              onpress={() => ''}
              icon={Images.mail}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text.toLowerCase())}
              isValide={badEmail === ''}
              errorMessage={badEmail}
            />

            <CommanEdittxt
              activeInput={ActiveInput === 2}
              onFocus={() => setActiveInput(2)}
              onpress={() => setPasswordVisible(!passwordvisible)}
              icon={Images.lock}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isValide={badPassword === ''}
              errorMessage={badPassword}
              passwordvisible={passwordvisible}
            />
          </View>
          <View>
            <Text
              style={{color: allColors.red, fontFamily: fontNames.JostRegular}}>
              {auth.error}
            </Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{
                true: allColors.primaryColor,
                false: allColors.primaryColor,
              }}
            />
            <Text style={styles.checkBoxText}>Remember me</Text>
          </View>

          <CommanButton
            titel="Sign in"
            onpress={() => handleInputChange()}
            bgcolor={allColors.primaryColor}
            titelcolor={allColors.white}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(AllRouteNames.ForgotScreen)}>
            <Text
              style={{
                color: allColors.primaryColor,
                fontFamily: fontNames.JostMedium,
              }}>
              Forgot the password?
            </Text>
          </TouchableOpacity>
          <View style={styles.separatorContainer}>
            <Image source={Images.line} style={styles.lineImage} />
            <Text style={styles.separatorText}>or continue with</Text>
            <Image source={Images.line} style={styles.lineImage} />
          </View>
          <View style={styles.signingIconsContainer}>
            <SigningIcons image={Images.facebook} onpress={() => ''} />
            <SigningIcons image={Images.google} onpress={() => ''} />
            <SigningIcons image={Images.apple} onpress={() => ''} />
          </View>
          <View style={styles.signUpTextContainer}>
            <Text
              style={{
                color: allColors.placeholder,
                fontFamily: fontNames.JostRegular,
              }}>
              Don’t have an account?
            </Text>
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate(AllRouteNames.Register)}>
              {' Sign up'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {flexGrow: 1},
  backButtonContainer: {
    width: '100%',
    left: 20,
  },
  backButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    left: 10,
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '90%',
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxText: {
    textAlignVertical: 'center',
    color: allColors.primaryColor,
    fontFamily: fontNames.JostMedium,
    marginHorizontal: 10,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineImage: {
    resizeMode: 'center',
    width: 90,
  },
  separatorText: {
    textAlignVertical: 'center',
    fontFamily: fontNames.JostMedium,
    marginHorizontal: 10,
  },
  signingIconsContainer: {
    flexDirection: 'row',
  },
  signUpTextContainer: {
    flexDirection: 'row',
  },
  signUpText: {
    color: allColors.primaryColor,
    fontFamily: fontNames.JostRegular,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: allColors.white,
  },
  title: {
    fontSize: wp(12),
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
    left: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default LoginScreen;
