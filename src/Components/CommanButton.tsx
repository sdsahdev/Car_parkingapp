import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../Utils/AllColors';

interface CommanButtonProps {
  titel: string;
  onpress: () => void;
  bgcolor: string;
  titelcolor: string;
}
const CommanButton: React.FC<CommanButtonProps> = ({
  titel,
  onpress,
  bgcolor,
  titelcolor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onpress}
      style={[styles.btn, {backgroundColor: bgcolor}]}>
      <Text style={[styles.titletxt, {color: titelcolor}]}>{titel}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(1.5),
    borderRadius: 30,
    margin: 20,
  },
  titletxt: {fontSize: 16, fontFamily: fontNames.JostMedium},
});

export default CommanButton;
