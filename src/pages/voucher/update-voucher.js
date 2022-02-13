import {
  Text, Pressable, View, Box, Button, Modal, Input, FormControl, Radio
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SCREEN } from "../../constants";
import { Header, Toast, ButtonCustom } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function UpdateVoucher(props) {

  const navigation = useNavigation();
  const route = useRoute();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false)

  const [promoCode, setPromoCode] = useState(route.params.item.promoCode);
  const [discountType, setDiscountType] = useState(route.params.item.discountType);
  const [discount, setDiscount] = useState(route.params.item.discount ? route.params.item.discount + '' : 0);
  const [startDate, setStartDate] = useState(route.params.item.startDate ? new Date(route.params.item.startDate - 0) : null);
  const [endDate, setEndDate] = useState('');
  const [maxDiscount, setMaxDiscount] = useState(route.params.item?.maxDiscount ? route.params.item.maxDiscount + '' : null);
  const [minTotal, setMinTotal] = useState(route.params.item.minTotal ? route.params.item.minTotal + '' : null);
  const [quantity, setQuantity] = useState(route.params.item.quantity ? route.params.item.quantity + '' : null);

  const [isDisabledInput, setIsDisabledInput] = useState(route.params.item.discountType === 'FIXED');

  const onChangePromoCode = (text) => {
    setPromoCode(text);
  }
  const onChangeDiscount = (value) => setDiscount(value);
  const onChangeMaxDiscount = (value) => setMaxDiscount(value);
  const onChangeMinTotal = (value) => setMinTotal(value);
  const onChangeQuantity = (value) => setQuantity(value);

  const showDatepicker = () => {
    setShow(true);
  };

  const showDatepicker1 = () => {
    setShow1(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow1(Platform.OS === 'ios');
    setEndDate(currentDate);
  };


  const onChangeRadio = (nextValue) => {
    setDiscountType(nextValue);
    if (nextValue === 'PERCENT') {
      setIsDisabledInput(false);
    } else {
      setIsDisabledInput(true);
      setMaxDiscount('');
    }
  }

  const [addVoucher] = useMutation(MUTATION.ADD_VOUCHER, {
    onCompleted: (data) => {
      Toast('Thêm mã giảm giá thành công', 'success', 'top-right');
      navigation.goBack();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const [deleteVoucher] = useMutation(MUTATION.DELETE_VOUCHER, {
    onCompleted: (data) => {
      Toast('Xóa mã giảm giá thành công', 'success', 'top-right');
      navigation.goBack();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const createNewVoucher = async () => {
    // validate
    if (promoCode === '' || discount === '' || discount === '') {
      Toast('Vui lòng nhập đầy đủ thông tin', 'warning', 'top-right');
      return;
    }

    // regex promoCode
    const regex = /^[A-Z0-9]{2,}$/;
    if (!regex.test(promoCode)) {
      Toast('Mã giảm giá không hợp lệ', 'warning', 'top-right');
      return;
    }

    if (discountType === 'PERCENT') {
      if (parseFloat(discount) > 100 || parseFloat(discount) < 0) {
        Toast('Giảm giá phải nằm trong khoảng 0 - 100', 'warning', 'top-right');
        return;
      }
    }

    if (discountType === 'FIXED') {
      if (parseFloat(discount) <= 0) {
        Toast('Giảm giá phải lớn hơn 0', 'warning', 'top-right');
        return;
      }
    }

    if (maxDiscount) {
      if (parseFloat(maxDiscount) <= 0) {
        Toast('Giảm giá tối đa phải lớn hơn 0', 'warning', 'top-right');
        return;
      }
    }
    addVoucher({
      variables: {
        inputVoucher: {
          promoCode,
          discountType,
          discount: parseFloat(discount),
          startDate,
          endDate,
          maxDiscount: parseFloat(maxDiscount),
          minTotal: parseFloat(minTotal),
          quantity: parseInt(quantity)
        }
      }
    })
  }

  return (
    <View style={styles.container} >
      <Header title={"Chi tiết mã khuyến mãi"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <ScrollView style={{}}>
        <FormControl
          isInvalid
          w={{
            base: "100%",
            md: "20%",
          }}
        >
          <View style={{ paddingHorizontal: wp('5%'), marginTop: 10 }}>
            <FormControl.Label>Mã giảm giá (*)</FormControl.Label>
            <Input placeholder="Nhập mã khuyến mãi..." onChangeText={onChangePromoCode}
              value={promoCode} onBlur={() => setPromoCode(promoCode.toLocaleUpperCase())} />
            <FormControl.Label mt="4">Loại (*)</FormControl.Label>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              onChange={(nextValue) => onChangeRadio(nextValue)}
              flexDirection="row"
              value={discountType}
            >
              <Radio value="PERCENT" my={1} mr="4">
                Phần trăm (%)
              </Radio>
              <Radio value="FIXED" my={1}>
                Số tiền
              </Radio>
            </Radio.Group>
            <FormControl.Label mt="4">Giá trị khuyến mãi (*)</FormControl.Label>
            <Input placeholder="Nhập giá trị giảm..." keyboardType="numeric" onChangeText={onChangeDiscount} value={discount} />

            <FormControl.Label mt="4">Số lượng (không bắt buộc)</FormControl.Label>
            <Input placeholder="Nhập số lượng mã giảm giá..." keyboardType="numeric" onChangeText={onChangeQuantity} value={quantity} />

            <FormControl.Label mt="4">Thời gian áp dụng (không bắt buộc)</FormControl.Label>
            <View flexDirection='row' justifyContent='space-between' alignItems='center'>
              <TouchableOpacity onPress={showDatepicker} >
                <Input placeholder="Chọn ngày gian bắt đầu" isDisabled={true} value={startDate} />
              </TouchableOpacity>
              <Text>đến ngày</Text>
              <TouchableOpacity onPress={showDatepicker1} >
                <Input placeholder="Chọn ngày kết thúc..." isDisabled={true} />
              </TouchableOpacity>
            </View>
            <FormControl.Label mt="4">Số tiền giảm tối đa cho loại phần trăm (không bắt buộc)</FormControl.Label>
            <Input
              placeholder="vd: 10,000"
              keyboardType="numeric"
              onChangeText={onChangeMaxDiscount}
              isDisabled={isDisabledInput}
              value={maxDiscount}
            />
            <FormControl.Label mt="4">Giá trị đơn tối thiểu áp dụng (không bắt buộc)</FormControl.Label>
            <Input placeholder="vd: 50,000 VNĐ" keyboardType="numeric" onChangeText={onChangeMinTotal} value={minTotal} />

            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }} onPress={() => setModalVisible(!modalVisible)} >
              <FontAwesome5 name="trash-alt" size={20} color="#00a8ff" />
              <Text italic ml="2">Xóa voucher này</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode={'date'}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
          {show1 && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={new Date()}
              mode={'date'}
              display="default"
              onChange={onChange1}
              minimumDate={new Date()}
            />
          )}
        </FormControl>
        <View style={{ paddingHorizontal: wp('5%'), marginTop: hp('5%') }}>
          <ButtonCustom title="Cập nhật" width="90" height="6" onPress={createNewVoucher} />
        </View>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          closeOnOverlayClick={false}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Xóa món ăn</Modal.Header>
            <Modal.Body>
              <Text>Nếu bạn xóa món ăn này sẽ không thể lấy lại được lại được. Vấn tiếp tục!</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => setModalVisible(false)}>Hủy</Button>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                    deleteVoucher({ variables: { id: route.params.item._id } });
                  }}
                >
                  Xóa
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

});