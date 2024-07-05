import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Images from '../Images';
import {AllRouteNames, allColors, fontNames} from '../Utils/AllColors';
import CommanButton from './CommanButton';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../Redux/Slices/authSlice';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');
type Props = {navigation: any};

const IntroSlider: React.FC<Props> = ({navigation}) => {
  const [page, setPage] = useState(0);
  const pagerRef = useRef(null);
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      title: 'Find Parking Places Around You Easily',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      image: Images.preview1map, // replace with your image path
    },
    {
      key: '2',
      title: 'Book and Pay Parking Quickly & Safely',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      image: Images.preview2, // replace with your image path
    },
    {
      key: '3',
      title: 'Extend Parking Time As You Need',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
      image: Images.preview3, // replace with your image path
    },
  ];

  const handlePageChange = (e: any) => {
    setPage(e.nativeEvent.position);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(isFocused);

    if (isFocused) {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(allColors.statusBarColor);
      StatusBar.setTranslucent(false);
    }
  }, [isFocused]);
  const handleNext = () => {
    const nextPage = Math.min(page + 1, slides.length - 1);
    setPage(nextPage);
    pagerRef?.current.setPage(nextPage);
    console.log(nextPage);
    if (nextPage == 2) {
      navigation.navigate(AllRouteNames.FirstRegisterScreen);
    }
  };
  const goToMainApp = () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123',
    };
    const token = 'fakeToken123';
    dispatch(loginSuccess({user, token}));

    navigation.replace('App');
  };
  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageChange}>
        {slides.map((slide, index) => (
          <View key={slide.key} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </PagerView>
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dash, page === index && styles.activeDash]}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <CommanButton
          titel="Next"
          onpress={() => handleNext()}
          bgcolor={allColors.primaryColor}
          titelcolor={allColors.white}
        />
        {page != 2 ? (
          <CommanButton
            titel="Skip"
            onpress={() => goToMainApp()}
            bgcolor={allColors.gray}
            titelcolor={allColors.primaryColor}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontFamily: fontNames.JostMedium,
    textAlign: 'center',
    marginVertical: 20,
    color: allColors.black,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: allColors.black,
    fontFamily: fontNames.JostRegular,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dash: {
    width: 30,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDash: {
    backgroundColor: allColors.primaryColor,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
});

export default IntroSlider;
