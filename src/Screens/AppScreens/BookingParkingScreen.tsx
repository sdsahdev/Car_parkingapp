import React, {useState} from 'react';
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

import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Slider from '@react-native-community/slider';

import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import CommanButton from '../../Components/CommanButton';

type Props = {navigation: any};

const BookingParkingScreen: React.FC<Props> = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [calendarTheme, setCalendarTheme] = useState({
    calendarBackground: 'white',
    textSectionTitleColor: 'white',
    dayTextColor: 'white',
    todayTextColor: 'white',
    selectedDayTextColor: 'white',
    selectedDayBackgroundColor: 'white',
    arrowColor: 'orange',
    textDisabledColor: 'tranferant',
  });
  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };
  const renderCustomHeader = (date: any) => {
    const month = moment(date).format('MMMM');
    const year = moment(date).format('YYYY');

    return (
      <View style={styles.header}>
        <Text style={styles.monthText}>{`${month} ${year}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Book Parking Details"
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainView}>
        {/* calander view */}
        <View style={styles.saprateView}>
          <Text style={styles.title}>Select Date</Text>
          <View style={{backgroundColor: allColors.gray, borderRadius: 20}}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: allColors.primaryColor,
                  dotColor: allColors.primaryColor,
                },
              }}
              minDate={Date()} // Disable past dates
              style={{backgroundColor: 'transparent'}}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: 'black',
                todayTextColor: 'black',
                textDisabledColor: allColors.placeholder,
                dayTextColor: 'black',
                textMonthFontFamily: fontNames.JostMedium,
              }}
              hideArrows={true}
              renderHeader={renderCustomHeader}
            />
          </View>
        </View>
        {/* slider View */}
        <View style={styles.saprateView}>
          <Text style={[styles.title, {textAlign: 'left'}]}>Distance</Text>
          <Slider
            style={{width: '100%'}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={allColors.primaryColor}
            maximumTrackTintColor="#000000"
            thumbTintColor={allColors.primaryColor}
          />
        </View>
        {/* timing View */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <View style={styles.timerView}>
            <Text style={styles.timertxt}>Start Hour</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.timertxt}>09:00</Text>
              <MaterialIcons
                name={'access-time'}
                size={20}
                color={allColors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timerView}>
            <Text style={styles.timertxt}>End Hour</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.timertxt}>10:00</Text>
              <MaterialIcons
                name={'access-time'}
                size={20}
                color={allColors.black}
              />
            </TouchableOpacity>
          </View>
        </View>

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
        {/*  next button */}
        <CommanButton
          titel={'Continue'}
          onpress={() => navigation.navigate(AllRouteNames.ParkingSportScreen)}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
      </ScrollView>
    </View>
  );
};

export default BookingParkingScreen;

const styles = StyleSheet.create({
  saprateView: {marginVertical: 6},
  timertxt: {
    fontSize: 20,
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
    margin: 4,
  },
  timerView: {width: '40%'},
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: allColors.gray,
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  monthText: {
    fontSize: 20,
    fontFamily: fontNames.JostMedium, // Change the font family of the month title
    color: allColors.black,
  },
  arrow: {
    fontSize: 20,
    color: 'black',
  },
  title: {
    color: allColors.black,
    fontSize: 20,
    fontFamily: fontNames.JostMedium,
    marginVertical: 10,
  },
  mainView: {flex: 1, width: '90%', alignSelf: 'center'},

  container: {
    flex: 1,
    backgroundColor: '#fff',

    padding: 16,
  },
  selectedDateText: {
    marginTop: 16,
    fontSize: 16,
  },
});
