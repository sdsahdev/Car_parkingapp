import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  name: String;
};

const test = (props: Props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export default test;

const styles = StyleSheet.create({});
