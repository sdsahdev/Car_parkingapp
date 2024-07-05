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

type Props = {
  navigation: any;
};

interface IFlor {
  title: string;

  index: number;
}

const ParkingSportScreen: React.FC<Props> = ({navigation}) => {
  const [seletedFlor, setseletedFlor] = useState(1);
  const dispatch = useAppDispatch();

  const bookparking = useAppSelector(state => state.booking.bookparking);

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

  const wayText = ({item}: any) => {
    return (
      <View>
        <Text
          style={{
            color: allColors.black,
            alignSelf: 'center',
            textAlignVertical: 'center',
            flex: 1,
            marginVertical: 2,
            transform: [{rotate: '-90deg'}],
            justifyContent: 'center',
          }}>
          {item}
        </Text>
      </View>
    );
  };
  const wayText2 = ({item, index}: any) => {
    return (
      <View>
        <Text
          style={{
            color: allColors.placeholder,
            alignSelf: 'center',
            textAlignVertical: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flex: 1,
            marginVertical: 16,
            fontSize: index == 0 ? 50 : 30,
          }}>
          {item}
        </Text>
      </View>
    );
  };
  const string2way = '2 Way traffic';
  const stringdash = '│││││↓';
  const strinhorizontledash = '── ── ── ── ── →';
  return (
    <View style={styles.container}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Pick Parking Spot"
      />

      <View style={styles.mainView}>
        <View style={styles.florView}>
          <Commanflor title="1st Floor" index={1} />
          <Commanflor title="2st Floor" index={2} />
          <Commanflor title="3st Floor" index={3} />
        </View>
        {/* parant flor view */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            margin: 10,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Entry View */}

          <View
            style={{
              width: wp(30),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: wp(10),
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10, // Padding inside the border
              }}>
              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={string2way.toUpperCase().split('').reverse()}
                renderItem={wayText}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
              />
            </View>
            <View
              style={{
                width: wp(15),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.timertxt}>Entry</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                data={stringdash.toUpperCase().split('').reverse()}
                renderItem={wayText2}
              />
            </View>
            <View style={{flex: 1}}></View>
          </View>

          {/* parking View */}
          <View style={{flex: 1}}>
            {/* first phase */}
            <View style={{height: '40%'}}>
              <ParkingParentBox section={1} flor={seletedFlor.toString()} />
            </View>
            {/* second phase */}

            <View style={{height: '20%'}}>
              <Text
                style={{
                  fontSize: 40,
                  color: allColors.placeholder,
                  top: '16%',
                }}>
                → ⎯ ⎯ ⎯
              </Text>
            </View>
            {/* third phase */}

            <View style={{height: '40%'}}>
              <ParkingParentBox section={2} flor={seletedFlor.toString()} />
            </View>
          </View>
        </View>

        <CommanButton
          titel={'Continue'}
          onpress={() => navigation.navigate(AllRouteNames.SelectPaymentScreen)}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
      </View>
    </View>
  );
};

export default ParkingSportScreen;

const styles = StyleSheet.create({
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
});
