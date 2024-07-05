import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {allColors, fontNames} from '../Utils/AllColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const useCommonStyles = (allColors: any) => {
  return useMemo(
    () =>
      StyleSheet.create({
        flex1: {
          flex: 1,
        },
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: allColors.white,
        },
        backButtonContainer: {
          width: '100%',
          left: 20,
        },
        backButtonImage: {
          resizeMode: 'contain',
          width: 30,
          height: 30,
          left: 10,
        },
        title: {
          fontSize: 30,
          fontFamily: fontNames.JostMedium,
          color: allColors.primaryColor,
        },
        authButtonsContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
        },
        line: {
          resizeMode: 'center',
          width: 90,
        },
        orText: {
          textAlignVertical: 'center',
          color: allColors.primaryColor,
          fontFamily: fontNames.JostMedium,
          marginHorizontal: 10,
        },
        signInButtonContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },

        scrollView: {
          flexGrow: 1,
        },
        innerView: {
          flex: 1,
          justifyContent: 'space-evenly',
          backgroundColor: allColors.white,
        },
        profileImageContainer: {
          width: wp(30),
          height: wp(30),
          alignSelf: 'center',
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
        profileImage: {
          width: wp(30),
          height: wp(30),
          backgroundColor: allColors.gray,
          borderRadius: wp(15),
          resizeMode: 'cover',
        },
        editIconContainer: {
          position: 'absolute',
          bottom: 0,
          right: 10,
          backgroundColor: allColors.primaryColor,
          padding: 4,
          borderRadius: 10,
        },
        formContainer: {
          alignItems: 'center',
          marginTop: wp(3),
        },
        inputContainer: {
          width: wp(90),
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: allColors.gray,
          justifyContent: 'space-between',
          paddingHorizontal: wp(4),
        },
        inputText: {
          textAlignVertical: 'center',
          fontFamily: fontNames.JostRegular,
        },
        childView: {
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-around',
        },

        titleContainer: {
          alignItems: 'flex-start',
          width: '90%',
        },
        inputContainerregister: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
        },
        checkBoxContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        checkBoxText: {
          textAlignVertical: 'center',
          color: allColors.primaryColor,
          fontFamily: fontNames.JostMedium,
          marginHorizontal: 10,
        },
        separatorContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        lineImage: {
          resizeMode: 'center',
          width: 90,
        },
        separatorText: {
          textAlignVertical: 'center',
          fontFamily: fontNames.JostMedium,
          marginHorizontal: 10,
        },
        signingIconsContainer: {
          flexDirection: 'row',
        },
        signUpTextContainer: {
          flexDirection: 'row',
        },
        signUpText: {
          color: allColors.primaryColor,
          fontFamily: fontNames.JostMedium,
        },
        containerRegister: {
          flex: 1,
          justifyContent: 'space-around',
          backgroundColor: allColors.white,
        },
        titleRegister: {
          fontSize: wp(12),
          fontWeight: 'bold',
          color: allColors.black,
          left: 10,
        },
        error: {
          color: 'red',
          marginVertical: 10,
        },
      }),
    [allColors],
  );
};

export default useCommonStyles;
