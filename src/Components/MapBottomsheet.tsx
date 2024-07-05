import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {allColors, fontNames} from '../Utils/AllColors';
import Slider from '@react-native-community/slider';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CommanButton from './CommanButton';
import Images from '../Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface data {
  title: string;
  address: string;
}
interface btns {
  okbtn: string;
  cancelbtn: string;
}

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  apply: () => void;
  items: data;
  savechange: () => void;
  save: boolean;
  btns: btns;
}

const MapBottomsheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  items,
  apply,
  savechange,
  save,
  btns,
}) => {
  return (
    <Modal
      statusBarTranslucent
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Details</Text>
        <View style={styles.line} />
        <Image source={Images.car} style={styles.img} />
        <View style={styles.titleView}>
          <View>
            <Text
              style={[styles.title, {textAlign: 'left', marginVertical: 10}]}>
              {items.title}
            </Text>
            <Text style={[styles.address]}>{items.address}</Text>
          </View>

          <TouchableOpacity onPress={savechange}>
            <MaterialCommunityIcons
              name={save ? 'bookmark' : 'bookmark-outline'}
              size={wp(8)}
              color={allColors.primaryColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={styles.btnView}>
          <View style={styles.singlebtnView}>
            <CommanButton
              titel={btns.cancelbtn}
              onpress={onClose}
              bgcolor={allColors.gray}
              titelcolor={allColors.primaryColor}
            />
          </View>
          <View style={styles.singlebtnView}>
            <CommanButton
              titel={btns.okbtn}
              onpress={apply}
              bgcolor={allColors.primaryColor}
              titelcolor={allColors.white}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  singlebtnView: {width: '50%', alignItems: 'center'},
  btnView: {flexDirection: 'row', width: '100%'},

  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  img: {
    width: '90%',
    height: hp(20),
    borderRadius: 10,
    backgroundColor: allColors.gray,
    resizeMode: 'contain',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: allColors.gray,
    marginVertical: 10,
  },
  totletxt: {fontSize: 20, color: allColors.black, fontWeight: 'bold'},
  selectedItem: {
    borderWidth: 1,
    borderColor: allColors.primaryColor,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: allColors.white,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fontNames.JostMedium,
    marginBottom: 10,
    textAlign: 'center',
    color: allColors.black,
  },
  address: {
    fontSize: 12,
    color: allColors.placeholder,
    fontFamily: fontNames.JostRegular,
  },
  item: {
    borderBottomColor: '#ddd',
    borderWidth: 1,
    borderColor: allColors.primaryColor,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: allColors.primaryColor,
  },
  itemText: {
    fontSize: 12,
    color: allColors.white,
  },
});

export default MapBottomsheet;
