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
import {allColors, AllRouteNames, fontNames} from '../../Utils/AllColors';
import SearchBar from '../../Components/SearchBar';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RemoveSaveBottom from '../../Components/RemoveSaveBottom';
import {updateParkingSpotProperty} from '../../Redux/Slices/parkingSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuProfile from '../../Components/MenuProfile';
import LogoutBottom from '../../Components/LogoutBottom';

type Props = {
  navigation: any;
};
const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const [searchtxt, setsearchtxt] = useState('');
  const [selectedItem, setselectedItem] = useState({});
  const [isVisible, setisVisible] = useState(false);
  const [isOptionVisible, setisOptionVisible] = useState(false);
  const [isDark, setisDark] = useState(false);

  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formData);

  const isFocused = useIsFocused();

  const handleLogout = () => {
    // Implement logout logic her
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <HeaderWithTitel onpress={() => ''} titel="Profile" img={true} />
        <MaterialCommunityIcons
          name={'dots-horizontal-circle-outline'}
          size={wp(8)}
          color={allColors.primaryColor}
        />
      </View>

      <View style={styles.mainView}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity
            onPress={() => setisOptionVisible(true)}
            style={styles.profileImageTouchable}>
            {!form.img ? (
              <FontAwesome
                name="user"
                size={wp(28)}
                style={{alignSelf: 'center'}}
              />
            ) : (
              <Image source={{uri: form.img}} style={styles.profileImage} />
            )}
            <View style={styles.editIconContainer}>
              <MaterialIcons name="edit" size={20} color={allColors.white} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.title}>Anabia Rani{form.nickname}</Text>
          <Text style={styles.value}>anabiajatoi448@gmail.com{form.email}</Text>
        </View>

        <MenuProfile
          toggle={false}
          onchange={() => ''}
          img="account-circle"
          name="Edit Profile"
          click={() => navigation.navigate(AllRouteNames.EditProfile)}
        />
        <MenuProfile
          toggle={false}
          onchange={() => ''}
          img="payment"
          name="Payment"
          click={() => ''}
        />
        <MenuProfile
          toggle={false}
          onchange={() => ''}
          img="notifications-none"
          name="Notification"
          click={() => navigation.navigate(AllRouteNames.NatificationSetting)}
        />
        <MenuProfile
          toggle={false}
          onchange={() => ''}
          img="shield"
          name="Security"
          click={() => navigation.navigate(AllRouteNames.SecurityScreen)}
        />
        <MenuProfile
          toggle={false}
          onchange={() => ''}
          img="help-outline"
          name="Help"
          click={() => ''}
        />
        <MenuProfile
          toggle={isDark}
          oncharemove-red-eye
          img="remove-red-eye"
          name="Dark Theme"
          istoggaleVisible
          onchange={setisDark}
          click={() => ''}
        />
        <MenuProfile
          toggle={false}
          onchange={() => ''}
          img="exit-to-app"
          name="Logout"
          click={() => setisVisible(true)}
        />
        <LogoutBottom
          apply={() => setisVisible(false)}
          onClose={() => setisVisible(false)}
          btns={{okbtn: 'Yes, Remove', cancelbtn: 'Cancel'}}
          isVisible={isVisible}
          save
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  errorMessage: {
    color: allColors.red,
    fontSize: 13,
    textAlign: 'left',
    alignSelf: 'flex-start',
    margin: 1,
    left: wp(5),
    fontFamily: fontNames.JostRegular,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: allColors.primaryColor,
    padding: 4,
    borderRadius: 10,
  },
  profileImageTouchable: {
    width: wp(30),
    height: wp(30),
    backgroundColor: allColors.gray,
    borderRadius: wp(15),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: wp(30),
    height: wp(30),
    alignSelf: 'center',
  },
  profileImage: {
    width: wp(30),
    height: wp(30),
    backgroundColor: allColors.gray,
    borderRadius: wp(15),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
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
    width: '90%',
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
