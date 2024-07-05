import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../Utils/AllColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CommanButtonProps {
  titel: string;
  value: string;
  imagename: string;
  onpress: () => void;
  icon: ImageSourcePropType;
  active: boolean;
}

const SelectSms: React.FC<CommanButtonProps> = ({
  titel,
  value,
  icon,
  onpress,
  active,
  imagename,
}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={[
        styles.btn,
        {borderColor: active ? allColors.primaryColor : allColors.litegray},
      ]}>
      <View
        style={{
          width: wp(16),
          height: wp(16),
          borderRadius: wp(8),
          backgroundColor: allColors.litePrimary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons
          name={imagename}
          size={wp(7)}
          color={allColors.primaryColor}
        />
        {/* <Image source={icon} style={styles.img} /> */}
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Text style={[styles.titletxt]}>{titel}</Text>
        <Text style={[styles.titletxt, {color: allColors.black}]}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '90%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: allColors.litegray,
    borderColor: allColors.litegray,
  },
  img: {
    height: wp(7),
    width: wp(7),
    resizeMode: 'center',
    tintColor: allColors.primaryColor,
  },
  titletxt: {fontSize: 16, fontFamily: fontNames.JostMedium},
});

export default SelectSms;
