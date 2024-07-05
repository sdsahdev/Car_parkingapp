import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {AllRouteNames, allColors} from '../../Utils/AllColors';
import Images from '../../Images';
import CommanButton from '../../Components/CommanButton';
import {NavigationProps} from '../../Routes/NavigationTypes';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import SelectSms from '../../Components/SelectSms';

type Props = {navigation: any};

const ForgotScreen: React.FC<Props> = ({navigation}) => {
  const [active, setActive] = useState('0');
  return (
    <View style={styles.contaner}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Forgot Password"
      />
      <View
        style={{
          padding: 20,
          justifyContent: 'space-evenly',

          flex: 1,
        }}>
        <Image
          source={Images.forget}
          style={{width: wp(100), resizeMode: 'contain', height: hp(30)}}
        />
        <Text style={styles.textselect}>
          Select which contact detalis should we use to reset your password
        </Text>
        <SelectSms
          onpress={() => setActive('1')}
          icon={Images.mail}
          titel="Via SMS"
          value="a+92 3*******31"
          active={active === '1'}
          imagename={'message-text'}
        />
        <SelectSms
          onpress={() => setActive('2')}
          icon={Images.mail}
          titel="Via Email"
          value="an********445@gmail.com"
          active={active === '2'}
          imagename={'email'}
        />
        <CommanButton
          titel="Continue"
          onpress={() => navigation.navigate(AllRouteNames.OtpScreen)}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
      </View>
    </View>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  textselect: {color: allColors.black, fontWeight: 'bold'},
});
