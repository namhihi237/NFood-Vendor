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
import { moneyUtils } from "../../utils";

export default function NewOrder(props) {

  const [isReceiveOrder, setIsReceiveOrder] = useState(false);

  const { data } = useQuery(QUERY.GET_PROFILE, {
    variables: {
      role: "vendor"
    },
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      setIsReceiveOrder(data.getUser.isReceiveOrder);
    }
  });

  const [updateStatusReceiveOrder] = useMutation(MUTATION.UPDATE_STATUS_RECEIVE_ORDER, {
    onCompleted: (data) => {
      setIsReceiveOrder(data.updateStatusReceiveOrder);
    },
  });

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Header title={"Đơn hàng mới"} />
      <View style={{}}>
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
        <View style={styles.orderContainer}>
          <View style={styles.cardOrder}>
            <View style={styles.card}>
              <View bg="#F24F04" pl="2" pr="2" rounded="md">
                <Text color="#fff" bold>Mới</Text>
              </View>
              <Text color="#F24F04" bold>#43242FSS</Text>
              <Text color="#F24F04" bold>18:23</Text>
            </View>
          </View>
          <Stack space={3} mt="4">
            <HStack space={3} style={{ paddingHorizontal: wp('5%') }} >
              <Text flex="1" >Mã đơn hàng</Text>
              <Text flex="1" >Trạng thái</Text>
            </HStack>
            <HStack  >
              <Center h="10" bg="#444251" flex="1">
                <Text color="#fff">#43242FSS</Text>
              </Center>
              <Center h="10" bg="#959BA4" flex="1" >
                <Text color="#fff">Đang chờ</Text>
              </Center>
            </HStack>
          </Stack>

          <Text mt="4" mb="2" style={{ paddingHorizontal: wp('5%') }}>Shipper nhận hàng</Text>
          <View bg="#F24F04" pl="2" pr="2" flexDirection="row" justifyContent="space-between" alignItems="center" >
            <View flexDirection="row" alignItems="center">
              <Image source={require('../../../assets/images/logo.png')} style={{ width: wp('14%'), height: wp('14%') }} />
              <View ml="4">
                <Text bold color="#fff">Nguyễn Văn A</Text>
                <Text color="#fff">0989898989</Text>
              </View>
            </View>
            <View bg="#fff" alignItems="center" justifyContent="center" pl="3" pr="3" h="40%" rounded="xl">
              <TouchableOpacity>
                <Text color="#F24F04" bold>Gọi shipper</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Stack mt="4">
            <HStack style={{ paddingHorizontal: wp('5%') }} >
              <Text flex="4" >Chi tiết đơn hàng</Text>
              <Center flex="1" >
                <Text ml="4" >Số lượng</Text>
              </Center>
            </HStack>
            <HStack>
              <View h="10" bg="#D7D9DB" flex="4" justifyContent="center" style={{ paddingHorizontal: wp('5%') }}>
                <Text >Banh beo</Text>
              </View>
              <Center h="10" bg="#959BA4" flex="1" >
                <Text color="#fff">x2</Text>
              </Center>
            </HStack>
            <HStack>
              <View h="10" bg="#D7D9DB" flex="4" justifyContent="center" style={{ paddingHorizontal: wp('5%') }}>
                <Text >Banh beo</Text>
              </View>
              <Center h="10" bg="#959BA4" flex="1" >
                <Text color="#fff">x3</Text>
              </Center>
            </HStack>
          </Stack>
          <View style={styles.total}>
            <Text bold fontSize="md">Tiền thu từ shipper</Text>
            <Text bold fontSize="md" color="#ff0000">{moneyUtils.convertVNDToString(120000)} đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
  cardOrder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderContainer: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingTop: 10,
  },
  card: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#959BA4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,

  },
  receiveOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('5%'),
    backgroundColor: "#fff",
    paddingTop: 10
  },
  total: {
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10,
  }

});