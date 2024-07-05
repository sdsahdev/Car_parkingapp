import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {allColors, fontNames} from '../Utils/AllColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../Images';

interface CommanButtonProps {
  onpress?: () => void;
  titel?: string;
  img?: boolean;
}
const HeaderWithTitel: React.FC<CommanButtonProps> = ({
  onpress,
  titel,
  img,
}) => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: allColors.white}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onpress}
        style={[styles.btn]}>
        {img == true ? (
          <View
            style={{
              backgroundColor: allColors.primaryColor,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
            }}>
            <Text
              style={{
                fontFamily: fontNames.JostMedium,
                fontSize: 22,
                color: allColors.white,
              }}>
              s
            </Text>
          </View>
        ) : (
          <Image source={Images.back} style={styles.img} />
        )}
      </TouchableOpacity>
      <Text style={styles.titleTxt}>{titel}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {width: wp(7), height: hp(7), resizeMode: 'center'},
  btn: {
    width: wp(15),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  titleTxt: {
    fontSize: wp(6),
    color: allColors.black,
    textAlignVertical: 'center',
    fontFamily: fontNames.JostMedium,
  },
});

export default HeaderWithTitel;
