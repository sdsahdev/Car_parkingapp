import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {NavigationProps} from '../../Routes/NavigationTypes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import Images from '../../Images';
import CommanEdittxt from '../../Components/CommanEdittxt';
import {useAppDispatch, useAppSelector} from '../../Redux/Store/store';
import {registerUser, updateFormField} from '../../Redux/Slices/formSlice';
import CommanButton from '../../Components/CommanButton';
import ContryPicker from '../../Components/ContryPicker';
import BottomSheet from '../../Components/BottomSheet';
import useCommonStyles from '../../hooks/useCommonStyles';
import {
  confirmPassword,
  validateDateOfBirth,
  validateEmail,
  validateFullName,
  validateGender,
  validatePassword,
  validatePhoneNumber,
  validateURL,
  validateUsername,
} from '../../Utils/helper';

type Props = {navigation: any};
const FillProfileScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOptionVisible, setisOptionVisible] = useState(false);
  const styles = useCommonStyles(allColors);
  const [imageUri, setImageUri] = useState<string>('');
  const requestPermissions = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const readStorageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read Storage Permission',
          message: 'This app needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      let writeStorageGranted = PermissionsAndroid.RESULTS.GRANTED;
      const androidVersion = parseInt(Platform.Version as string, 10);
      if (androidVersion <= 28) {
        writeStorageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Write Storage Permission',
            message: 'This app needs access to your storage to save photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      }

      if (
        cameraGranted !== PermissionsAndroid.RESULTS.GRANTED ||
        readStorageGranted !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (androidVersion <= 28) {
          if (writeStorageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('All required permissions were not granted');
          }
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }
  }, []);

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
        setImageUri(uri || '');
      }
    });
  };

  const takePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri || '');
      }
    });
  };

  const [validationErrors, setValidationErrors] = useState({
    fullName: '',
    nickname: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    gender: '',
    image: '',
    iscpuntryCode: '',
  });
  const data = [
    {id: '1', label: 'Male'},
    {id: '2', label: 'Female'},
  ];
  const ImageOptions = [
    {id: '1', label: 'Select from gallary'},
    {id: '2', label: 'Camera'},
  ];
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelectItem = (item: {id: string; label: string}) => {
    handleInputChange('gender', item.label);
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    dispatch(updateFormField({field, value}));
  };

  const selectImageoption = (item: {id: string; label: string}) => {
    if (item.id == '1') {
      selectImage();
    } else {
      takePhoto();
    }
  };

  const validatefun = () => {
    const fullname = validateFullName(form.fullName);
    const nickname = validateUsername(form.nickname);
    const dob = validateDateOfBirth(form.dateOfBirth);
    const email = validateEmail(form.email);
    const phonemuber = validatePhoneNumber(
      form.phoneNumber,
      form.countrycode[0],
    );
    const gender = validateGender(form.gender);
    const imageurl = validateURL(imageUri);
    const iscpuntryCode = form.countrycode ? true : false;
    console.log(phonemuber);

    setValidationErrors({
      fullName: fullname.message,
      nickname: nickname.message,
      dateOfBirth: dob.message,
      email: email.message,
      phoneNumber: phonemuber.message,
      gender: gender.message,
      image: imageurl.message,
      iscpuntryCode: '',
    });
    if (
      fullname.valid &&
      nickname.valid &&
      dob.valid &&
      email.valid &&
      phonemuber.valid &&
      gender.valid &&
      iscpuntryCode &&
      imageurl.valid
    ) {
      handleRegister();
      setImageUri('');
      // navigation.navigate(AllRouteNames.CreatePassword);
      // All fields are valid, proceed with form submission or other actions
      console.log('Form submitted successfully:', form);
    } else {
      // Handle form validation errors, display error messages or take appropriate action
      console.log('Form validation failed. Please check errors.');
    }
  };
  const handleRegister = () => {
    const id = Date.now().toString(); // Simple ID generation, replace with a better approach
    dispatch(registerUser({...form, id}));
  };
  return (
    <KeyboardAvoidingView
      style={herestyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <HeaderWithTitel
        onpress={() => navigation.pop()}
        titel="Fill Your Profile"
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.innerView}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity
              onPress={() => setisOptionVisible(true)}
              style={styles.profileImageTouchable}>
              {!imageUri ? (
                <FontAwesome
                  name="user"
                  size={wp(28)}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <Image source={{uri: imageUri}} style={styles.profileImage} />
              )}
              <View style={styles.editIconContainer}>
                <MaterialIcons name="edit" size={20} color={allColors.white} />
              </View>
            </TouchableOpacity>
            {validationErrors?.image ? (
              <Text style={herestyles.errorMessage}>
                {validationErrors?.image}
              </Text>
            ) : null}
          </View>

          <View style={styles.formContainer}>
            <CommanEdittxt
              placeholder="Full Name"
              value={form.fullName}
              onChangeText={text => handleInputChange('fullName', text)}
              errorMessage={validationErrors.fullName}
            />

            <CommanEdittxt
              placeholder="Nickname"
              value={form.nickname}
              onChangeText={text => handleInputChange('nickname', text)}
              errorMessage={validationErrors.nickname}
            />
            <CommanEdittxt
              placeholder="Date of Birth"
              value={form.dateOfBirth}
              onChangeText={text => handleInputChange('dateOfBirth', text)}
              iconright
              icon={Images.calander}
              errorMessage={validationErrors.dateOfBirth}
            />
            <CommanEdittxt
              placeholder="Email"
              value={form.email}
              onChangeText={text => handleInputChange('email', text)}
              iconright
              icon={Images.mail}
              errorMessage={validationErrors.email}
            />

            <ContryPicker
              selectCountryes={(text: any) => {
                handleInputChange('countrycode', text?.callingCode);
                handleInputChange('countryname', text?.cca2);
              }}
              CountryCode={form?.countrycode}
              country_name={form?.countryname}
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChangeText={text => handleInputChange('phoneNumber', text)}
              errorMessage={validationErrors.phoneNumber}
            />

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={toggleModal}>
              <Text
                style={[
                  styles.inputText,
                  {
                    color: form.gender
                      ? allColors.black
                      : allColors.placeholder,
                  },
                ]}>
                {form.gender || 'Gender'}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={allColors.black}
              />
            </TouchableOpacity>
            {validationErrors?.gender ? (
              <Text style={herestyles.errorMessage}>
                {validationErrors?.gender}
              </Text>
            ) : null}
            <BottomSheet
              isVisible={isModalVisible}
              onClose={toggleModal}
              items={data}
              onSelect={handleSelectItem}
              titel="Select a Gender"
            />
            <BottomSheet
              isVisible={isOptionVisible}
              onClose={() => setisOptionVisible(false)}
              items={ImageOptions}
              onSelect={selectImageoption}
              titel="Select a Image"
            />
            <CommanButton
              titel="Continue"
              onpress={() => validatefun()}
              bgcolor={allColors.primaryColor}
              titelcolor={allColors.white}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FillProfileScreen;

const herestyles = StyleSheet.create({
  container: {flex: 1},
  errorMessage: {
    color: allColors.red,
    fontSize: 13,
    textAlign: 'left',
    alignSelf: 'flex-start',
    margin: 1,
    left: wp(5),
    fontFamily: fontNames.JostRegular,
  },
});
