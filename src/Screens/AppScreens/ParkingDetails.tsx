import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import Images from '../../Images';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import {updateParkingSpotProperty} from '../../Redux/Slices/parkingSlice';
import DefaltLocation from '../../Components/DefaltLocation';
import CommanButton from '../../Components/CommanButton';

type Props = {
  navigation: any;
};
const ParkingDetails: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {selectedParking} = useAppSelector(state => state.parkingData);

  const fakedata = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining Read more...`;
  if (!selectedParking) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Parking Details"
      />
      <View style={styles.mainView}>
        <Image source={Images.car} style={styles.img} />
        <View style={styles.titleView}>
          <View>
            <Text style={[styles.title, styles.marginVertical]}>
              {selectedParking.name}
            </Text>
            <Text style={styles.address}>{selectedParking.address}</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              dispatch(
                updateParkingSpotProperty({
                  id: selectedParking.id,
                  property: 'save',
                  value: !selectedParking.save,
                }),
              )
            }>
            <MaterialCommunityIcons
              name={selectedParking.save ? 'bookmark' : 'bookmark-outline'}
              size={wp(8)}
              color={allColors.primaryColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.locationView}>
          <DefaltLocation title={selectedParking.rate} icon={'location-on'} />
          <DefaltLocation title="Office" icon={'access-time'} />
          <DefaltLocation title="Valet" icon="" />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.title, styles.descriptionTitle]}>
            Description
          </Text>
          <Text style={styles.descriptionText}>{fakedata}</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.rateButton}>
            <Text style={styles.rateButtonText}>{selectedParking.rate}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnView}>
          <View style={styles.singlebtnView}>
            <CommanButton
              titel={'Cancel'}
              onpress={() => ''}
              bgcolor={allColors.gray}
              titelcolor={allColors.primaryColor}
            />
          </View>
          <View style={styles.singlebtnView}>
            <CommanButton
              titel={'Book Parking'}
              onpress={() => navigation.navigate(AllRouteNames.SelectVehicle)}
              bgcolor={allColors.primaryColor}
              titelcolor={allColors.white}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ParkingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  mainView: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fontNames.JostRegular,
    marginBottom: 10,
    textAlign: 'center',
    color: allColors.black,
  },
  address: {
    fontSize: 12,
    color: allColors.placeholder,
    fontFamily: fontNames.JostRegular,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  img: {
    width: '90%',
    height: hp(20),
    borderRadius: 10,
    backgroundColor: allColors.gray,
    resizeMode: 'contain',
  },
  marginVertical: {
    marginVertical: 10,
  },
  locationView: {
    flexDirection: 'row',
    width: wp(90),
    margin: 5,
  },
  descriptionContainer: {
    flex: 1,
    width: wp(90),
  },
  descriptionTitle: {
    textAlign: 'left',
    marginVertical: 10,
    width: wp(100),
  },
  descriptionText: {
    color: allColors.placeholder,
    fontFamily: fontNames.JostRegular,
  },
  rateButton: {
    backgroundColor: allColors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(6),
    borderRadius: 10,
    margin: 10,
  },
  rateButtonText: {
    color: allColors.primaryColor,
    fontFamily: fontNames.JostMedium,
    fontSize: 20,
  },
  btnView: {
    flexDirection: 'row',
    width: '100%',
  },
  singlebtnView: {
    width: '50%',
    alignItems: 'center',
  },
});
