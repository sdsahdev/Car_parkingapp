import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import SelectionBtn, {TItemData} from '../../Components/SelectionBtn';
import Images from '../../Images';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {changeValue} from '../../Redux/Slices/PaymentSlice';
import CommanButton from '../../Components/CommanButton';
import {allColors, AllRouteNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';

type Props = {
  navigation: any;
};

const SelectPaymentScreen: React.FC<Props> = ({navigation}) => {
  const data = useAppSelector(state => state.PaymentSlice.payments);
  const dispatch = useAppDispatch();

  const renderitem: ListRenderItem<TItemData> = ({item}) => (
    <SelectionBtn item={item} />
  );

  return (
    <View style={styles.container}>
      <HeaderWithTitel titel="Payment" onpress={() => navigation.pop()} />

      <FlatList
        data={data}
        renderItem={renderitem}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <CommanButton
            titel={'Add New Card'}
            onpress={() => navigation.navigate(AllRouteNames.AddCardScreen)}
            bgcolor={allColors.litePrimary}
            titelcolor={allColors.primaryColor}
          />
        }
      />

      <CommanButton
        titel={'Continue'}
        onpress={() => navigation.navigate(AllRouteNames.ReviewSummryScreen)}
        bgcolor={allColors.primaryColor}
        titelcolor={allColors.white}
      />
    </View>
  );
};

export default SelectPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
});
