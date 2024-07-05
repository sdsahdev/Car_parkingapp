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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import Images from '../../Images';
import DefaltLocation from '../../Components/DefaltLocation';
import CommanModal from '../../Components/CommanModal';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import MapBottomsheet from '../../Components/MapBottomsheet';
import {
  setSelected,
  updateParkingSpotProperty,
} from '../../Redux/Slices/parkingSlice';

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [ispermission, setispermission] = useState(false);
  const [visibleBottam, setVisibleBottam] = useState(false);
  const parkingData = useAppSelector(state => state.parkingData.data);

  const dispatch = useAppDispatch();
  const {selectedParking} = useAppSelector(state => state.parkingData);

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
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(allColors.statusBarColor);
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);

  console.log(selectedParking, ' ', '==devcheck');
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

  console.log(selectedParking?.save, 'save value');

  return (
    <View style={styles.container}>
      {ispermission == true ? (
        <>
          <MapView
            style={styles.map}
            ref={mapRef}
            initialRegion={{
              latitude: 18.57430388872172,
              longitude: 73.74246492343158,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {/* Example markers */}
            {parkingData.map((spot: any) => (
              <Marker
                key={spot.id}
                onPress={() => {
                  setVisibleBottam(true), dispatch(setSelected(spot));
                }}
                coordinate={{
                  latitude: parseFloat(spot.latitude), // Convert latitude to number
                  longitude: parseFloat(spot.longitude), // Convert longitude to number
                }}
                icon={Images.parking}>
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{spot.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
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
        </>
      ) : (
        <View style={styles.ongps}>
          <MaterialIcons
            name={'location-off'}
            size={50}
            color={allColors.primaryColor}
          />
          <Text style={styles.gpstxt}>
            Please turn on your GPS to get Service
          </Text>
        </View>
      )}

      <View style={{flex: 1}}>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(AllRouteNames.SeachScreen)}
            activeOpacity={0.8}
            style={styles.btns}>
            <AntDesign
              name="search1"
              size={wp(5)}
              color={allColors.primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(AllRouteNames.NotificationScreen)
            }
            activeOpacity={0.8}
            style={styles.btns}>
            <AntDesign
              name="bells"
              size={wp(5)}
              color={allColors.primaryColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gpsView}>
          <TouchableOpacity activeOpacity={0.8} style={styles.btns}>
            <MaterialCommunityIcons
              name="bank"
              size={wp(5)}
              color={allColors.primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => requestLocationPermission()}
            activeOpacity={0.8}
            style={[styles.btns, {backgroundColor: allColors.primaryColor}]}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={wp(5)}
              color={allColors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.locationsView}>
          <DefaltLocation title="Home" icon="location-on" />
          <DefaltLocation title="Office" icon="location-on" />
          <DefaltLocation title="Hospitals" icon="location-on" />
        </View>
      </View>

      <MapBottomsheet
        apply={() => {
          setVisibleBottam(false);
          navigation.navigate(AllRouteNames.ParkingDetails);
        }}
        isVisible={visibleBottam}
        items={{
          title: selectedParking.name,
          address: selectedParking.address,
        }}
        onClose={() => setVisibleBottam(false)}
        save={selectedParking?.save}
        savechange={() =>
          dispatch(
            updateParkingSpotProperty({
              id: selectedParking.id,
              property: 'save',
              value: !selectedParking?.save,
            }),
          )
        }
        btns={{
          okbtn: 'Details',
          cancelbtn: 'Cancel',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationsView: {flexDirection: 'row'},
  gpstxt: {
    color: allColors.primaryColor,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontNames.JostRegular,
  },
  ongps: {
    position: 'absolute',
    flex: 1,
    width: wp(98),
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutContainer: {
    width: 150,
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
  flatList: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 10,
    maxHeight: 150, // Adjust height as needed
    backgroundColor: 'white',
    zIndex: 100, // Ensure the FlatList appears above the map
  },
  listItem: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    minWidth: 150,
    maxWidth: 200, // Adjust width as needed
  },
  gpsView: {
    alignSelf: 'flex-end',
    right: 20,
    bottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  },
  btns: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: allColors.graywhite,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
