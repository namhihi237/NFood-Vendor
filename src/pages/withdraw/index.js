import { Text, Switch, View, Box, Center, Fab } from "native-base";
import React from "react";
import { StyleSheet, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SCREEN } from "../../constants";
import { Header, Toast, ButtonCustom } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { timeUtils, moneyUtils } from '../../utils';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
export default function WithDraw(props) {

  const navigation = useNavigation();
  const route = useRoute();


  const { data } = useQuery(QUERY.GET_WITHDRAW, {
    variables: {
      type: 'vendor'
    },
  });

  return (
    <View style={styles.container} >
      <Header title={"Yếu cầu rút tiền"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.info}>
          <View style={styles.text}>
            <Text fontSize="md">Số dư hiện tại</Text>
            <Text fontSize="md" bold>{moneyUtils.convertVNDToString(data?.getWithdrawal?.money) || 0} đ</Text>
          </View>
          <View style={styles.text}>
            <Text fontSize="md">Số tiền rút tối đa</Text>
            <Text bold fontSize="md">{moneyUtils.convertVNDToString(data?.getWithdrawal?.maxWithdrawal)} đ</Text>
          </View>
          <View style={styles.text}>
            <Text fontSize="md">Số tiền rút tối thiểu</Text>
            <Text bold fontSize="md">{moneyUtils.convertVNDToString(data?.getWithdrawal?.minWithdrawal)} đ</Text>
          </View>
          <View style={styles.text}>
            <Text fontSize="md" >Phí chuyển khoản</Text>
            <Text bold fontSize="md">{moneyUtils.convertVNDToString(data?.getWithdrawal?.fee) || 0} đ</Text>
          </View>

          <View style={styles.line}></View>

          <View>
            <Text color="#4f4f4f">Thông tin tài khoản</Text>
            <View style={styles.cardContainer}>
              <FontAwesome5Icon name="credit-card" size={20} color="#F24F04" />
              <View ml="4">
                <Text bold fontSize="md" mb="2">{data?.getWithdrawal.bank.accountName}</Text>
                <Text bold color="#4f4f4f">{data?.getWithdrawal.bank.accountNumber}</Text>
              </View>
            </View>
          </View>
        </View>
        <ButtonCustom title="Yêu cầu rút tiền" width="90%" height="6%" />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),

  },
  info: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: 6,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});