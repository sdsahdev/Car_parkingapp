import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {allColors} from '../../Utils/AllColors';
import ToggaleSwich from '../../Components/ToggaleSwich';

type Props = {
  navigation: any;
};
const NatificationSetting: React.FC<Props> = ({navigation}) => {
  const [toggleStates, setToggleStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggleChange = (id: string) => {
    setToggleStates((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  type SettingItem = {
    id: string;
    name: string;
  };

  const initialSettings: SettingItem[] = [
    {id: '1', name: 'General Notification'},
    {id: '2', name: 'Sound'},
    {id: '3', name: 'Vibrate'},
    {id: '4', name: 'App Updates'},
    {id: '5', name: 'New Service Available'},
    {id: '6', name: 'New Tips Available'},
  ];
  const renderItem = ({item}: {item: SettingItem}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
      <Text style={{flex: 1, color: allColors.black}}>{item.name}</Text>
      <ToggaleSwich
        name=""
        toggle={toggleStates[item.id] || false}
        istoggaleVisible
        onchange={() => handleToggleChange(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderWithTitel onpress={() => navigation.pop()} titel="Notification" />
      <View style={styles.mainView}>
        {/* <ToggaleSwich
          name=""
          toggle
          istoggaleVisible
          onchange={(id: string) => handleToggleChange(id)}
        /> */}
        <FlatList data={initialSettings} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default NatificationSetting;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: allColors.white},
  mainView: {width: '90%', alignSelf: 'center'},
});
