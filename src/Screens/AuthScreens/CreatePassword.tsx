import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {allColors, fontNames} from '../../Utils/AllColors';
import Images from '../../Images';
import CommanButton from '../../Components/CommanButton';
import {NavigationProps} from '../../Routes/NavigationTypes';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import CommanEdittxt from '../../Components/CommanEdittxt';
import CheckBox from '@react-native-community/checkbox';
import CommanModal from '../../Components/CommanModal';
import {confirmPassword, validatePassword} from '../../Utils/helper';
import {NavigationProp} from '@react-navigation/native';
import {loginSuccess} from '../../Redux/Slices/authSlice';
import {updateFormField} from '../../Redux/Slices/formSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';

type Props = {navigation: any};

const CreatePassword: React.FC<Props> = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [passwordvisible, setPasswordVisible] = useState(true);
  const [conpassword, setconPassword] = useState('');
  const [conbadPassword, setconBadPassword] = useState('');
  const [conpasswordvisible, setconPasswordVisible] = useState(true);
  const [ActiveInput, setActiveInput] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  interface validate {
    message: string;
    valid: boolean;
  }

  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formData);
  const validate = (i: validate) => {
    if (i.valid) {
      setisVisible(true);
      handleInputChange('createPassword', password);
    } else {
      setconBadPassword(i.message);
      console.log(i.message);
    }
  };
  const gotoHome = () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123',
    };
    const token = 'fakeToken123';
    dispatch(loginSuccess({user, token}));

    navigation.replace('App');
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    dispatch(updateFormField({field, value}));
  };
  return (
    <View style={styles.contaner}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Create New Password"
      />
      <View style={styles.mainView}>
        <Image source={Images.createpassword} style={styles.img} />
        <Text style={styles.textselect}>Create Your New Password </Text>
        <View style={styles.inputContainer}>
          <CommanEdittxt
            activeInput={ActiveInput === 1}
            onFocus={() => setActiveInput(1)}
            onpress={() => setPasswordVisible(!passwordvisible)}
            icon={Images.lock}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isValide={badPassword === ''}
            passwordvisible={passwordvisible}
          />
          <CommanEdittxt
            activeInput={ActiveInput === 2}
            onFocus={() => setActiveInput(2)}
            onpress={() => setconPasswordVisible(!conpasswordvisible)}
            icon={Images.lock}
            placeholder="Confirm Password"
            value={conpassword}
            onChangeText={setconPassword}
            isValide={conbadPassword === ''}
            errorMessage={conbadPassword}
            passwordvisible={conpasswordvisible}
          />
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
        </View>

        <CommanButton
          titel="Verify"
          onpress={() => validate(confirmPassword(password, conpassword))}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
        <CommanModal
          image={Images.congras}
          titel={'Congratulations!'}
          content={'Your account is ready to use'}
          oncancle={() => setisVisible(false)}
          onpress={() => gotoHome()}
          visible={isVisible}
          btntxt={'Go to Homepage'}
        />
      </View>
    </View>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  img: {width: wp(100), resizeMode: 'contain', height: hp(30)},
  mainView: {
    padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  contaner: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  textselect: {color: allColors.black, fontFamily: fontNames.JostMedium},
});
