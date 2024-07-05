import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {allColors, fontNames} from '../Utils/AllColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native';
type Props = {
  toggle: boolean;
  onchange?: () => void;
  click: () => void;
  istoggaleVisible?: boolean;
  img: string;
  name: string;
};

const MenuProfile: React.FC<Props> = ({
  toggle,
  onchange,
  istoggaleVisible,
  img,
  name,
  click,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={click}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons name={img} size={30} color={allColors.placeholder} />
        <Text style={styles.txt}>{name}</Text>
      </TouchableOpacity>
      {istoggaleVisible && (
        <ToggleSwitch
          isOn={toggle}
          onColor={allColors.primaryColor}
          offColor={allColors.gray}
          labelStyle={{color: 'black', fontWeight: '900'}}
          size="small"
          onToggle={onchange}
        />
      )}
    </View>
  );
};

export default MenuProfile;

const styles = StyleSheet.create({
  txt: {
    fontSize: wp(5),
    color: allColors.black,
    fontFamily: fontNames.JostMedium,
    marginLeft: 20,
  },
});
