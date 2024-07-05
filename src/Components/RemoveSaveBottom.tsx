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
  address: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  rate: string;
  save: boolean;
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
  btns: btns;
}

const RemoveSaveBottom: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  items,
  apply,
  savechange,

  btns,
}) => {
  return (
    <Modal
      statusBarTranslucent
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Remove from Bookmark?</Text>
        <View style={styles.line} />
        <View style={styles.renderTouch}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: 'https://picsum.photos/200/300'}}
              style={styles.img}
            />
            <View style={styles.paraneTxt}>
              <Text style={styles.title}>{items?.name}</Text>
              <Text style={styles.value}>{items?.address}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={savechange}>
            <MaterialCommunityIcons
              name={true ? 'bookmark' : 'bookmark-outline'}
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
  renderTouch: {
    width: wp(90),
    borderRadius: 10,
    backgroundColor: allColors.litegray,
    resizeMode: 'contain',
    paddingVertical: 10,
    marginVertical: hp(2),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  paraneTxt: {
    flexDirection: 'column',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
  },
  value: {
    fontSize: 14,
    fontFamily: fontNames.JostRegular,
    color: allColors.black,
  },
  img: {
    width: wp(20),
    height: hp(8),
    resizeMode: 'cover',
    borderRadius: 20,
    margin: wp(2),
  },
  singlebtnView: {width: '50%', alignItems: 'center'},
  btnView: {flexDirection: 'row', width: '100%'},

  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
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

export default RemoveSaveBottom;
