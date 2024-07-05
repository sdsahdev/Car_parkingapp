import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allColors, fontNames} from '../Utils/AllColors';
import Images from '../Images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: any;
  icon: string;
};

const DefaltLocation: React.FC<Props> = ({title, icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={wp(5)}
          color={allColors.primaryColor}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DefaltLocation;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: allColors.white,
    padding: 5,
    borderColor: allColors.primaryColor,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    marginHorizontal: 10,
    color: allColors.primaryColor,
    fontFamily: fontNames.JostMedium,
  },
});
