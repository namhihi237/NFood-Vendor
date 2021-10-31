import { Text, Image, Box, View, Select, CheckIcon } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';

import { InputField, ButtonCustom, Toast, Loading } from '../../components';
import { SCREEN } from "../../constants";
export default function RegisterVendor(props) {
  const noImage = "https://res.cloudinary.com/do-an-cnpm/image/upload/v1635665899/no-image_lma0vq.jpg";
  const navigation = useNavigation();
  let [area, setArea] = React.useState("");
  return (
    <ScrollView style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View>
          <View style={{ alignItems: 'center', marginTop: hp("5%"), marginBottom: 30 }}>
            <Text fontSize="2xl" bold>Mở cửa hàng</Text>
          </View>
          <Text bold>Tên cửa hàng (*)</Text>
          <InputField width="90%" />

          <Text bold style={{ marginTop: 15 }}>Khu vực (*)</Text>
          <Select
            selectedValue={area}
            minWidth="200"
            accessibilityLabel="Chọn khu vực"
            placeholder="Chọn khu vực"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setArea(itemValue)}
          >
            <Select.Item label="Hà nội" value="HaNoi" />
            <Select.Item label="Huế" value="Hue" />
            <Select.Item label="Đà Nẵng" value="DaNang" />
            <Select.Item label="Hồ Chí Minh" value="HoChiMinh" />
          </Select>


          <Text bold style={{ marginTop: 15 }}>Nhập địa chỉ cửa hàng (*)</Text>
          <InputField width="90%" />

          <Text bold style={{ marginTop: 15 }}>Ảnh đại diện cửa hàng (*)</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image alt="Alternate Text" source={{ uri: noImage }} size="2xl" />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ButtonCustom title={"Đăng ký cửa hàng"} width="90%" />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    height: hp("96%"),
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: hp("5%")
  },

});