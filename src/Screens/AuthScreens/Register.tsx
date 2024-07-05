import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';

import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from '../../Redux/Slices/authSlice';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';

import Images from '../../Images';
import CommanButton from '../../Components/CommanButton';
import CommanEdittxt from '../../Components/CommanEdittxt';
import SigningIcons from '../../Components/SigningIcons';
import {NavigationProps} from '../../Routes/NavigationTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {registerUser, updateFormField} from '../../Redux/Slices/formSlice';
import {validateEmail, validatePassword} from '../../Utils/helper';
import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
type Props = {navigation: any};

const Register: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formData);

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [badEmail, setBadEmail] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [ActiveInput, setActiveInput] = useState(0);
  const [passwordvisible, setPasswordVisible] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  // const styles = useCommonStyles(allColors);

  const handleInputChange = (name: keyof typeof form, value: string) => {
    dispatch(updateFormField({field: name, value}));
  };
  const validateDetail = () => {
    const email = validateEmail(form.createEmail);
    const password = validatePassword(form.createPassword);
    setBadEmail(email.message);
    setBadPassword(password.message);

    if (email.valid && password.valid) {
      // handleRegister();
      navigation.navigate(AllRouteNames.FillProfileScreen);
      console.log('Form submitted successfully:', form);
    } else {
      console.log('Form validation failed. Please check errors.');
    }
  };
  const handleRegister = () => {
    const id = Date.now().toString(); // Simple ID generation, replace with a better approach
    dispatch(registerUser({...form, id}));
  };

  const styles = useCommonStyles(allColors);
  return (
    <KeyboardAvoidingView
      style={styles.containerRegister}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <HeaderWithTitel onpress={() => navigation.pop()} titel="" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.childView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Your Account</Text>
          </View>
          <View style={styles.inputContainerregister}>
            <CommanEdittxt
              activeInput={ActiveInput === 1}
              onFocus={() => setActiveInput(1)}
              onpress={() => ''}
              icon={Images.mail}
              placeholder="Email"
              value={form.createEmail}
              onChangeText={txt => handleInputChange('createEmail', txt)}
              isValide={badEmail === ''}
              errorMessage={badEmail}
              keyboardType={'email-address'}
            />

            <CommanEdittxt
              activeInput={ActiveInput === 2}
              onFocus={() => setActiveInput(2)}
              onpress={() => setPasswordVisible(!passwordvisible)}
              icon={Images.lock}
              placeholder="Password"
              value={form.createPassword}
              onChangeText={txt => handleInputChange('createPassword', txt)}
              isValide={badPassword === ''}
              errorMessage={badPassword}
              passwordvisible={passwordvisible}
            />
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
            titel="Sign up"
            onpress={() => validateDetail()}
            bgcolor={allColors.primaryColor}
            titelcolor={allColors.white}
          />
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
              Already have an Account?
            </Text>
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate(AllRouteNames.LoginScreen)}>
              {' Sign In'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
