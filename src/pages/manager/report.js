import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from "native-base";
import { moneyUtils, orderUtils, timeUtils } from "../../utils";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Report = (props) => {

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingHorizontal: wp('4%'), justifyContent: 'space-between', marginTop: 10, alignContent: 'center' }}>
        <Text fontSize="md" e>Xem doanh thu:</Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ ...styles.buttonStyle, marginRight: 15 }}>
            <Text>Theo ngày</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text>Theo tháng</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ backgroundColor: '#fff', marginTop: 15, paddingTop: 10, paddingBottom: 15 }}>
        <Text style={{ marginLeft: wp('5%'), marginBottom: 10 }}>Ngày 3/1/2022</Text>
        <View style={{ height: 1, backgroundColor: "#4f4f4f4f" }}></View>
        <View style={styles.textContainerReport}>
          <Text>Tổng doanh thu</Text>
          <Text>0 đ</Text>
        </View>
        <View style={styles.textContainerReport}>
          <Text>Tổng số đơn hàng</Text>
          <Text>0</Text>
        </View>
        <View style={styles.textContainerReport}>
          <Text>Số đơn hoàn thành</Text>
          <Text>0</Text>
        </View>
      </View>

      <View style={styles.reportMoney}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: wp('5%') }}>
          <Text>Tài khoản của cửa hàng</Text>
          <Text underline color="#1d4ed8">Lịch sử giao dịch</Text>
        </View>
        <View style={{ height: 1, backgroundColor: "#4f4f4f4f", marginBottom: 15 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: wp('5%') }}>
          <Text>Số dư trong tài khoản</Text>
          <Text>0 đ</Text>
        </View>
        <TouchableOpacity style={styles.moneyButton}>
          <Text color="#fff" bold fontSize="md">Rút tiền</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: wp('4%'), marginTop: 10, color: 'red' }}>Bạn có thể rút tiền khi đã cung cấp đầy đủ thông tin tài khoản tài khoản</Text>
      </View>

      <View style={styles.reportItem}>
        <Text bold fontSize="md">Thống kê món bán chạy</Text>
        <TouchableOpacity>
          <Text underline color="#1d4ed8">Xem chi tiết</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  buttonStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 5,
    paddingVertical: 5,
  },
  textContainerReport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
  },
  reportItem: {
    backgroundColor: '#fff',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: 15,
  },
  reportMoney: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 15,
  },
  moneyButton: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: wp('4%'),
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    height: hp('6%'),
    marginHorizontal: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center'
  }

})
