import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';

interface CommanButtonProps {
  titel: string;
  onpress: () => void;
  bgcolor: string;
  titelcolor: string;
  icon: ImageSourcePropType;
}

const AuthBtn: React.FC<CommanButtonProps> = ({
  titel,
  onpress,
  bgcolor,
  titelcolor,
  icon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onpress}
      style={[styles.btn, {backgroundColor: bgcolor}]}>
      <Image source={icon} style={styles.img} />
      <Text style={[styles.titletxt, {color: titelcolor}]}>{titel}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    position: 'absolute',
    left: 20,
    resizeMode: 'center',
  },
  titletxt: {fontSize: 16, fontWeight: 'bold'},
});

export default AuthBtn;
