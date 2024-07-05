import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CameraOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import DefaltLocation from '../../Components/DefaltLocation';
import ParkingParentBox from '../../Components/ParkingParentBox';
import CommanButton from '../../Components/CommanButton';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {resetstate} from '../../Redux/Slices/bookingSlice';
import {Bookingstatus} from '../../Redux/Slices/parkingSlice';
import Images from '../../Images';
import VehicleSlice from '../../Redux/Slices/vehicleSlice';
import CancelParkingBottom from '../../Components/CancelParkingBottom';

type Props = {
  navigation: any;
};

interface IFlor {
  title: string;
  index: number;
}

const BookingStatusScreen: React.FC<Props> = ({navigation}) => {
  const [seletedFlor, setseletedFlor] = useState(1);
  const [modalVisile, setmodalVisile] = useState(false);
  const dispatch = useAppDispatch();

  const bookparking = useAppSelector(state => state.parkingData.data);

  useEffect(() => {
    console.log(bookparking);
  }, [bookparking]);
  const Commanflor = ({title, index}: IFlor) => {
    const selected = seletedFlor == index;
    console.log(selected, index, seletedFlor);

    return (
      <TouchableOpacity
        onPress={() => {
          setseletedFlor(index), dispatch(resetstate());
        }}
        style={[
          styles.florbtn,
          {
            backgroundColor: selected
              ? allColors.primaryColor
              : allColors.white,
            borderColor: !selected ? allColors.primaryColor : allColors.white,
          },
        ]}
        activeOpacity={0.8}>
        <Text
          style={{color: selected ? allColors.white : allColors.primaryColor}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const ongoingData = bookparking?.filter(i => i.status == 1);
  const complete = bookparking?.filter(i => i.status == 2);
  const canceled = bookparking?.filter(i => i.status == 3);

  interface Irender {
    item: Bookingstatus;
    index: number;
  }

  const flatData =
    seletedFlor == 2 ? complete : seletedFlor == 3 ? canceled : ongoingData;
  console.log(flatData, '==dev--');

  const renderItem = ({item, index}: Irender) => {
    return (
      <View style={styles.renderView}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.arrived}
              style={{width: wp(20), height: hp(10), borderRadius: 20}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: allColors.black,
                  fontFamily: fontNames.JostMedium,
                }}>
                Allington Paddock
              </Text>
              <Text
                style={{
                  color: allColors.black,
                  fontFamily: fontNames.JostRegular,
                }}>
                7518 Washington Alley
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: allColors.primaryColor,
                      fontSize: 18,
                      fontFamily: fontNames.JostMedium,
                      textAlignVertical: 'bottom',
                    }}>
                    $8.00
                  </Text>
                  <Text
                    style={{
                      textAlignVertical: 'center',
                      color: allColors.black,
                    }}>
                    /4 hours
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: allColors.primaryColor,
                    padding: 10,
                    borderRadius: 20,
                    margin: 10,
                  }}>
                  <Text style={{color: allColors.white}}>Now Active</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.line} />
          <View style={styles.btnView}>
            <View style={styles.singleBtnView}>
              <CommanButton
                titel={'Cancel Booking'}
                onpress={() => setmodalVisile(true)}
                bgcolor={allColors.gray}
                titelcolor={allColors.primaryColor}
              />
            </View>
            <View style={styles.singleBtnView}>
              <CommanButton
                titel={'View Ticket'}
                onpress={() => ''}
                bgcolor={allColors.primaryColor}
                titelcolor={allColors.white}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderItem2 = ({item, index}: Irender) => {
    return (
      <View style={styles.renderView}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.arrived}
              style={{width: wp(20), height: hp(10), borderRadius: 20}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: allColors.black,
                  fontFamily: fontNames.JostMedium,
                }}>
                Allington Paddock
              </Text>
              <Text
                style={{
                  color: allColors.black,
                  fontFamily: fontNames.JostRegular,
                }}>
                7518 Washington Alley
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: allColors.primaryColor,
                      fontSize: 18,
                      fontFamily: fontNames.JostMedium,
                      textAlignVertical: 'bottom',
                    }}>
                    $8.00
                  </Text>
                  <Text
                    style={{
                      textAlignVertical: 'center',
                      color: allColors.black,
                    }}>
                    /4 hours
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: allColors.green,
                    padding: 10,
                    borderRadius: 20,
                    margin: 10,
                  }}>
                  <Text style={{color: allColors.white}}>Completed</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.line} />
          <View style={styles.btnView}>
            <CommanButton
              titel={'View Ticket'}
              onpress={() => ''}
              bgcolor={allColors.gray}
              titelcolor={allColors.primaryColor}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderItem3 = ({item, index}: Irender) => {
    return (
      <View style={styles.renderView}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.arrived}
              style={{width: wp(20), height: hp(10), borderRadius: 20}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: allColors.black,
                  fontFamily: fontNames.JostMedium,
                }}>
                Allington Paddock
              </Text>
              <Text
                style={{
                  color: allColors.black,
                  fontFamily: fontNames.JostRegular,
                }}>
                7518 Washington Alley
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: allColors.primaryColor,
                      fontSize: 18,
                      fontFamily: fontNames.JostMedium,
                      textAlignVertical: 'bottom',
                    }}>
                    $8.00
                  </Text>
                  <Text
                    style={{
                      textAlignVertical: 'center',
                      color: allColors.black,
                    }}>
                    /4 hours
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 20,
                    margin: 10,
                    borderColor: allColors.red,
                    borderWidth: 1,
                  }}>
                  <Text style={{color: allColors.red}}>Canceled</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Pick Parking Spot"
        img
      />

      <View style={styles.mainView}>
        <View style={styles.florView}>
          <Commanflor title="Ongoing" index={1} />
          <Commanflor title="Completed" index={2} />
          <Commanflor title="Canceled" index={3} />
        </View>

        <FlatList
          data={flatData}
          renderItem={
            seletedFlor == 3
              ? renderItem3
              : seletedFlor == 2
              ? renderItem2
              : renderItem
          }
          style={{marginTop: 20}}
        />
      </View>
      <CancelParkingBottom
        apply={() => {
          navigation.navigate(AllRouteNames.CancelParkingScreen),
            setmodalVisile(false);
        }}
        onClose={() => setmodalVisile(false)}
        content="Cancel Parking"
        isVisible={modalVisile}
        title="Are you sure you want to cancel you Parking Reservation?"
        value="Only 80% of the money you can refund from your payment according tp our policy"
      />
    </View>
  );
};

export default BookingStatusScreen;

const styles = StyleSheet.create({
  line: {borderTopWidth: 1, borderColor: allColors.gray},
  renderView: {
    flex: 1,
    backgroundColor: allColors.litegray,
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timertxt: {
    fontSize: 20,
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
  },
  florbtn: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
  },
  florView: {flexDirection: 'row', justifyContent: 'space-evenly'},
  mainView: {flex: 1, backgroundColor: allColors.white, padding: 10},
  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  btnView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  singleBtnView: {
    width: '50%',
    alignItems: 'center',
  },
});
