import { Text, Image, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';

import { InputField, ButtonCustom, Toast, Loading } from '../../components';
import { SCREEN } from "../../constants"
export default function NoVendor(props) {

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={{ alignItems: 'center', marginTop: hp("5%"), marginBottom: 30 }}>
          <Text fontSize="2xl" bold>Chính sách của người bán</Text>
        </View>
        <Text>
          Nếu bạn tiếp tục đăng ký, bạn đồng ý với các điều khoản sau:
        </Text>
        <Text>
          1. Chiết khấu của người bán là 10% so với giá bán của sản phẩm và sẽ áp dụng chính sách thu tiền sau.
        </Text>
        <Text>
          2. Thu tiền sau: bạn không được thu tiền người giao hàng đến mua, mà tiền hàng sẽ được cộng thẳng vào tài khoản của cửa hàng.
        </Text>
        <Text>
          3. Bạn có thể rút tiền trong tài khoản ra ví momo hoặc thẻ visa.
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <ButtonCustom title={"Đăng ký cửa hàng"} onPress={() => navigation.navigate(SCREEN.REGISTER_VENDOR)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: hp("5%")
  },

});