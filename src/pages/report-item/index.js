import { Text, View } from "native-base";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery } from '@apollo/client';
import { QUERY } from "../../graphql";
import { timeUtils, moneyUtils } from '../../utils';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MonthPicker from 'react-native-month-year-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Reviews(props) {

  const navigation = useNavigation();
  const [type, setType] = React.useState('DATE');
  const [time, setTime] = React.useState(new Date());

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


  const { data, refetch } = useQuery(QUERY.REPORT_ITEM, {
    variables: {
      type: type,
      time
    },
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{ flex: 14 }}>
          <Text isTruncated={true} bold fontSize="lg">{item?.name}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text bold italic fontSize="sm" color="#959BA4">{item.quantitySold}</Text>
        </View>
        <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text color="#b91c1c" italic fontSize="sm"> {moneyUtils.convertVNDToString(item.totalRevenue)} đ</Text>
        </View>
      </View>
    )
  }

  const renderTime = (time) => {
    if (type === 'DATE') {
      return timeUtils.convertDate(time);
    }
    return timeUtils.convertMonth(time);
  }

  return (
    <View style={styles.container} >
      <Header title={"Thống kê món bán chạy"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.summary}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignContent: 'center', marginBottom: 20 }}>
          <Text fontSize="md" e>Xem thống kê:</Text>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ ...styles.buttonStyle, marginRight: 15 }} onPress={() => showPickerDate(true)}>
              <Text bold>Theo ngày</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => showPicker(true)}>
              <Text bold>Theo tháng</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View mb="4">
          <Text bold fontSize="lg">Món bán chạy: {renderTime(time)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%') }}>
          <Text fontSize="md" color="#959BA4">Tên món</Text>
          <Text fontSize="md" color="#959BA4">Số lượng</Text>
          <Text fontSize="md" color="#959BA4">Tiền bán đươc</Text>
        </View>
      </View>
      {
        data && data.getReportItem && data.getReportItem.length > 0 ? (<FlatList
          data={data ? data.getReportItem : []}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item._id}

        />) : (
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flex: 1 }}>
            <FontAwesome5 name="comment-slash" size={wp('10%')} color="#959BA4" />
            <Text bold italic style={{ fontSize: wp('5%'), marginTop: hp('2%'), color: '#959BA4' }}>Chưa có món ăn nào</Text>
          </View>
        )
      }
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={time}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
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
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summary: {
    paddingHorizontal: wp('5%'),
  },
  textContainerReport: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
  },
  buttonStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 5,
    paddingVertical: 5,
  },
});