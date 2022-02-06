import { Text, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SCREEN } from "../../constants";


const renderTimeOpen = (timeOpen = []) => {
  let time = '';
  timeOpen.forEach((item, index) => {
    switch (item.day) {
      case '2':
        time += `Thứ 2: ${item.openTime} - ${item.closeTime}, `;
        break;
      case '3':
        time += `Thứ 3: ${item.openTime} - ${item.closeTime}, `;
        break;
      case '4':
        time += `Thứ 4: ${item.openTime} - ${item.closeTime}, `;
        break;
      case '5':
        time += `Thứ 5: ${item.openTime} - ${item.closeTime}, `;
        break;
      case '6':
        time += `Thứ 6: ${item.openTime} - ${item.closeTime}, `;
        break;
      case '7':
        time += `Thứ bảy: ${item.openTime} - ${item.closeTime}, `;
        break;
      case '8':
        time += `Chủ nhật: ${item.openTime} - ${item.closeTime}`;
        break;
    }
  });
  return time;
}

export default function Info(props) {
  const { user } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.infoStore}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <Text bold fontSize="lg">Thông tin cửa hàng</Text>
        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }}>
          <FontAwesome5 name="edit" size={16} color="#000" />
          <Text style={{ marginLeft: 10 }}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="map-marker-alt" size={16} color="#000" />
        <Text isTruncated style={{ marginLeft: 10, fontSize: 16 }}>{user?.address}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="phone" size={16} color="#000" />
        <Text isTruncated style={{ marginLeft: 10, fontSize: 16 }}>{user?.phoneNumber}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="clock" size={16} color="#000" />
        <Text ml="2" isTruncated style={{ marginLeft: 10, fontSize: 16 }}>{renderTimeOpen(user?.timeOpen)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoStore: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

});