import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import CommanButton from '../../Components/CommanButton';
import TikitComponent from '../../Components/TikitComponent';
type Props = {navigation: any};

const ParkingTicketScreen: React.FC<Props> = ({navigation}) => (
  <View style={styles.container}>
    <HeaderWithTitel titel="Parking Ticket" onpress={() => navigation.pop()} />
    <TikitComponent />
    <CommanButton
      titel={'Navigate to Parking Lot'}
      onpress={() => navigation.navigate(AllRouteNames.DirectoionMapScreen)}
      bgcolor={allColors.primaryColor}
      titelcolor={allColors.white}
    />
  </View>
);

export default ParkingTicketScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  dashed: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: '90%',
    alignSelf: 'center',
    borderColor: allColors.gray,
  },
  container: {flex: 1, backgroundColor: allColors.white},

  mainView: {flex: 1, padding: 20},
  firstView: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: allColors.gray,
    borderStyle: 'solid',
    borderRadius: 20,
    alignItems: 'center',
  },
  secondView: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: allColors.gray,
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 20,
  },
});
