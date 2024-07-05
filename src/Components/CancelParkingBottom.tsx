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
import {allColors, fontNames} from '../Utils/AllColors';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  apply: () => void;
  title: string;
  content: string;
  value: string;
}

const CancelParkingBottom: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  apply,
  title,
  content,
  value,
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
            <Text style={styles.title}>Cancel Parking</Text>
            <View style={styles.line} />

            <Text style={styles.title}>
              Are you sure you want to cancel you Parking Reservation?
            </Text>

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
                  titel={'Yes, Remove'}
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

export default CancelParkingBottom;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: fontNames.JostMedium,
    marginBottom: 10,
    textAlign: 'center',
    color: allColors.black,
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: allColors.gray,
    marginVertical: 10,
  },
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
