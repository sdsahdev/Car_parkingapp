import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../Utils/AllColors';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomTextInputProps {
  mt?: number;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  isValide?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  value?: string;
  icon?: number;
  errorMessage?: string;
  passwordvisible?: boolean;
  activeInput?: boolean;
  iconright?: boolean;
  onpress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  selectCountryes?: any;
  country_name?: any;
  CountryCode?: any;
}

const ContryPicker: React.FC<CustomTextInputProps> = ({
  mt,
  placeholder,
  onChangeText,
  isValide,
  keyboardType,
  maxLength,
  value,
  icon,
  errorMessage,
  passwordvisible,
  onpress,
  activeInput,
  onFocus,
  onBlur,
  iconright,
  country_name,
  CountryCode,
  selectCountryes,
}) => (
  <View style={[styles.container, {marginTop: mt}]}>
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: activeInput
            ? allColors.primaryColor
            : value
            ? allColors.black
            : allColors.gray,
        },
      ]}>
      <CountryPicker
        placeholder={<Text style={{fontSize: 14}}>ISD</Text>}
        countryCode={country_name}
        withCloseButton={true}
        withAlphaFilter={true}
        withFilter={true}
        withFlag={true}
        withCallingCode={true}
        onSelect={selectCountryes}
      />
      <MaterialIcons
        name={'keyboard-arrow-down'}
        size={20}
        color={allColors.black}
      />
      <Text style={{color: allColors.black}}>{CountryCode}</Text>
      <TextInput
        autoCorrect={false}
        secureTextEntry={passwordvisible && true}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType={keyboardType || 'default'}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {placeholder == 'Password' && (
        <TouchableOpacity onPress={onpress} style={{marginHorizontal: wp(3)}}>
          <Entypo
            name={!passwordvisible ? 'eye' : 'eye-with-line'}
            size={20}
            color={activeInput ? allColors.primaryColor : allColors.gray}
          />
        </TouchableOpacity>
      )}
    </View>
    {errorMessage ? (
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 70,
    margin: 4,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: allColors.gray,
    paddingHorizontal: wp(4),
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(2),
    fontFamily: fontNames.JostRegular,
  },
  icon: {
    width: wp(3),
    height: wp(3),
    marginHorizontal: wp(4),
    resizeMode: 'center',
  },
  errorMessage: {
    color: allColors.red,
    fontSize: 13,
    textAlign: 'left',
    alignSelf: 'flex-start',
    margin: 1,
    fontFamily: fontNames.JostRegular,
  },
});

export default ContryPicker;
