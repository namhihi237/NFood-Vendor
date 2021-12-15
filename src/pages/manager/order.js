import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { Text, View } from "native-base";
import { moneyUtils, orderUtils, timeUtils } from "../../utils";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Order = (props) => {
  const { order, index } = props;

  const countNumberOfItems = (orderItems) => {
    let count = 0;
    orderItems.forEach(item => {
      count += item.quantity;
    });
    return count;
  }

  const marginTop = index === 0 ? hp('2%') : 0;

  return (
    <TouchableWithoutFeedback onPress={props.onPress} >
      <View style={{ ...styles.container, marginTop }} shadow={3}>
        <View style={{ paddingHorizontal: wp('5%'), paddingVertical: 10 }} flexDirection='row'>
          <View ml='2'>
            <View mt='1' style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('75%') }} alignItems='center'>
              <Text mt='2' bold fontSize='md'>#{order.invoiceNumber}</Text>
              <Text mt='2' fontSize='sm'>{order.acceptedShippingAt}</Text>
            </View>
            <View mt='1' style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('75%') }} >
              <Text>x {countNumberOfItems(order.orderItems)} (món)</Text>
              <Text style={{ color: '#22c55e' }}>+ {moneyUtils.convertVNDToString(order.subTotal - order.discount)} đ</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} mt='2'>
              <Text color={orderUtils.orderStatusColor(order.orderStatus)}>
                {orderUtils.orderStatus(order.orderStatus)}
              </Text>
              <Text>{order.deliveredAt}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1 }}></View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default Order;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  }
})
