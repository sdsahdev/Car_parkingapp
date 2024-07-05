import {View, Text, ImageSourcePropType, StyleSheet, Image} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../Utils/AllColors';
import CommanButton from './CommanButton';
type Props = {
  image: ImageSourcePropType;
  titel: String;
  btntxt: string;
  content: String;
  onpress: () => void;
  oncancle: () => void;
  visible: boolean;
  cabcelshow?: boolean;
};

const CommanModal: React.FC<Props> = ({
  visible,
  image,
  titel,
  content,
  onpress,
  oncancle,
  btntxt,
  cabcelshow,
}) => {
  return (
    <ReactNativeModal
      onTouchCancel={oncancle}
      isVisible={visible}
      onBackdropPress={oncancle}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Image
          source={image}
          style={{width: wp(40), height: hp(20), resizeMode: 'center'}}
        />
        <Text style={styles.title}>{titel}</Text>
        <Text style={styles.contentstyle}>{content}</Text>
        <CommanButton
          titel={btntxt}
          onpress={onpress}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
        {cabcelshow && (
          <CommanButton
            titel={'cancel'}
            onpress={oncancle}
            bgcolor={allColors.gray}
            titelcolor={allColors.primaryColor}
          />
        )}
      </View>
    </ReactNativeModal>
  );
};
const styles = StyleSheet.create({
  contentstyle: {
    color: allColors.black,
    fontFamily: fontNames.JostRegular,
    width: '90%',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: wp(80),
    alignSelf: 'center',
  },
  title: {
    fontSize: wp(8),
    fontFamily: fontNames.JostMedium,
    marginBottom: 20,
    color: allColors.primaryColor,
    margin: wp(3),
    textAlign: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});
export default CommanModal;
