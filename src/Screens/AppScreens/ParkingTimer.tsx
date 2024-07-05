import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CountdownTimer from '../../Components/CountdownTimer';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import CommanButton from '../../Components/CommanButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {navigation: any};

const ParkingTimer: React.FC<Props> = ({navigation}) => {
  const handleTimerEnd = () => {
    console.log('Timer ended!');
    // Perform any action you want when the timer ends
  };

  const [datas] = useState([
    {lable: 'Parking Area', value: 'Parking Lot of Son Manolia'},
    {lable: 'Parking Area', value: 'Parking Lot of Son Manolia'},
    {lable: 'Parking Area', value: 'Parking Lot of Son Manolia'},
    {lable: 'Parking Area', value: 'Parking Lot of Son Manolia'},
    {lable: 'Parking Area', value: 'Parking Lot of Son Manolia'},
  ]);

  useEffect(() => {
    // Any initialization or side effects can be managed here
  }, []);

  const renderItems = () => {
    return datas.map((item, index) => (
      <View key={index} style={styles.listItem}>
        <Text style={styles.title}>{item.lable}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    ));
  };

  return (
    <View>
      <HeaderWithTitel onpress={() => navigation.pop()} titel="Parking Timer" />
      <ScrollView
        contentContainerStyle={styles.container}
        style={{marginBottom: 30}}>
        <View style={styles.timerContainer}>
          <CountdownTimer initialSeconds={300} onEnd={handleTimerEnd} />
        </View>
        <View style={styles.itemsContainer}>{renderItems()}</View>
        <View style={styles.footer}>
          <CommanButton
            titel={'Extend Parking Time'}
            onpress={() => navigation.navigate(AllRouteNames.ExtendtimeScreen)}
            bgcolor={allColors.primaryColor}
            titelcolor={allColors.white}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: allColors.white, // Set the background color for the entire screen
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  itemsContainer: {
    marginVertical: 10,
    backgroundColor: allColors.gray,
    borderRadius: 10,
  },
  footer: {
    marginVertical: 4,
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 5,
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

export default ParkingTimer;
