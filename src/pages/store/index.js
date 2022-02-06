import { Text, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants";
import Info from './info';
import { QUERY, client } from '../../graphql';
import { storageUtils } from '../../utils';

export default function Store(props) {

  const { getUser } = client.readQuery({
    query: QUERY.GET_PROFILE,
    variables: {
      role: "vendor"
    },
  });

  const logOut = async () => {
    await storageUtils.removeItem("token");
    await storageUtils.removeItem("phoneNumber");
    await storageUtils.removeItem("password");
    navigation.navigate(SCREEN.LOGIN, { clear: true });
  }

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Header title={"Cửa hàng"} />
      <View style={styles.infoContainer}>
        <Image source={{ uri: getUser ? getUser?.image : null }} style={styles.avatar} />
        <View>
          <Text bold fontSize="xl">{getUser?.name}</Text>
          <Text fontSize="lg">{getUser?.phoneNumber}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(SCREEN.VOUCHERS)}>
          <Text style={styles.title}>Quản lý khuyến mãi</Text>
          <FontAwesome5 name="arrow-right" size={20} color="#A4A4A4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(SCREEN.MENU)}>
          <Text style={styles.title}>Chỉnh sửa menu</Text>
          <FontAwesome5 name="arrow-right" size={20} color="#A4A4A4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(SCREEN.REVIEWS)}>
          <Text style={styles.title}>Đánh giá của khách hàng</Text>
          <FontAwesome5 name="arrow-right" size={20} color="#A4A4A4" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardOnline}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ fontSize: 16, fontFamily: 'SF-UI-Text-Regular' }}>Thêm tài khoản tín dụng</Text>
          <FontAwesome5 name="arrow-right" size={20} color="#A4A4A4" />
        </TouchableOpacity>
      </View>
      <Info user={getUser ? getUser : null} />
      <TouchableOpacity style={styles.logOut} onPress={logOut}>
        <Text fontSize="md" mr="2" color="#0891b2">Đăng xuất</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp("100%"),
    backgroundColor: "#fff",
    paddingLeft: wp("5%"),
    paddingBottom: hp("2%"),
    paddingTop: hp("2%"),
    marginBottom: 2,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 6,
    marginRight: 15
  },
  title: {
    fontSize: 16,
    color: "#A4A4A4",
    fontFamily: "SF-UI-Text-Regular",
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 6,
    backgroundColor: 'red',
    width: wp("100%"),
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
    marginBottom: 2
  },
  cardOnline: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: wp("100%"),
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    width: wp("80%"),
    backgroundColor: '#fff',
    height: hp("10%"),
    borderColor: '#A4A4A4',
    borderWidth: 1,
    borderRadius: 4,
  },
  logOut: {
    backgroundColor: '#fff',
    paddingHorizontal: wp("5%"),
    alignItems: 'center',
    paddingVertical: hp("2%"),
    justifyContent: 'center'
  }

});