import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {allColors, fontNames} from '../Utils/AllColors';

type Props = {};
export const dataone = [
  {lable: 'Name', value: 'Andrew Ainsley'},
  {lable: 'Vehicle', value: 'Toyota (AFD 6397)'},
  {lable: 'Parking Area', value: 'San Manolia'},
  {lable: 'Parking Spot', value: '09 Am - 13 PM'},
  {lable: 'Duration', value: '4 hours'},
  {lable: 'Date', value: '09 Am - 13 PM'},
  {lable: 'Hours', value: '09 Am - 13 PM'},
  {lable: 'Phone', value: '09 Am - 13 PM'},
];
export const renderItem = ({item, index}: any) => {
  return (
    <View style={{flex: 1, margin: 2}}>
      <Text
        style={{
          color: allColors.placeholder,
          fontFamily: fontNames.JostRegular,
          margin: 2,
        }}>
        {item.lable}
      </Text>
      <Text
        style={{
          color: allColors.black,
          fontFamily: fontNames.JostMedium,
          margin: 2,
        }}>
        {item.value}
      </Text>
    </View>
  );
};
const TikitComponent = (props: Props) => {
  return (
    <View style={styles.mainView}>
      <View style={[styles.firstView]}>
        <MaterialIcons
          name={'qr-code-2'}
          size={wp(60)}
          color={allColors.black}
        />
      </View>
      <View style={styles.dashed} />
      <View style={[styles.secondView]}>
        <FlatList
          style={{margin: 5}}
          numColumns={2} // set number of columns
          columnWrapperStyle={styles.row} // space them out evenly
          data={dataone}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default TikitComponent;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  dashed: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: '80%',
    borderColor: allColors.gray,
    alignSelf: 'center',
  },
  container: {flex: 1, backgroundColor: allColors.white},
  mainView: {
    padding: 20,
    alignItems: 'center',

    justifyContent: 'center',
    flex: 1,
  },
  firstView: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: allColors.gray,
    borderStyle: 'solid',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: allColors.white,
    width: wp(80),
  },
  secondView: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: allColors.gray,
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 20,
    backgroundColor: allColors.white,
    width: wp(80),
  },
});
