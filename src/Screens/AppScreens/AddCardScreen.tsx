import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import Images from '../../Images';
import CommanEdittxt from '../../Components/CommanEdittxt';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import CommanButton from '../../Components/CommanButton';
import {addPayment} from '../../Redux/Slices/PaymentSlice';

type Props = {navigation: any};

const AddCardScreen: React.FC<Props> = ({navigation}) => {
  const data = useAppSelector(state => state.PaymentSlice.payments);
  const dispatch = useAppDispatch();

  const [fullName, setfullName] = useState('');
  const [badfullName, setbadfullName] = useState('');
  const [cardNumber, setcardNumber] = useState('');
  const [badcardNumber, setbadcardNumber] = useState('');
  const [carddate, setcarddate] = useState('');
  const [badcarddate, setbadcarddate] = useState('');
  const [cardCri, setcardCri] = useState('');
  const [badcardCri, setbadcardCri] = useState('');

  const formatCreditCardNumber = (value: any) => {
    // Remove all non-digit characters
    const cleaned = ('' + value).replace(/\D/g, '');
    // Group digits into chunks of 4
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : '';
  };

  const handleCreditCardChange = (text: any) => {
    const formatted = formatCreditCardNumber(text);
    setcardNumber(formatted);

    // Example validation: check if the length of the formatted number is 19 (16 digits + 3 spaces)
    if (formatted.length === 19) {
      setbadcardNumber('');
    } else {
      setbadcardNumber('Invalid credit card number');
    }
  };
  const formatExpirationDate = (value: any) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    // Ensure the string is at most 4 digits long
    const limited = cleaned.slice(0, 4);
    // Format as MM/YY
    if (limited.length >= 2) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    } else if (limited.length >= 1) {
      return limited;
    }
    return '';
  };
  const handleExpirationDateChange = (text: any) => {
    const formatted = formatExpirationDate(text);
    setcarddate(formatted);

    // Example validation: check if the formatted date is in MM/YY format
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formatted)) {
      setbadcarddate('');
    } else {
      setbadcarddate('Invalid expiration date');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitel titel="Payment" onpress={() => navigation.pop()} />
      <View style={styles.mainView}>
        <Image source={Images.card} style={styles.img} />

        <CommanEdittxt
          onpress={() => ''}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setfullName}
          isValide={badfullName === ''}
          errorMessage={badfullName}
        />
        <CommanEdittxt
          onpress={() => ''}
          placeholder="000 000 000 000"
          value={cardNumber}
          onChangeText={handleCreditCardChange}
          isValide={badcardNumber === ''}
          errorMessage={badcardNumber}
          keyboardType={'numeric'}
          maxLength={19} // Maximum length including spaces
        />
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: allColors.gray,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              placeholder={'00/00'}
              value={carddate}
              placeholderTextColor={allColors.placeholder}
              onChangeText={handleExpirationDateChange}
              style={styles.input}
              keyboardType={'number-pad'}
              maxLength={5}
              pointerEvents="none"
              autoCapitalize="none"
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: allColors.gray,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              placeholder={'000'}
              value={cardCri}
              placeholderTextColor={allColors.placeholder}
              onChangeText={setcardCri}
              style={styles.input}
              keyboardType={'number-pad'}
              maxLength={3}
              pointerEvents="none"
              autoCapitalize="none"
            />
          </View>
        </View>
        <CommanButton
          titel={'Add Vehicle'}
          onpress={() => {
            dispatch(
              addPayment({
                id: Date.now().toLocaleString(),
                img: '',
                name: cardNumber,
                select: false,
              }),
            ),
              navigation.pop();
          }}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
      </View>
    </View>
  );
};

export default AddCardScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: allColors.gray,
    margin: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(2),
    fontFamily: fontNames.JostRegular,
    color: allColors.black,
  },
  img: {width: wp(90), height: hp(30), resizeMode: 'contain'},
  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  mainView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
