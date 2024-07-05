import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {allColors} from '../Utils/AllColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface CommanButtonProps {
  onpress: () => void;
  image: ImageSourcePropType;
}
const SigningIcons: React.FC<CommanButtonProps> = ({onpress, image}) => {
  return (
    <TouchableOpacity onPress={onpress} style={[styles.btn]}>
      <Image source={image} style={styles.img} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  img: {width: wp(7), height: hp(7), resizeMode: 'center'},
  btn: {
    width: wp(20),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
  },
});

export default SigningIcons;
