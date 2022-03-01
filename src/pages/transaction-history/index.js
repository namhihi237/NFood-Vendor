import { Text, View } from "native-base";
import React from "react";
import { StyleSheet, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from '@apollo/client';
import { QUERY } from "../../graphql";
import { timeUtils, moneyUtils } from '../../utils';

export default function TransactionHistory(props) {

  const navigation = useNavigation();

  const { data } = useQuery(QUERY.GET_TRANSACTIONS, {
    variables: {
      type: "vendor",
    },
    fetchPolicy: 'network-only',
  });

  const returnAmount = (item) => {
    if (item.type === 'deposit') {
      return '+' + moneyUtils.convertVNDToString(item.amount) + ' đ';
    } else if (item.type === 'payment') {
      return '-' + moneyUtils.convertVNDToString(item.amount) + ' đ';
    } else if (item.type === 'withdraw') {
      return '-' + moneyUtils.convertVNDToString(item.amount) + ' đ';
    }
  }

  const returnTitle = (item) => {
    if (item.type === 'deposit') {
      return 'Nạp tiền vào ví';
    } else if (item.type === 'payment') {
      return 'Thanh toán';
    } else if (item.type === 'withdraw') {
      return `Rút tiền ra ví`;
    }
  }

  const returnStatus = (item) => {
    if (item.status === 'pending') {
      return 'Chờ duyệt';
    } else if (item.status === 'success') {
      return 'Thành công';
    } else if (item.status === 'reject') {
      return 'Thất bại';
    }
  }

  const returnBg = (item) => {
    if (item.status === 'pending') {
      return '#FFC107';
    } else if (item.status === 'success') {
      return '#4CAF50';
    } else if (item.status === 'reject') {
      return '#F44336';
    }
  }


  const renderItem = (item) => {
    return (
      <View style={{ paddingHorizontal: wp('5%'), backgroundColor: '#fff', }}>
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <Text fontSize="md" bold>{returnTitle(item)}</Text>
          </View>
          <Text fontSize="md" bold color={item.type === 'withdraw' ? '#dc2626' : '#000'}>{returnAmount(item)}</Text>
        </View>

        <Text fontSize="md" color="#4f4f4f">STK nhận: {item.bank.accountNumber}</Text>

        <View style={styles.bottom}>
          <View style={{ ...styles.status, backgroundColor: returnBg(item) }}>
            <Text fontSize="md" color="#4f4f4f">{returnStatus(item)}</Text>
          </View>
          <Text mt="2" italic color="#4f4f4f">{timeUtils.convertFullTime(new Date(item.createdAt - 0))}</Text>
        </View>
        <View style={styles.line}></View>
      </View >
    )
  }

  return (
    <View style={styles.container} >
      <Header title={"Lịch sử giao dịch"} icon="arrow-left" onPress={() => navigation.goBack()} />
      {
        data && data?.getTransactions ? (<FlatList
          data={data?.getTransactions || []}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => item._id}
        />) : (<View style={styles.noData}>
          <Text fontSize="xl" bold>Chưa có giao dịch nào</Text>
        </View>)
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


    paddingVertical: hp('1%'),
  },
  itemLeft: {
    justifyContent: 'space-between',

  },
  line: {
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  }
});