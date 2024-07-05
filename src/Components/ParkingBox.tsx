import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {allColors, fontNames} from '../Utils/AllColors';
import Images from '../Images';

type Props = {status: number; boxname: string};

const ParkingBox: React.FC<Props> = ({status, boxname}) => {
  return (
    <View style={styles.contaner}>
      <TouchableOpacity
        disabled={status != 3}
        style={
          status == 1
            ? styles.childView
            : status == 2
            ? styles.childCarView
            : styles.selectedTxt
        }>
        {status == 1 && <Text style={styles.txt}>{boxname}</Text>}
        {status == 2 && <Image source={Images.carpark} style={styles.img} />}
        {status == 3 && (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.txt,
                {color: allColors.white, marginHorizontal: 3},
              ]}>
              {boxname}
            </Text>
            <MaterialIcons
              name={'task-alt'}
              size={20}
              color={allColors.white}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ParkingBox;

const styles = StyleSheet.create({
  txt: {color: allColors.black, fontFamily: fontNames.JostMedium},
  img: {width: wp(25), height: hp(8), resizeMode: 'contain'},
  contaner: {
    flex: 1,
    borderColor: allColors.placeholder,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
    height: hp(8.7),
    width: wp(30),
  },
  childView: {
    flex: 1,
    backgroundColor: allColors.litePrimary,
    borderRadius: 15,
    borderColor: allColors.primaryColor,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childCarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTxt: {
    flex: 1,
    backgroundColor: allColors.primaryColor,
    borderRadius: 15,
    borderColor: allColors.primaryColor,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
