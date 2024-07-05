import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import {allColors, fontNames} from '../Utils/AllColors';
import Slider from '@react-native-community/slider';
import ToggleSwitch from 'toggle-switch-react-native';
import CommanButton from './CommanButton';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  apply: () => void;
  items: string[];
  titel?: string;
  selectedItem?: string;
  onSelect: (item: string) => void;
  toggle: boolean;
  changeToggle: any;
}

const FilterModal: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  items,
  onSelect,
  selectedItem,
  titel,
  toggle,
  changeToggle,
  apply,
}) => {
  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[selectedItem == item ? styles.item : styles.selectedItem]}
      onPress={() => handleItemPress(item)}>
      <Text
        style={[
          selectedItem == item
            ? styles.itemText
            : {color: allColors.primaryColor, fontSize: 12},
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item: string) => {
    onSelect(item);
    onClose();
  };

  return (
    <Modal
      statusBarTranslucent
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{titel}</Text>
        <View style={styles.line} />
        <Text style={[styles.title, {textAlign: 'left'}]}>Sort by</Text>
        <FlatList horizontal data={items} renderItem={renderItem} />
        <Text style={[styles.title, {textAlign: 'left'}]}>
          {selectedItem ? selectedItem : items[0]}
        </Text>

        <Slider
          style={{width: '90%', height: 20, marginVertical: 10}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={allColors.primaryColor}
          maximumTrackTintColor="#000000"
          thumbTintColor={allColors.primaryColor}
        />

        <View style={styles.mainView}>
          <Text style={styles.vitalParking}>Valet Parking</Text>
          <ToggleSwitch
            isOn={toggle}
            onColor={allColors.primaryColor}
            offColor="red"
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="small"
            onToggle={changeToggle}
          />
        </View>

        <View style={styles.btnView}>
          <View style={styles.btns}>
            <CommanButton
              titel={'Reset'}
              onpress={() => ''}
              bgcolor={allColors.gray}
              titelcolor={allColors.primaryColor}
            />
          </View>
          <View style={styles.btns}>
            <CommanButton
              titel={'Apply Filter'}
              onpress={() => ''}
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
  btns: {width: '50%', alignItems: 'center'},
  btnView: {flexDirection: 'row', width: '100%'},
  vitalParking: {
    fontSize: 20,
    color: allColors.black,
    fontFamily: fontNames.JostMedium,
  },
  mainView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    alignSelf: 'center',
    borderColor: allColors.gray,
    marginVertical: 20,
  },
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
  },
  title: {
    fontSize: 18,
    fontFamily: fontNames.JostMedium,
    marginVertical: 20,
    textAlign: 'center',
    color: allColors.black,
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
    fontFamily: fontNames.JostRegular,
  },
});

export default FilterModal;
