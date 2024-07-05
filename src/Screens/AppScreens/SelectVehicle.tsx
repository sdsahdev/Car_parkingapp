import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {
  changeValue,
  deleteVehicle,
  Ivehicle,
  setVehicle,
} from '../../Redux/Slices/vehicleSlice';
import Images from '../../Images';
import AddCarBottomsheet from '../../Components/AddCarBottomsheet';
import CommanButton from '../../Components/CommanButton';
type Props = {navigation: any};

const SelectVehicle: React.FC<Props> = ({navigation}) => {
  const [visibleBottom, setvisibleBottom] = useState(false);
  const [imageUri, setImageuri] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [badNumberPlate, setBadNumberPlate] = useState('');
  const [badVehicleName, setBadVehicleName] = useState('');

  const parkingData = useAppSelector(state => state.vehicle.vehicles);
  const dispatch = useAppDispatch();
  const handleAddItem = () => {
    const data = {
      id: Date.now().toLocaleString(),
      img: imageUri as any,
      name: vehicleName,
      number: numberPlate,
      select: false,
    };
    dispatch(setVehicle(data));
    setvisibleBottom(false);
    setImageuri('');
    setNumberPlate(''), setVehicleName('');
  };
  const selectImage = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageuri(uri || '');
        return uri;
      }
    });
  };
  const renderItem = ({item}: {item: Ivehicle}) => {
    console.log(item?.img);

    return (
      <TouchableOpacity
        onPress={
          () =>
            dispatch(
              changeValue({
                id: item.id,
                property: 'select',
                value: !item.select,
              }),
            )
          // dispatch(deleteVehicle(item.id))
        }
        style={[
          styles.renderbtn,
          {
            borderColor: item.select ? allColors.primaryColor : allColors.gray,
          },
        ]}>
        <View style={styles.txtcontain}>
          <Image
            source={item.img ? {uri: item?.img} : Images.car}
            style={styles.img}
          />
          <View style={styles.centerjusti}>
            <Text style={styles.lable}>{item.name}</Text>
            <Text style={[styles.lable, {fontSize: 14}]}>{item.number}</Text>
          </View>
        </View>

        <View style={styles.radioButton}>
          <View style={styles.radioButtonOuter}>
            {item.select && <View style={styles.radioButtonInner} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderFooter = () => (
    <CommanButton
      titel={'Add Vehicle'}
      onpress={() => setvisibleBottom(true)}
      bgcolor={allColors.litePrimary}
      titelcolor={allColors.primaryColor}
    />
  );
  return (
    <View style={styles.container}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Select Your Vehicle"
      />

      <FlatList
        data={parkingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{flex: 1}}
      />
      <CommanButton
        titel={'Continue'}
        onpress={() => navigation.navigate(AllRouteNames.BookingParkingScreen)}
        bgcolor={allColors.primaryColor}
        titelcolor={allColors.white}
      />

      <AddCarBottomsheet
        badNumberPlate={badNumberPlate}
        badVehicleName={badVehicleName}
        setNumberPlate={setNumberPlate}
        setVehicleName={setVehicleName}
        numberPlate={numberPlate}
        vehicleName={vehicleName}
        apply={handleAddItem}
        isVisible={visibleBottom}
        onClose={() => setvisibleBottom(false)}
        pickupImage={selectImage}
        img={imageUri || null}
      />
    </View>
  );
};

export default SelectVehicle;

const styles = StyleSheet.create({
  centerjusti: {justifyContent: 'center'},
  img: {
    width: wp(25),
    height: hp(10),
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  txtcontain: {flexDirection: 'row'},
  renderbtn: {
    backgroundColor: allColors.white,
    width: '90%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    alignSelf: 'center',
    margin: 10,
  },
  lable: {
    color: allColors.black,
    fontSize: 20,
    textAlignVertical: 'center',
    fontFamily: fontNames.JostRegular,
  },

  container: {
    flex: 1,
    backgroundColor: allColors.white,
  },
  radioButton: {
    padding: 10,
    justifyContent: 'center',
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: allColors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: allColors.primaryColor,
  },
});
