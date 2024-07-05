import React, {useState, useRef, useEffect, RefObject} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

// Import allColors and Images (adjust the paths according to your project structure)

import Images from '../../Images';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import {NavigationProps} from '../../Routes/NavigationTypes';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import CommanButton from '../../Components/CommanButton';

interface OtpScreenProps {}
type Props = {navigation: any};

const OtpScreen: React.FC<Props> = ({navigation}) => {
  const otpInputRefs: RefObject<TextInput>[] = Array.from({length: 4}, () =>
    useRef<TextInput>(null),
  );
  const [otp, setOtp] = useState<string>('');
  const [generated, setGenerated] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60); // Initial value for seconds

  useEffect(() => {
    // Timer to decrement seconds every second
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    // Clear the timer when component unmounts
    return () => clearInterval(timer);
  }, [seconds]);

  const generateOTP = (): string => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  };

  const callLogin = async () => {
    // Login functionality
  };

  const handleOtpChange = (index: number, text: string) => {
    const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 1);

    setOtp(prevOtp => {
      const newOtp = prevOtp.split('');
      newOtp[index] = sanitizedText;
      return newOtp.join('');
    });

    // Move to the previous input if the current input is empty
    if (text === '' && index > 0) {
      otpInputRefs[index - 1]?.current?.focus();
    }
    // Move to the next input if available
    else if (text !== '' && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1]?.current?.focus();
    } else {
      if (index != 0) {
        otpInputRefs[otp.length + 1]?.current?.focus();
      }
    }
  };

  useEffect(() => {
    callLogin();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: allColors.white,
      }}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Forgot Password"
      />
      <View style={{flex: 1}}>
        <View style={styles.mainView}>
          <Text
            style={{color: allColors.black, fontFamily: fontNames.JostRegular}}>
            Code has been send to +92 3*******31
          </Text>
          <View style={styles.otpContainer}>
            {Array.from({length: 4}).map((_, index) => (
              <>
                <TextInput
                  key={index}
                  ref={otpInputRefs[index]}
                  style={[
                    styles.inputOtp,
                    otp.length === index ? styles.inputFocus : null,
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChangeText={text => handleOtpChange(index, text)}
                />
              </>
            ))}
          </View>

          {seconds <= 0 ? (
            <TouchableOpacity
              disabled={seconds > 0}
              onPress={() => {
                callLogin();
                setOtp('');
                setSeconds(60);
              }}>
              <Text style={styles.resend}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendbtn}>
              Resend code in
              <Text style={styles.secondtxt}>{` ${seconds}s`}</Text>
            </Text>
          )}
        </View>

        <CommanButton
          titel="Continue"
          onpress={() => navigation.navigate(AllRouteNames.CreatePassword)}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  secondtxt: {
    color: allColors.primaryColor,
    fontSize: wp(4),
    fontFamily: fontNames.JostRegular,
  },
  resendbtn: {
    color: allColors.black,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    marginVertical: hp(6),
    fontFamily: fontNames.JostMedium,
  },
  resend: {
    color: allColors.black,
    fontSize: 14,
    marginTop: 10,
    fontFamily: fontNames.JostRegular,
  },
  mainView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputFocus: {
    borderColor: allColors.primaryColor,
    borderWidth: 2, // Highlight the input in focus
    backgroundColor: allColors.litePrimary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(6),
  },
  inputOtp: {
    width: wp(15),
    height: hp(8),
    borderColor: allColors.litegray,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    fontSize: wp(8),
    textAlign: 'center',
    color: allColors.black,
    backgroundColor: allColors.litegray,
    fontFamily: fontNames.JostRegular,
  },
  genderView: {
    height: hp(10),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  btn: {
    height: 50,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: allColors.black,
    marginTop: 20,
    borderColor: allColors.black,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  male: {
    borderWidth: 2,
    borderColor: allColors.black,
    width: '40%',
    height: hp(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  heading: {
    color: allColors.white,
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '90%',
    marginBottom: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  btntxt: {
    fontSize: 20,
    color: allColors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  logo: {
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  logoText: {
    fontSize: 20,
    color: allColors.black,
    textAlign: 'center',
    margin: wp(4),
  },
  button: {
    width: '90%',
    height: hp(6),
    alignSelf: 'center',
    margin: wp(4),
    borderRadius: 10,
  },
});
