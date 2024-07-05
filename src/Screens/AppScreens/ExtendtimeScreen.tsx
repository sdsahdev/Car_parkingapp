import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import SelectionBtn, {TItemData} from '../../Components/SelectionBtn';
import Images from '../../Images';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {changeValue} from '../../Redux/Slices/PaymentSlice';
import CommanButton from '../../Components/CommanButton';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import Slider from '@react-native-community/slider';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  navigation: any;
};

const ExtendtimeScreen: React.FC<Props> = ({navigation}) => {
  const data = useAppSelector(state => state.PaymentSlice.payments);
  const dispatch = useAppDispatch();

  const renderitem: ListRenderItem<TItemData> = ({item}) => (
    <SelectionBtn item={item} />
  );

  return (
    <View style={styles.container}>
      <HeaderWithTitel
        titel="Extend Parking Time"
        onpress={() => navigation.pop()}
      />
      <View style={styles.parantView}>
        <Text style={styles.title}>Add Duration</Text>
        <View style={styles.mainView}>
          <Slider
            style={{
              width: '100%',
              height: 20,
              marginVertical: 10,
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={allColors.primaryColor}
            maximumTrackTintColor="#000000"
            thumbTintColor={allColors.primaryColor}
          />
        </View>

        <Text style={styles.title}>Choose Payment Methods</Text>

        <FlatList
          data={data}
          renderItem={renderitem}
          keyExtractor={item => item.id}
        />
        {/* total View */}
        <View style={styles.saprateView}>
          <Text style={styles.timertxt}>Total</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: allColors.primaryColor,
                fontSize: 25,
                fontFamily: fontNames.JostMedium,

                textAlignVertical: 'bottom',
              }}>
              $8.00
            </Text>
            <Text style={{textAlignVertical: 'center', color: allColors.black}}>
              /4 hours
            </Text>
          </View>
        </View>
        <CommanButton
          titel={'Continue'}
          onpress={() => ''}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
      </View>
    </View>
  );
};

export default ExtendtimeScreen;

const styles = StyleSheet.create({
  parantView: {
    flex: 1,
    width: '100%',
    backgroundColor: allColors.white,
    alignSelf: 'center',
  },
  saprateView: {
    marginVertical: 6,

    width: '90%',
    alignSelf: 'center',
  },
  timertxt: {
    fontSize: 20,
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
    margin: 4,
  },
  mainView: {
    flex: 1,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    fontSize: 20,
    color: allColors.black,
    fontFamily: fontNames.JostMedium,
  },
  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
});
