import { Text, Box, View, Select, CheckIcon } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import * as ImagePicker from 'react-native-image-picker';

import { InputField, ButtonCustom, Toast, Loading } from '../../components';
import { SCREEN } from "../../constants";
import { MUTATION, QUERY } from '../../graphql';
import _ from 'lodash';
import axios from 'axios';
import { createFormData } from '../../utils';

export default function RegisterVendor(props) {
  const noImage = "https://res.cloudinary.com/do-an-cnpm/image/upload/v1635665899/no-image_lma0vq.jpg";
  const navigation = useNavigation();
  let [area, setArea] = React.useState("");
  let [name, setName] = React.useState("");
  let [address, setAddress] = React.useState("");
  let [image, setImage] = React.useState("");
  let [photo, setPhoto] = useState('');

  const onChangeName = value => setName(value);
  const onChangeAddress = value => setAddress(value);

  const [activeVendor, { loading: loading1 }] = useMutation(MUTATION.ACTIVE_VENDOR, {
    variables: {
      name, address, image
    },
    onCompleted: data => {
      Toast("Đăng ký mở thành công", "success", "top-right");
      navigation.navigate(SCREEN.TAB);
    },
    onError: error => {
      Toast(error.message, "danger");
    }
  });

  const [getSignature, { loading: loading2 }] = useLazyQuery(QUERY.GET_SIGNATURE, {

    onCompleted: async data => {
      let link = data.getSignatureImage;
      try {
        const upload = await axios.post(link, createFormData(photo), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        let image1 = upload.data.secure_url || null;
        console.log(image1);
        if (!image1) {
          Toast('Đã có lỗi thử lại!', 'danger');
          return;
        }
        setImage(image1);
        activeVendor();
      } catch (error) {
        Toast('Đã có lỗi thử lại!', 'danger');
      }
    },
    onError: error => {
      Toast(error.message, "danger");
    }
  });

  const createVendor = () => {
    if (!name || !address || !photo) {
      Toast("Vui lòng nhập đầy đủ thông tin", "danger", "top-right");
      return;
    }
    getSignature();
  }

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0]);
      }
    });
  };

  return (
    <ScrollView style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <Loading loading={loading1 || loading2} />
        <View>
          <View style={{ alignItems: 'center', marginTop: hp("5%"), marginBottom: 30 }}>
            <Text fontSize="2xl" bold>Mở cửa hàng</Text>
          </View>
          <Text bold>Tên cửa hàng (*)</Text>
          <InputField width="90%" onChangeText={onChangeName} />

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
          <InputField width="90%" onChangeText={onChangeAddress} />

          <Text bold style={{ marginTop: 15 }}>Ảnh đại diện cửa hàng (*)</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image source={{ uri: photo ? photo.uri : noImage }} style={{ height: 150, width: 150, marginTop: 25 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ButtonCustom title={"Đăng ký cửa hàng"} width="90%" onPress={createVendor} />
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