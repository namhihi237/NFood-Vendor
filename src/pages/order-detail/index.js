import { Text, HStack, VStack, View, Switch, Stack, Center } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { moneyUtils, orderUtils, timeUtils } from "../../utils";

export default function OrderDetail(props) {
  // const order = props.route.params.order;

  const noImage = "https://res.cloudinary.com/do-an-cnpm/image/upload/v1646043555/DoAnTN/user1_ougwyl.png";
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const renderNumberOfOrders = (items = []) => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }

  const { data } = useQuery(QUERY.GET_ORDER_BY_ID, {
    variables: {
      id: props.route.params.orderId
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setOrder(data.getOderDetail);
    },
  });

  const callPhone = (phone) => {
    // remove + 
    const phoneNumber = phone.replace(/\+84/g, '0');
    Linking.openURL(`tel:${phoneNumber}`);
  }

  const renderStatus = (order) => {
    switch (order?.orderStatus) {
      case 'Pending':
        return 'Đang chờ xử lý';
      case 'Processing':
        return 'Đang xử lý';
      case 'Shipping':
        return 'Đang giao hàng';
      case 'Delivered':
        return 'Đã giao hàng';
      case 'Cancelled':
        return 'Đã hủy';
      case 'Failed':
        return 'Giao hàng thất bại';
      default:
        return 'Đang chờ xử lý';
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header title={`#${order?.invoiceNumber}`} icon="arrow-left" onPress={() => navigation.goBack()} />
      <ScrollView >
        <View style={styles.shipper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: order?.buyer?.image || noImage }} style={styles.shipperImage} />
            <View>
              <Text bold>{order?.buyer?.name}</Text>
              <Text >{order?.buyer?.phoneNumber}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => callPhone(order?.buyer?.phoneNumber)}>
            <FontAwesome5 name="phone-alt" size={wp('6%')} color="#16a34a" />
          </TouchableOpacity>
        </View>

        <View style={styles.orderLine}>
          <View style={styles.invoiceNumber}>
            <Text color="#B2B6BB">Mã đơn hàng</Text>
            <Text bold>#{order?.invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text color="#B2B6BB">Thời gian đặt</Text>
            <Text color="#B2B6BB">{timeUtils.convertFullTime(new Date(order?.createdAt - 0))}</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text color="#B2B6BB">Thời gian lấy đơn</Text>
            <Text color="#B2B6BB">{order?.acceptedShippingAt}</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text color="#B2B6BB">Thời gian giao hàng</Text>
            <Text color="#B2B6BB">{order?.deliveredAt || 'Chưa xác định'}</Text>
          </View>
        </View>

        <View style={styles.shipper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: order?.shipper?.image }} style={styles.shipperImage} />
            <View>
              <Text bold>Người giao hàng</Text>
              <Text bold>{order?.shipper?.name}</Text>
              <Text >{order?.shipper?.phoneNumber}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => callPhone(order?.shipper?.phoneNumber)}>
            <FontAwesome5 name="phone-alt" size={wp('6%')} color="#16a34a" />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.shipper, alignItems: 'center', justifyContent: 'center' }}>
          <Text bold fontSize="md">{order ? renderStatus(order) : ''}</Text>
        </View>

        <View style={styles.orders}>
          {
            order?.orderItems.map((item, index) => {
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
            <Text>{moneyUtils.convertVNDToString(order?.subTotal)} đ</Text>
          </View>
          <View style={styles.money}>
            <Text >Giảm giá</Text>
            <Text>-{moneyUtils.convertVNDToString(order?.discount)} đ</Text>
          </View>
          <View style={styles.money}>
            <Text bold>Tổng thu ({renderNumberOfOrders(order?.orderItems)} món)</Text>
            <Text bold>{moneyUtils.convertVNDToString(order?.total)} đ</Text>
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