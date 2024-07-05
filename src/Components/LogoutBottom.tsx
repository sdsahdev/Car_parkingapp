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

interface btns {
  okbtn: string;
  cancelbtn: string;
}

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  apply: () => void;
  save: boolean;
  btns: btns;
}

const LogoutBottom: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  apply,
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
        <Text style={styles.title}>Logout</Text>
        <View style={styles.line} />
        <Text style={styles.content}>Are you sure you want to log out?</Text>

        <CommanButton
          titel={btns.cancelbtn}
          onpress={onClose}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />

        <CommanButton
          titel={btns.okbtn}
          onpress={apply}
          bgcolor={allColors.gray}
          titelcolor={allColors.primaryColor}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    fontSize: wp(5),
    color: allColors.black,
    fontFamily: fontNames.JostRegular,
  },
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

export default LogoutBottom;
