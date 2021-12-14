import { Text, Image, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';

import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants"
export default function Manager(props) {

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Header title={"Quản lý"} />

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
  },

});