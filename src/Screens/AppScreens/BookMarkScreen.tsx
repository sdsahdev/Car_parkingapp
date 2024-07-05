import {
  FlatList,
  Image,
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
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {logout} from '../../Redux/Slices/authSlice';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import Images from '../../Images';
import {allColors, fontNames} from '../../Utils/AllColors';
import SearchBar from '../../Components/SearchBar';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveSaveBottom from '../../Components/RemoveSaveBottom';
import {updateParkingSpotProperty} from '../../Redux/Slices/parkingSlice';

const BookMarkScreen = () => {
  const [searchtxt, setsearchtxt] = useState('');
  const [selectedItem, setselectedItem] = useState({});
  const [isVisible, setisVisible] = useState(false);

  const dispatch = useAppDispatch();
  const parkingData = useAppSelector(state => state.parkingData.data);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const savedData = parkingData.filter(i => i.save == true);
      console.log(parkingData, 'parking data===');
    }
  }, [isFocused]);
  const handleLogout = () => {
    // Implement logout logic her
    dispatch(logout());
  };

  const renderItem = ({item, index}: any) => {
    console.log(item, '==item==');
    return (
      <View style={styles.renderTouch}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            style={styles.img}
          />
          <View style={styles.paraneTxt}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.value}>{item?.address}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setselectedItem(item), setisVisible(true);
          }}>
          <MaterialCommunityIcons
            name={true ? 'bookmark' : 'bookmark-outline'}
            size={wp(8)}
            color={allColors.primaryColor}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <HeaderWithTitel onpress={() => ''} titel="My Bookmark" img={true} />
        <MaterialCommunityIcons
          name={'dots-horizontal-circle-outline'}
          size={wp(8)}
          color={allColors.primaryColor}
        />
      </View>

      <View style={styles.mainView}>
        <SearchBar
          onChangeSearchText={setsearchtxt}
          press={() => ''}
          searchText={searchtxt}
          isFilter
        />
        <FlatList
          data={parkingData.filter(i => i.save == true)}
          renderItem={renderItem}
        />
        <RemoveSaveBottom
          apply={() => ''}
          btns={{okbtn: 'Yes, Remove', cancelbtn: 'Cancel'}}
          isVisible={isVisible}
          items={selectedItem}
          onClose={() => setisVisible(false)}
          savechange={() => {
            dispatch(
              updateParkingSpotProperty({
                id: selectedItem.id,
                property: 'save',
                value: !selectedItem?.save,
              }),
            ),
              setisVisible(false);
          }}
        />
      </View>
    </View>
  );
};

export default BookMarkScreen;

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  title: {
    fontSize: 16,
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
  },
  value: {
    fontSize: 14,
    fontFamily: fontNames.JostRegular,
    color: allColors.black,
  },
  img: {
    width: wp(20),
    height: hp(8),
    resizeMode: 'cover',
    borderRadius: 20,
    margin: wp(2),
  },
  container: {flex: 1, backgroundColor: allColors.white},
  mainView: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    paddingLeft: 10,
  },
  renderTouch: {
    width: wp(90),
    borderRadius: 10,
    backgroundColor: allColors.litegray,
    resizeMode: 'contain',
    paddingVertical: 10,
    marginVertical: hp(2),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  paraneTxt: {
    flexDirection: 'column',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
