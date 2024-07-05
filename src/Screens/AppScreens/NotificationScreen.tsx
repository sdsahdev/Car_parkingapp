import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {AllRouteNames, allColors, fontNames} from '../../Utils/AllColors';
import Images from '../../Images';
import {format, isToday, isYesterday} from 'date-fns';

type Props = {
  navigation: any;
};

const NotificationScreen: React.FC<Props> = ({navigation}) => {
  const dataFake = [
    {
      image: Images.congras,
      title: 'congras',
      content: 'Parking booking at Partley was succ..',
      date: Date.now(),
    },
    {
      image: Images.congras,
      title: 'congras12',
      content: 'Parking booking at Partley was succ..',
      date: Date.now() - 86400000,
    },
    {
      image: Images.congras,
      title: 'congras12',
      content: 'Parking booking at Partley was succ..',
      date: Date.now() - 86400000,
    },
    {
      image: Images.congras,
      title: 'congras34',
      content: 'Parking booking at Partley was succ..',
      date: Date.now() - 172800000,
    },
  ];
  interface Idata {
    image: ImageSourcePropType;
    title: string;
    content: string;
    date: number;
  }
  const groupMessagesByDate = (messages: Idata[]) => {
    const groupedMessages: {[key: string]: Idata[]} = {};

    messages.forEach(message => {
      let dateLabel = format(message.date, 'yyyy-MM-dd');
      if (isToday(message.date)) {
        dateLabel = 'Today';
      } else if (isYesterday(message.date)) {
        dateLabel = 'Yesterday';
      }

      if (!groupedMessages[dateLabel]) {
        groupedMessages[dateLabel] = [];
      }
      groupedMessages[dateLabel].push(message);
    });

    return Object.entries(groupedMessages).map(([date, messages]) => ({
      date,
      messages,
    }));
  };

  const groupedData = groupMessagesByDate(dataFake);

  const renderItem: ListRenderItem<Idata> = ({item}) => {
    return (
      <View style={styles.mainView}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
          <Image source={Images.congras} style={styles.img} />
          <View style={styles.titleView}>
            <Text style={[styles.title, {color: allColors.black}]}>
              {item.title}
            </Text>
            <Text
              style={{
                color: allColors.placeholder,
                fontFamily: fontNames.JostRegular,
              }}>
              {item.content}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderGroup: ListRenderItem<{date: string; messages: Idata[]}> = ({
    item,
  }) => (
    <View style={styles.parantView}>
      <Text style={styles.dateLabel}>{item.date}</Text>
      <FlatList
        style={{backgroundColor: allColors.white, width: '100%'}}
        data={item.messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%',
        }}>
        <HeaderWithTitel
          onpress={() => navigation.pop()}
          titel="Notification"
        />
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={24}
            color={allColors.black}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{
          backgroundColor: allColors.white,
        }}
        data={groupedData}
        renderItem={renderGroup}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  parantView: {width: '90%', alignSelf: 'center'},

  titleView: {flexDirection: 'column', margin: 20, flex: 1},
  img: {resizeMode: 'contain', width: wp(20), height: hp(12)},
  container: {flex: 1, backgroundColor: allColors.white},
  btn: {
    width: '100%',
    backgroundColor: allColors.gray,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  dateLabel: {
    fontSize: 18,
    fontFamily: fontNames.JostMedium,

    backgroundColor: allColors.white,
    color: allColors.black,
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fontNames.JostRegular,
  },
  content: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});
