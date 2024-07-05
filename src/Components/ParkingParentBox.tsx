import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {allColors} from '../Utils/AllColors';
import ParkingBox from './ParkingBox';
import {useAppDispatch, useAppSelector} from '../Redux/Store/store';
import {Ibooking} from '../Redux/Slices/bookingSlice';
import {FlatList} from 'react-native-gesture-handler';

type Props = {
  flor: string;
  section: number;
};

const ParkingParentBox: React.FC<Props> = ({flor, section}) => {
  const dispatch = useAppDispatch();
  const {bookparking} = useAppSelector(state => state.booking);
  console.log(flor, '===floress');
  const florData = bookparking.filter(i => i.flor == flor);
  const first = florData.slice(section == 1 ? 0 : 6, section == 1 ? 3 : 9);
  const second = florData.slice(section == 1 ? 3 : 9, section == 1 ? 6 : 12);
  interface ParkingBoxProps {
    boxname: string;
    status: number;
  }

  const renderItem: ListRenderItem<Ibooking> = ({item, index}) => {
    console.log(item, '==item');

    return <ParkingBox boxname={item.boxname} status={item.status} />;
  };

  return (
    <View style={styles.contaniner}>
      <View style={styles.childrightView}>
        <FlatList
          style={{flex: 1}}
          data={first}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.childleftView}>
        <FlatList
          style={{flex: 1}}
          data={second}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default ParkingParentBox;

const styles = StyleSheet.create({
  contaniner: {
    flex: 1,
    backgroundColor: allColors.white,
    flexDirection: 'row',
  },
  childleftView: {
    borderLeftWidth: 2,
    borderColor: allColors.placeholder,
    flex: 1,
  },
  childrightView: {flex: 1},
});
