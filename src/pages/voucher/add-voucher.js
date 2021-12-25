import {
  Text, Pressable, View, Box, Center, Fab, Input, FormControl, Radio
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
import { timeUtils } from '../../utils';
export default function AddVoucher(props) {

  const navigation = useNavigation();
  const route = useRoute();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);


  const [promoCode, setPromoCode] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [minTotal, setMinTotal] = useState('');
  const [quantity, setQuantity] = useState('');

  const [isDisabledInput, setIsDisabledInput] = useState(true);

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
    console.log(currentDate);
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
      <Header title={"Tạo mã khuyến mãi"} icon="arrow-left" onPress={() => navigation.goBack()} />
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
            >
              <Radio value="PERCENT" my={1} mr="4">
                Phần trăm (%)
              </Radio>
              <Radio value="FIXED" my={1}>
                Số tiền
              </Radio>
            </Radio.Group>
            <FormControl.Label mt="4">Giá trị khuyến mãi (*)</FormControl.Label>
            <Input placeholder="Nhập giá trị giảm..." keyboardType="numeric" onChangeText={onChangeDiscount} />

            <FormControl.Label mt="4">Số lượng (không bắt buộc)</FormControl.Label>
            <Input placeholder="Nhập số lượng mã giảm giá..." keyboardType="numeric" onChangeText={onChangeQuantity} />

            <FormControl.Label mt="4">Thời gian áp dụng (không bắt buộc)</FormControl.Label>
            <View flexDirection='row' justifyContent='space-between' alignItems='center'>
              <TouchableOpacity onPress={showDatepicker} >
                <Input placeholder="Chọn ngày gian bắt đầu" isDisabled={true} />
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
            <Input placeholder="vd: 50,000 VNĐ" keyboardType="numeric" onChangeText={onChangeMinTotal} />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
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
          <ButtonCustom title="Tạo" width="90" height="6" onPress={createNewVoucher} />
        </View>
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