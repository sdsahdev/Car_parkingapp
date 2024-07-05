import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectionBtn, {TItemData} from '../../Components/SelectionBtn';
import Images from '../../Images';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {changeValue} from '../../Redux/Slices/PaymentSlice';
import CommanButton from '../../Components/CommanButton';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import CommanModal from '../../Components/CommanModal';

type Props = {
  navigation: any;
};

const CancelParkingScreen: React.FC<Props> = ({navigation}) => {
  const data = useAppSelector(state => state.PaymentSlice.payments);
  const dispatch = useAppDispatch();
  const [visibleModal, setvisibleModal] = useState(false);
  const renderitem: ListRenderItem<TItemData> = ({item}) => (
    <SelectionBtn item={item} />
  );

  return (
    <View style={styles.container}>
      <HeaderWithTitel
        titel="Cancel Parking"
        onpress={() => navigation.pop()}
      />
      <View style={styles.mainView}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={styles.value}>
            Please select a payment refund method (only 80% will be refunded).
          </Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderitem}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={styles.value}>Paid: $4.81</Text>
        <Text
          style={[
            styles.value,
            {fontFamily: fontNames.JostMedium, marginHorizontal: 10},
          ]}>
          Refund: $3.84
        </Text>
      </View>

      <CommanButton
        titel={'Continue'}
        onpress={() => setvisibleModal(true)}
        bgcolor={allColors.primaryColor}
        titelcolor={allColors.white}
      />
      <CommanModal
        btntxt="ok"
        content={
          'You have successfully canceled your parking order. 80% funds will be returned to your accound'
        }
        image={Images.congras}
        oncancle={() => setvisibleModal(false)}
        onpress={() => {
          setvisibleModal(false);
        }}
        titel={'Successful!'}
        visible={visibleModal}
      />
    </View>
  );
};

export default CancelParkingScreen;

const styles = StyleSheet.create({
  mainView: {alignSelf: 'center', flex: 1},
  value: {
    fontSize: wp(3.5),
    color: allColors.black,
    fontFamily: fontNames.JostRegular,
  },
  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
});
