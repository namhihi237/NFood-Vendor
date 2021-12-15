import { Text, HStack, VStack, View, Switch, Stack, Center } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { moneyUtils, orderUtils, timeUtils } from "../../utils";

export default function OrderDetail(props) {
  const order = props.route.params.order;
  const navigation = useNavigation();

  const renderNumberOfOrders = (items) => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }

  return (
    <View style={styles.mainContainer}>
      <Header title={`#${order.invoiceNumber}`} icon="arrow-left" onPress={() => navigation.goBack()} />
      <ScrollView >
        <View style={styles.shipper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: order?.shipper?.image }} style={styles.shipperImage} />
            <View>
              <Text bold>{order?.shipper?.name}</Text>
              <Text >{"0983748473738"}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="phone-alt" size={wp('8%')} color="#16a34a" />
          </TouchableOpacity>
        </View>

        <View style={styles.orderLine}>
          <View style={styles.invoiceNumber}>
            <Text color="#4f4f4f4f">Mã đơn hàng</Text>
            <Text bold>#{order.invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text color="#4f4f4f4f">Thời gian đặt</Text>
            <Text color="#4f4f4f4f">{timeUtils.convertFullTime(new Date(order.createdAt - 0))}</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text color="#4f4f4f4f">Thời gian lấy đơn</Text>
            <Text color="#4f4f4f4f">{order.acceptedShippingAt}</Text>
          </View>
        </View>

        <View style={styles.shipper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: order?.shipper?.image }} style={styles.shipperImage} />
            <View>
              <Text bold>Tài xế lấy hàng</Text>
              <Text bold>{order?.shipper?.name}</Text>
              <Text >{"0983748473738"}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="phone-alt" size={wp('8%')} color="#16a34a" />
          </TouchableOpacity>
        </View>

        <View style={styles.orders}>
          {
            order.orderItems.map((item, index) => {
              return (
                <View key={index} style={styles.orderItem}>
                  <Text>{item.name}</Text>
                  <Text>x{item.quantity}</Text>
                </View>
              )
            })
          }
        </View>

        <View style={styles.total}>
          <View style={styles.money}>
            <Text >Tổng tiền</Text>
            <Text>{moneyUtils.convertVNDToString(order.subTotal)} đ</Text>
          </View>
          <View style={styles.money}>
            <Text >Giảm giá</Text>
            <Text>-{moneyUtils.convertVNDToString(order.discount)} đ</Text>
          </View>
          <View style={styles.money}>
            <Text bold>Tổng thu ({renderNumberOfOrders(order.orderItems)} món)</Text>
            <Text bold>{moneyUtils.convertVNDToString(order.total)} đ</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  shipper: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  shipperImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('15%'),
    marginRight: wp('3%'),
  },
  orderLine: {
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    paddingVertical: hp('1%'),
    marginBottom: hp('1%'),
  },
  invoiceNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flex: 1,
    marginBottom: 5
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orders: {
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    paddingVertical: hp('1%'),
    marginBottom: hp('1%'),
  },
  total: {
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    paddingVertical: hp('1%'),
    marginBottom: hp('1%'),
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  }

});