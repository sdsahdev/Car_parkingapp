import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../Images';
import {AllRouteNames, allColors, fontNames} from '../Utils/AllColors';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  searchText: string;
  onChangeSearchText: (text: string) => void;
  press: () => void;
  isFilter?: boolean;
}
// const SearchBar = ({searchText, onChangeSearchText, press}) => {
const SearchBar: React.FC<Props> = ({
  searchText,
  onChangeSearchText,
  press,
  isFilter,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <AntDesign
            name="search1"
            size={wp(5)}
            color={allColors.primaryColor}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={allColors.placeholder}
          value={searchText}
          returnKeyType="done"
          onChangeText={onChangeSearchText}
        />
        {isFilter == true ? (
          <View style={{height: hp(3), width: hp(3), marginRight: wp(2)}} />
        ) : (
          <TouchableOpacity onPress={press}>
            <Image source={Images.filter} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: wp(5),
    paddingHorizontal: wp(2),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: allColors.primaryColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
  },
  icon: {
    height: hp(3),
    width: hp(3),
    marginRight: wp(2),
    tintColor: allColors.primaryColor,
  },
  input: {
    width: '80%',
    fontFamily: fontNames.JostRegular,

    // flex: 1,
  },
});

export default SearchBar;
