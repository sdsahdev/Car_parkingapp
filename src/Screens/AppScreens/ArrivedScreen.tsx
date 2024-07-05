import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../../Images';
import CommanModal from '../../Components/CommanModal';
import {allColors, AllRouteNames} from '../../Utils/AllColors';
import TikitComponent from '../../Components/TikitComponent';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  navigation: any;
};

const ArrivedScreen: React.FC<Props> = ({navigation}) => {
  const [isVisible, setisVisible] = useState(true);
  const [whichModal, setWhichModal] = useState(0);
  const [isTikit, setisTikit] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(isFocused, 'HomeScreens');

    if (isFocused) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(allColors.statusBarColor);
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isTikit ? (
        <View
          style={{
            backgroundColor: allColors.primaryColor,
            flex: 1,
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              setWhichModal(1);
              setisVisible(true);
            }}>
            <TikitComponent />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Image
            source={Images.arrived}
            style={{
              resizeMode: 'stretch',
              width: wp(100),
              height: hp(100),
            }}
          />
        </>
      )}
      <CommanModal
        image={Images.congras}
        titel={whichModal == 0 ? 'You have arrived!' : 'Scan Ticket Success!'}
        content={
          whichModal == 0
            ? 'Please scan your Parking QR Cod on the scanner machine to enter'
            : 'Your Vehicle is parked and the time will be counted down'
        }
        oncancle={() => setisVisible(false)}
        onpress={() => {
          setisVisible(false), setisTikit(true);
          whichModal == 1 && navigation.navigate(AllRouteNames.ParkingTimer);
        }}
        visible={isVisible}
        btntxt={'ok'}
      />
    </View>
  );
};

export default ArrivedScreen;

const styles = StyleSheet.create({});
