import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import SearchBar from '../../Components/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterModal from '../../Components/FilterModal';
import Images from '../../Images';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {setSelected} from '../../Redux/Slices/parkingSlice';

type Props = {navigation: any};

const SeachScreen: React.FC<Props> = ({navigation}) => {
  const [searchtxt, setsearchtxt] = useState('');
  const [filterVisible, setfilterVisible] = useState(false);
  const [toggleshow, settoggleshow] = useState(false);
  const [filterValue, setfilterValue] = useState('');
  const dispatch = useAppDispatch();
  const parkingData = useAppSelector(state => state.parkingData.data);

  const recentData = [
    'Campion Cattages',
    'Willow Brae',
    'Orchard Park',
    'Chaucer Ridings',
    'Bandhouse Lane',
    'Portley Lane',
  ];

  const handleApply = () => {
    setsearchtxt('Parking');
  };
  const itemfiler = ['Distance', 'Slots Available', 'Lower Price'];
  const parkingFoinal = parkingData.filter(
    item =>
      item.name.toLowerCase().includes(searchtxt.toLowerCase()) ||
      item.address.toLowerCase().includes(searchtxt.toLowerCase()) ||
      item?.distance?.toLowerCase().includes(searchtxt.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <HeaderWithTitel titel="Search" onpress={() => navigation.pop()} />
      <View style={styles.mainView}>
        <SearchBar
          onChangeSearchText={setsearchtxt}
          press={() => setfilterVisible(true)}
          searchText={searchtxt}
        />
        <View style={styles.line} />
        {searchtxt == '' ? (
          <>
            <Text style={styles.RecentTitel}>Recent</Text>
            <FlatList
              data={recentData}
              renderItem={({item, index}) => (
                <View style={styles.renderView}>
                  <Text
                    style={{
                      color: allColors.placeholder,
                      fontFamily: fontNames.JostRegular,
                    }}>
                    {item}
                  </Text>
                  <AntDesign
                    name="closesquareo"
                    size={wp(5)}
                    color={allColors.placeholder}
                  />
                </View>
              )}
            />
          </>
        ) : (
          <FlatList
            data={parkingFoinal}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(AllRouteNames.HomeScreen),
                    dispatch(setSelected(item));
                }}
                style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                  <Image source={Images.parking} style={styles.imgp} />
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.distance}>{item?.distance}</Text>
                  <Text style={styles.rate}>{item.rate}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListHeaderComponent={
              <Text style={styles.RecentTitel}>
                Results {parkingFoinal.length}
              </Text>
            }
          />
        )}
        <FilterModal
          isVisible={filterVisible}
          items={itemfiler}
          onClose={() => setfilterVisible(false)}
          titel="Filter"
          toggle={toggleshow}
          changeToggle={settoggleshow}
          selectedItem={filterValue}
          onSelect={setfilterValue}
          apply={handleApply}
        />
      </View>
    </View>
  );
};

export default SeachScreen;

const styles = StyleSheet.create({
  imgp: {width: 30, height: 30, resizeMode: 'contain', margin: 10},
  renderView: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RecentTitel: {
    fontSize: wp(6),
    fontFamily: fontNames.JostMedium,
    color: allColors.black,
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    alignSelf: 'center',
    borderColor: allColors.gray,
  },
  container: {flex: 1, backgroundColor: allColors.white},
  mainView: {flex: 1, width: '90%', alignSelf: 'center'},
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#E53935',
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: fontNames.JostMedium,
  },
  address: {
    fontSize: 14,
    color: '#777',
    fontFamily: fontNames.JostRegular,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  distance: {
    fontSize: 14,
    color: '#777',
    fontFamily: fontNames.JostRegular,
  },
  rate: {
    fontSize: 16,
    fontFamily: fontNames.JostMedium,
    color: '#E53935',
  },
});
