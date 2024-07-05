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
import {fontNames} from '../Utils/AllColors';

interface Item {
  id: string;
  label: string;
}

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  items: Item[];
  onSelect: (item: Item) => void;
  titel?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  items,
  onSelect,
  titel,
}) => {
  const renderItem = ({item}: {item: Item}) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item: Item) => {
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
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
    fontFamily: fontNames.JostMedium,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    fontFamily: fontNames.JostRegular,
  },
});

export default BottomSheet;
