import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CommanButton from './CommanButton';
import Images from '../Images';
import CommanEdittxt from './CommanEdittxt';
import {allColors} from '../Utils/AllColors';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  apply: () => void;
  pickupImage: () => void;
  img: string | null;
  vehicleName: string;
  setVehicleName: (txt: string) => void;
  badVehicleName: String;
  numberPlate: string;
  setNumberPlate: (txt: string) => void;
  badNumberPlate: string;
}

const AddCarBottomsheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  apply,
  pickupImage,
  img,
  vehicleName,
  setVehicleName,
  badVehicleName,
  numberPlate,
  setNumberPlate,
  badNumberPlate,
}) => {
  return (
    <Modal
      statusBarTranslucent
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalContent}>
            <CommanEdittxt
              onpress={() => ''}
              placeholder="Vehicle Name"
              value={vehicleName}
              onChangeText={setVehicleName}
              isValide={badVehicleName === ''}
            />
            <CommanEdittxt
              onpress={() => ''}
              placeholder="Vehicle Number"
              value={numberPlate}
              onChangeText={setNumberPlate}
              isValide={badNumberPlate === ''}
              errorMessage={badNumberPlate}
            />
            <CommanButton
              titel={'Upload Vehicle Image'}
              onpress={pickupImage}
              bgcolor={allColors.primaryColor}
              titelcolor={allColors.white}
            />

            {img && (
              <Image
                source={img ? {uri: img} : Images.gallary}
                style={{width: wp(30), height: hp(20), resizeMode: 'contain'}}
              />
            )}

            <View style={styles.btnView}>
              <View style={styles.singleBtnView}>
                <CommanButton
                  titel={'Cancel'}
                  onpress={onClose}
                  bgcolor={allColors.gray}
                  titelcolor={allColors.primaryColor}
                />
              </View>
              <View style={styles.singleBtnView}>
                <CommanButton
                  titel={'Add Vehicle'}
                  onpress={apply}
                  bgcolor={allColors.primaryColor}
                  titelcolor={allColors.white}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddCarBottomsheet;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  keyboardAvoidingView: {},
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  btnView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  singleBtnView: {
    width: '50%',
    alignItems: 'center',
  },
});
