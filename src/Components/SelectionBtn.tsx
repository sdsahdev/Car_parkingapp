import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CameraOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {allColors, fontNames} from '../Utils/AllColors';
import {Ivehicle} from '../Redux/Slices/vehicleSlice';
import Images from '../Images';
import {useAppDispatch, useAppSelector} from '../Redux/Store/store';
import {changeValue} from '../Redux/Slices/PaymentSlice';

export interface TItemData {
  id: string;
  name: string;
  select: boolean;
  img: any;
  number?: string;
}

type Props = {
  item: TItemData;
};

const SelectionBtn: React.FC<Props> = ({item}: any) => {
  const dispatch = useAppDispatch();

  const maskCreditCardNumber = (value: any) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');

    // Ensure the string is at least 16 digits long
    if (cleaned.length !== 16) {
      return value;
    }
    // Format as **** **** **** 1234
    return `**** **** **** ${cleaned.slice(12)}`;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          dispatch(
            changeValue({
              id: item.id,
              property: 'select',
              value: !item.select,
            }),
          )
        }
        style={[
          styles.renderbtn,
          {
            borderColor: item?.select ? allColors.primaryColor : allColors.gray,
          },
        ]}>
        <View style={styles.txtcontain}>
          <Image
            source={item?.img ? item.img : Images?.mastercard}
            style={styles.img}
          />
          <View style={styles.centerjusti}>
            <Text style={styles.lable}>{maskCreditCardNumber(item?.name)}</Text>
            {item?.number && (
              <Text style={[styles.lable, {fontSize: 14}]}>{item?.number}</Text>
            )}
          </View>
        </View>

        <View style={styles.radioButton}>
          <View style={styles.radioButtonOuter}>
            {item?.select && <View style={styles.radioButtonInner} />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectionBtn;

const styles = StyleSheet.create({
  centerjusti: {justifyContent: 'center', alignItems: 'center'},
  img: {
    width: wp(10),
    height: hp(10),
    marginHorizontal: 20,
    resizeMode: 'contain',
  },
  txtcontain: {flexDirection: 'row', alignItems: 'center'},
  renderbtn: {
    backgroundColor: allColors.white,
    width: '90%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    alignSelf: 'center',
    margin: 10,
    alignItems: 'center',
  },
  lable: {
    color: allColors.black,
    fontSize: wp(4.5),
    textAlignVertical: 'center',
    fontFamily: fontNames.JostRegular,
  },

  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  radioButton: {
    padding: 10,
    justifyContent: 'center',
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: allColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: allColors.primaryColor,
  },
});
