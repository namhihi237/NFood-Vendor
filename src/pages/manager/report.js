import React, { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from "native-base";
import { moneyUtils, timeUtils } from "../../utils";
import { QUERY } from "../../graphql";
import { useQuery } from '@apollo/client';
import MonthPicker from 'react-native-month-year-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Report = (props) => {
  const navigation = useNavigation();

  const [type, setType] = useState('DATE');
  const [time, setTime] = useState(new Date());

  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const showPickerDate = useCallback((value) => setShowDate(value), []);

  const onChangeDate = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowDate(false);
    setTime(currentDate);

    if (event.type === 'set') {
      setType('DATE');
    }
  }, [time, showPickerDate]);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || time;

      showPicker(false);
      if (event === 'dateSetAction') {
        setTime(selectedDate);
        setType('MONTH');
      }
    },
    [time, showPicker],
  );

  const { data, refetch } = useQuery(QUERY.GET_REPORT, {
    variables: {
      type,
      time: type === 'DATE' ? timeUtils.formatDate(time) : timeUtils.formatMonth(time),
    },
  });


  React.useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  const renderTime = (time) => {
    if (type === 'DATE') {
      return timeUtils.convertDate(time);
    }
    return timeUtils.convertMonth(time);
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingHorizontal: wp('4%'), justifyContent: 'space-between', marginTop: 10, alignContent: 'center' }}>
        <Text fontSize="md" e>Xem doanh thu:</Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ ...styles.buttonStyle, marginRight: 15 }} onPress={() => showPickerDate(true)}>
            <Text>Theo ngày</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => showPicker(true)}>
            <Text>Theo tháng</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ backgroundColor: '#fff', marginTop: 15, paddingTop: 10, paddingBottom: 15 }}>
        <Text style={{ marginLeft: wp('5%'), marginBottom: 10 }}>{renderTime(time)}</Text>
        <View style={{ height: 1, backgroundColor: "#4f4f4f4f" }}></View>
        <View style={styles.textContainerReport}>
          <Text>Tổng doanh thu</Text>
          <Text color="#b91c1c">{moneyUtils.convertVNDToString(data?.vendorReport.totalRevenue)} đ</Text>
        </View>
        <View style={styles.textContainerReport}>
          <Text>Tổng số đơn hàng</Text>
          <Text>{data?.vendorReport.totalOrder}</Text>
        </View>
        <View style={styles.textContainerReport}>
          <Text>Số đơn hoàn thành</Text>
          <Text>{data?.vendorReport.totalOrderCompleted}</Text>
        </View>
      </View>

      <View style={styles.reportMoney}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: wp('5%') }}>
          <Text>Tài khoản của cửa hàng</Text>
          <TouchableOpacity onPress={() => navigation.navigate(SCREEN.TRANSACTION_HISTORY)}>
            <Text underline color="#1d4ed8">Lịch sử giao dịch</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: "#4f4f4f4f", marginBottom: 15 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: wp('5%') }}>
          <Text>Số dư trong tài khoản</Text>
          <Text>{moneyUtils.convertVNDToString(data?.vendorReport.accountBalance)} đ</Text>
        </View>
        <TouchableOpacity style={styles.moneyButton} onPress={() => {
          navigation.navigate(SCREEN.WITHDRAW, {
            money: data?.vendorReport.accountBalance,
          });
        }}>
          <Text color="#fff" bold fontSize="md">Yêu cầu rút tiền</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: wp('4%'), marginTop: 10, color: 'red' }}>Bạn có thể rút tiền khi đã cung cấp đầy đủ thông tin tài khoản tài khoản</Text>
      </View>

      <View style={styles.reportItem}>
        <Text bold fontSize="md">Thống kê món bán chạy</Text>
        <TouchableOpacity onPress={() => navigation.navigate(SCREEN.REPORT_ITEM)}>
          <Text underline color="#1d4ed8">Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={time}
          maximumDate={new Date()}
          locale="vi"
        />
      )}

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={'date'}
          display="default"
          onChange={onChangeDate}
        />
      )}
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
