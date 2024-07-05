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
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {allColors, fontNames} from '../Utils/AllColors';

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

  onchangeSelect?: () => void;
  datalist?: Array<any>;
}

const MultipleSelect: React.FC<CustomTextInputProps> = ({
  mt,
  isValide,
  value,
  icon,
  errorMessage,
  passwordvisible,
  onpress,
  activeInput,

  placeholder,
  datalist,
  onchangeSelect,
}) => {
  return (
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
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={datalist}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Gender'}
          value={value}
          onChange={onchangeSelect}
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
};

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
  },
  icon: {
    width: wp(3),
    height: wp(3),
    marginHorizontal: wp(4),
    resizeMode: 'center',
  },
  errorMessage: {
    color: allColors.gray,
    fontSize: 13,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fontNames.JostRegular,
  },

  dropdown: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '90%',
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default MultipleSelect;
