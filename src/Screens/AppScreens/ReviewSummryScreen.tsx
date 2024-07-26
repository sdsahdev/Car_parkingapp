import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import SelectionBtn, {TItemData} from '../../Components/SelectionBtn';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {Ipayment} from '../../Redux/Slices/PaymentSlice';
import CommanButton from '../../Components/CommanButton';
import CommanModal from '../../Components/CommanModal';
import Images from '../../Images';
import {AddBookingStatus} from '../../Redux/Slices/parkingSlice';

type Props = {navigation: any};

const ReviewSummryScreen: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const paymenrdata = useAppSelector(state => state.PaymentSlice.payments);
  const selected_sport = useAppSelector(
    state => state.parkingData.selectedParking,
  );

  const selectedItem: Ipayment | undefined = paymenrdata.find(
    i => i.select === true,
  );

  const datas = [
    {lable: 'Parking Area', value: 'Parking Lot of Son Manolia'},
    {lable: 'Address', value: '9569, trantow Courts'},
    {lable: 'Vehicle', value: 'Toyota Land Cru (AFD 6397)'},
    {lable: 'Parking Spot', value: 'Parking Lot of Son Manolia'},
    {lable: 'Date', value: 'May 11, 2023'},
    {lable: 'Duration', value: '4 hours'},
    {lable: 'Hours', value: '09:00 AM - 13:00 PM'},
  ];
  const amountData = [
    {lable: 'Amount', value: '$8.0'},
    {lable: 'Taxes & Fees (10%)', value: '0.7'},
  ];
  const totalitem = [{lable: 'Amount', value: '$8.0'}];
  const renderitem = ({item}: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <Text style={styles.title}>{item.lable}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitel
        titel="Review Summary"
        onpress={() => navigation.pop()}
      />
      <View style={styles.mainView}>
        <View style={styles.cardView}>
          <FlatList renderItem={renderitem} data={datas} />
        </View>
        <View style={styles.cardView}>
          <FlatList renderItem={renderitem} data={amountData} />
          <View style={styles.line}></View>
          <FlatList renderItem={renderitem} data={totalitem} />
        </View>
        <SelectionBtn item={selectedItem} />
      </View>

      <CommanButton
        titel={'Continue'}
        onpress={() => {
          setModalVisible(true),
            dispatch(
              AddBookingStatus({
                id: selected_sport.id,
                booking: true,
                status: 1,
                time: Date.now().toLocaleString(),
              }),
            );
        }}
        bgcolor={allColors.primaryColor}
        titelcolor={allColors.white}
      />
      <CommanModal
        btntxt="View Parking Ticket"
        content={'Successfully made payment for you parking'}
        image={Images.congras}
        oncancle={() => setModalVisible(false)}
        onpress={() => {
          navigation.navigate(AllRouteNames.ParkingTicketScreen),
            setModalVisible(false);
        }}
        titel={'Successful!'}
        visible={modalVisible}
        cabcelshow
      />
    </View>
  );
};

export default ReviewSummryScreen;

const styles = StyleSheet.create({
  line: {width: '100%', borderTopWidth: 1, borderColor: allColors.placeholder},
  container: {flex: 1, backgroundColor: allColors.white},
  mainView: {flex: 1, padding: 10, alignItems: 'center'},
  cardView: {
    backgroundColor: allColors.gray,
    width: wp(86),
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  title: {
    color: allColors.placeholder,
    fontFamily: fontNames.JostRegular,
    fontSize: wp(4),
  },
  value: {
    color: allColors.black,
    fontFamily: fontNames.JostMedium,
    fontSize: wp(4),
  },
});
