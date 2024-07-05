import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../Utils/AllColors';
import Entypo from 'react-native-vector-icons/Entypo';

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
  editable?: boolean;
  onpress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const CommanEdittxt: React.FC<CustomTextInputProps> = ({
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
  editable,
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
        {icon
          ? !iconright && (
              <Image
                source={icon}
                style={[
                  styles.icon,
                  {
                    tintColor: activeInput
                      ? allColors.primaryColor
                      : value
                      ? allColors.black
                      : allColors.placeholder,
                  },
                ]}
              />
            )
          : null}
        <TextInput
          editable={editable}
          autoCorrect={false}
          secureTextEntry={passwordvisible && true}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={allColors.placeholder}
          onChangeText={onChangeText}
          style={styles.input}
          keyboardType={keyboardType || 'default'}
          maxLength={maxLength}
          onFocus={onFocus}
          onBlur={onBlur}
          pointerEvents="none"
          autoCapitalize="none"
        />
        {icon
          ? iconright && (
              <Image
                source={icon}
                style={[
                  styles.icon,
                  {
                    tintColor: activeInput
                      ? allColors.primaryColor
                      : value
                      ? allColors.black
                      : allColors.placeholder,
                  },
                ]}
              />
            )
          : null}
        {placeholder?.includes('Password') && (
          <TouchableOpacity onPress={onpress} style={{marginHorizontal: wp(3)}}>
            <Entypo
              name={!passwordvisible ? 'eye' : 'eye-with-line'}
              size={wp(4)}
              color={
                activeInput
                  ? allColors.primaryColor
                  : value
                  ? allColors.black
                  : allColors.placeholder
              }
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
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(2),
    fontFamily: fontNames.JostRegular,
    color: allColors.black,
  },
  icon: {
    width: wp(3),
    height: wp(3),
    marginHorizontal: wp(3),
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

export default CommanEdittxt;
