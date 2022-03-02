import { Text, Button, VStack, View, Switch, Modal, Center } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { moneyUtils, timeUtils, orderUtils } from "../../utils";
import { paddingBottom } from "styled-system";

export default function NewOrder(props) {

  const [isReceiveOrder, setIsReceiveOrder] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [order, setOrder] = useState(null);
  const { data } = useQuery(QUERY.GET_PROFILE, {
    variables: {
      role: "vendor"
    },
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      setIsReceiveOrder(data.getUser.isReceiveOrder);
    }
  });

  const { data: newOrder } = useQuery(QUERY.GET_NEW_ORDERS, {
    fetchPolicy: "network-only",
    pollInterval: 1000,
    onCompleted: (data) => {
      console.log(data);
    }
  });

  const [updateStatusReceiveOrder] = useMutation(MUTATION.UPDATE_STATUS_RECEIVE_ORDER, {
    onCompleted: (data) => {
      setIsReceiveOrder(data.updateStatusReceiveOrder);
    },
  });

  const countNumberOfItems = (orderItems) => {
    let count = 0;
    orderItems.forEach(item => {
      count += item.quantity;
    });
    return count;
  }

  const renderItem = (order, index) => {
    return (
      <TouchableOpacity onPress={() => {
        setOrder(order);
        setModalVisible(true);
      }} key={index}>
        <View shadow={3}>
          <View style={{ paddingVertical: 10 }} flexDirection='row'>
            <View style={{ marginLeft: wp('5%') }}>
              <View mt='1' style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%') }} alignItems='center'>
                <Text mt='2' bold fontSize='md'>#{order.invoiceNumber}</Text>
                <Text mt='2' fontSize='sm'>{timeUtils.convertFullTime(order.createdAt - 0)}</Text>
              </View>
              <View mt='1' style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%') }} >
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
      </TouchableOpacity>
    )
  }

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Header title={"Đơn hàng mới"} />
      <View style={{ paddingBottom: hp('13%') }}>
        <View style={styles.receiveOrder}>
          <Text fontSize="lg">Sẵn sàng nhận đơn</Text>
          <Switch
            offTrackColor="orange.100"
            onTrackColor="orange.200"
            onThumbColor="orange.500"
            offThumbColor="orange.50"
            size="lg"
            isChecked={isReceiveOrder}
            onToggle={() => {
              updateStatusReceiveOrder()
            }}
          />
        </View>
        <FlatList
          data={newOrder?.getNewOrderByVendor || []}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => item._id}
        />
      </View>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"xl"}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{`#${order?.invoiceNumber}`}</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <View style={{ padding: wp('1%') }}>
                <Center>
                  <Text bold fontSize="md">Danh sách món</Text>
                </Center>
                {
                  order?.orderItems.map((item, index) => {
                    return (
                      <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: wp('1%') }}>
                        <Text>{item.name}</Text>
                        <Text>x {item.quantity}</Text>
                      </View>
                    )
                  })
                }
                <View style={{ height: 1, backgroundColor: '#B2B6BB' }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: wp('1%') }}>
                  <Text bold>Tổng tiền hàng</Text>
                  <Text bold color="#be123c"> {moneyUtils.convertVNDToString(order?.subTotal)} đ</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: wp('1%') }}>
                  <Text bold>Giảm giá</Text>
                  <Text bold> {moneyUtils.convertVNDToString(order?.discount) || 0} đ</Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#B2B6BB' }}></View>

                {
                  order?.shipper ? (<View>
                    <Center mt="2" mb="2">
                      <Text bold fontSize="md">Thông tin người giao hàng</Text>
                    </Center>

                    <View style={{ flexDirection: 'row', paddingVertical: wp('1%'), alignItems: 'center' }}>
                      <Image source={{ uri: order?.shipper?.image }} style={{ width: 70, height: 70, borderRadius: 35 }} />
                      <View style={{ marginLeft: 20 }}>
                        <Text bold fontSize="md" mb="2">{order?.shipper?.name}</Text>
                        <Text>{order?.shipper?.phoneNumber}</Text>
                      </View>
                    </View>
                  </View>) : null
                }

              </View>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => {
                setModalVisible(false);
              }}>
                Đã hiểu
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
  orderContainer: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingTop: 10,

  },
  receiveOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10
  },
});