import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderWithTitel from '../../Components/HeaderWithTitel';
import {allColors} from '../../Utils/AllColors';
import ToggaleSwich from '../../Components/ToggaleSwich';
import CommanButton from '../../Components/CommanButton';

type Props = {
  navigation: any;
};
const SecurityScreen: React.FC<Props> = ({navigation}) => {
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
    {id: '1', name: 'Face ID'},
    {id: '2', name: 'Remember me'},
    {id: '3', name: 'Touch ID'},
    {id: '4', name: 'Google Authenticator'},
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
      <HeaderWithTitel onpress={() => navigation.pop()} titel="Security" />
      <View style={styles.mainView}>
        <FlatList
          data={initialSettings}
          renderItem={renderItem}
          ListFooterComponent={
            <CommanButton
              titel={'Change Password'}
              onpress={() => ''}
              bgcolor={allColors.litePrimary}
              titelcolor={allColors.primaryColor}
            />
          }
        />
      </View>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: allColors.white},
  mainView: {width: '90%', alignSelf: 'center'},
});
