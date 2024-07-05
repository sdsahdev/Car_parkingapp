import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Images from '../../Images';
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {useIsFocused} from '@react-navigation/native';
import HeaderWithTitel from '../../Components/HeaderWithTitel';

type Props = {
  navigation: any;
};

const DirectoionMapScreen: React.FC<Props> = ({navigation}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const {selectedParking} = useAppSelector(state => state.parkingData);
  const parkingData = useAppSelector(state => state.parkingData.data);

  const [error, setError] = useState<string | null>(null);
  const [ispermission, setispermission] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
        setispermission(true);
        focusOnCurrentLocation();
      } else {
        const requestResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (requestResult === RESULTS.GRANTED) {
          getCurrentLocation();
          setispermission(true);
          focusOnCurrentLocation();
        } else {
          setError('Location permission denied');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Error requesting location permission');
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(isFocused, 'HomeScreens');

    if (isFocused) {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, [isFocused]);

  const focusOnCurrentLocation = () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };
  const mapRef = React.useRef<MapView>(null); // Ref for accessing MapView methods

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setError(null);
      },
      error => {
        console.error(error);
        setError(error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };
  const coordinates = React.useMemo(() => {
    if (location && selectedParking) {
      return [
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: selectedParking.latitude,
          longitude: selectedParking.longitude,
        },
      ];
    }
    return [];
  }, [location, selectedParking]);

  return (
    <View style={styles.container}>
      {ispermission && (
        <React.Fragment>
          <MapView
            style={styles.map}
            ref={mapRef}
            initialRegion={{
              latitude: 18.57430388872172,
              longitude: 73.74246492343158,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              key={selectedParking.id}
              coordinate={{
                latitude: Number(selectedParking.latitude),
                longitude: Number(selectedParking.longitude),
              }}>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>
                    {selectedParking.name}
                  </Text>
                </View>
              </Callout>
            </Marker>

            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your Location"
                description="This is your current location"
                icon={Images.car}
              />
            )}
            {coordinates.length > 0 && (
              <Polyline
                coordinates={coordinates}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            )}
          </MapView>
        </React.Fragment>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="compass"
              size={wp(8)}
              color={allColors.primaryColor}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>San Manolia Parking</Text>
            <Text style={styles.value}>9569, Trantow Courts</Text>
          </View>
        </View>

        <View style={styles.gpsView}>
          <TouchableOpacity
            onPress={requestLocationPermission}
            activeOpacity={0.8}
            style={[styles.btns, {backgroundColor: allColors.primaryColor}]}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={wp(5)}
              color={allColors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => ''}
              activeOpacity={0.8}
              style={[styles.locationbtns, {backgroundColor: allColors.white}]}>
              <Entypo
                name="location-pin"
                size={wp(6)}
                color={allColors.primaryColor}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>San Manolia Parking</Text>
              <Text style={styles.value}>9569, Trantow Courts</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(AllRouteNames.ArrivedScreen)}
            activeOpacity={0.8}
            style={[styles.locationbtns, {backgroundColor: allColors.litered}]}>
            <MaterialCommunityIcons
              name="close"
              size={wp(8)}
              color={allColors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DirectoionMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    backgroundColor: allColors.primaryColor,
    marginTop: hp(8),
    borderRadius: 100,
    alignItems: 'center',
    padding: wp(4),
    flexDirection: 'row',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    backgroundColor: allColors.white,
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: wp(4),
    color: allColors.white,
    fontFamily: fontNames.JostMedium,
  },
  value: {
    fontSize: wp(3.5),
    color: allColors.white,
    fontFamily: fontNames.JostRegular,
  },
  gpsView: {
    alignSelf: 'flex-end',
    right: wp(6),
    bottom: '5%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  btns: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: allColors.graywhite,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    alignSelf: 'flex-end',
  },
  locationbtns: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: allColors.graywhite,
    alignItems: 'center',
    justifyContent: 'center',
    margin: wp(2),
  },
  bottomView: {
    backgroundColor: allColors.primaryColor,
    width: wp(100),
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calloutContainer: {
    padding: 5,
    backgroundColor: allColors.litered,
    borderRadius: 10,
    borderBottomStartRadius: 0,
    alignSelf: 'flex-end',
  },
  calloutTitle: {
    fontFamily: fontNames.JostMedium,
    color: allColors.white,
  },
});
