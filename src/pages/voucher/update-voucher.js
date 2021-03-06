import { Text, View, Button, Modal, Input, FormControl, Radio } from "native-base";
import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SCREEN } from "../../constants";
import { Header, Toast, ButtonCustom } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation } from '@apollo/client';
import { MUTATION } from "../../graphql";
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { timeUtils } from '../../utils';
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
  const [endDate, setEndDate] = useState(route.params.item.endDate ? new Date(route.params.item.endDate - 0) : null);
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


  const showDatepicker = useCallback((value) => setShow(value), []);
  const showDatepicker1 = useCallback((value) => setShow1(value), []);

  const onChange = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(false);
    if (event.type === 'set') {
      setStartDate(currentDate);
    }
  }, [startDate, showDatepicker]);

  const onChange1 = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShow1(false);
    if (event.type === 'set') {
      setEndDate(currentDate);
    }
  }, [endDate, showDatepicker1]);


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
      Toast('Th??m m?? gi???m gi?? th??nh c??ng', 'success', 'top-right');
      navigation.goBack();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const [deleteVoucher] = useMutation(MUTATION.DELETE_VOUCHER, {
    onCompleted: (data) => {
      Toast('X??a m?? gi???m gi?? th??nh c??ng', 'success', 'top-right');
      navigation.goBack();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const createNewVoucher = async () => {
    // validate
    if (promoCode === '' || discount === '' || discount === '') {
      Toast('Vui l??ng nh???p ?????y ????? th??ng tin', 'warning', 'top-right');
      return;
    }

    // regex promoCode
    const regex = /^[A-Z0-9]{2,}$/;
    if (!regex.test(promoCode)) {
      Toast('M?? gi???m gi?? kh??ng h???p l???', 'warning', 'top-right');
      return;
    }

    if (discountType === 'PERCENT') {
      if (parseFloat(discount) > 100 || parseFloat(discount) < 0) {
        Toast('Gi???m gi?? ph???i n???m trong kho???ng 0 - 100', 'warning', 'top-right');
        return;
      }
    }

    if (discountType === 'FIXED') {
      if (parseFloat(discount) <= 0) {
        Toast('Gi???m gi?? ph???i l???n h??n 0', 'warning', 'top-right');
        return;
      }
    }

    if (maxDiscount) {
      if (parseFloat(maxDiscount) <= 0) {
        Toast('Gi???m gi?? t???i ??a ph???i l???n h??n 0', 'warning', 'top-right');
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
      <Header title={"Chi ti???t m?? khuy???n m??i"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <ScrollView style={{ paddingBottom: 10 }}>
        <FormControl
          isInvalid
          w={{
            base: "100%",
            md: "20%",
          }}
        >
          <View style={{ paddingHorizontal: wp('5%'), marginTop: 10 }}>
            <FormControl.Label>M?? gi???m gi?? (*)</FormControl.Label>
            <Input placeholder="Nh???p m?? khuy???n m??i..." onChangeText={onChangePromoCode}
              value={promoCode} onBlur={() => setPromoCode(promoCode.toLocaleUpperCase())} />
            <FormControl.Label mt="4">Lo???i (*)</FormControl.Label>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              onChange={(nextValue) => onChangeRadio(nextValue)}
              flexDirection="row"
              value={discountType}
            >
              <Radio value="PERCENT" my={1} mr="4">
                Ph???n tr??m (%)
              </Radio>
              <Radio value="FIXED" my={1}>
                S??? ti???n
              </Radio>
            </Radio.Group>
            <FormControl.Label mt="4">Gi?? tr??? khuy???n m??i (*)</FormControl.Label>
            <Input placeholder="Nh???p gi?? tr??? gi???m..." keyboardType="numeric" onChangeText={onChangeDiscount} value={discount} />

            <FormControl.Label mt="4">S??? l?????ng (kh??ng b???t bu???c)</FormControl.Label>
            <Input placeholder="Nh???p s??? l?????ng m?? gi???m gi??..." keyboardType="numeric" onChangeText={onChangeQuantity} value={quantity} />

            <FormControl.Label mt="4">Th???i gian ??p d???ng (kh??ng b???t bu???c)</FormControl.Label>
            <View flexDirection='row' justifyContent='space-between' alignItems='center'>
              <TouchableOpacity onPress={showDatepicker} >
                <Input placeholder="Ch???n ng??y gian b???t ?????u" isDisabled={true} value={startDate && timeUtils.convertDate(startDate)} />
              </TouchableOpacity>
              <Text>?????n ng??y</Text>
              <TouchableOpacity onPress={showDatepicker1} >
                <Input placeholder="Ch???n ng??y k???t th??c..." isDisabled={true} value={endDate && timeUtils.convertDate(endDate)} />
              </TouchableOpacity>
            </View>
            <FormControl.Label mt="4">S??? ti???n gi???m t???i ??a cho lo???i ph???n tr??m (kh??ng b???t bu???c)</FormControl.Label>
            <Input
              placeholder="vd: 10,000"
              keyboardType="numeric"
              onChangeText={onChangeMaxDiscount}
              isDisabled={isDisabledInput}
              value={maxDiscount}
            />
            <FormControl.Label mt="4">Gi?? tr??? ????n t???i thi???u ??p d???ng (kh??ng b???t bu???c)</FormControl.Label>
            <Input placeholder="vd: 50,000 VN??" keyboardType="numeric" onChangeText={onChangeMinTotal} value={minTotal} />

            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }} onPress={() => setModalVisible(!modalVisible)} >
              <FontAwesome5 name="trash-alt" size={20} color="#00a8ff" />
              <Text italic ml="2">X??a voucher n??y</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate || new Date()}
              mode={'date'}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
          {show1 && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={endDate || new Date()}
              mode={'date'}
              display="default"
              onChange={onChange1}
              minimumDate={new Date()}
            />
          )}
        </FormControl>
        <View style={{ paddingHorizontal: wp('5%'), marginBottom: 20, marginTop: 20 }}>
          <ButtonCustom title="C???p nh???t" width="90" height="6" onPress={createNewVoucher} />
        </View>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          closeOnOverlayClick={false}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>X??a m??n ??n</Modal.Header>
            <Modal.Body>
              <Text>N???u b???n x??a m??n ??n n??y s??? kh??ng th??? l???y l???i ???????c l???i ???????c. V???n ti???p t???c!</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => setModalVisible(false)}>H???y</Button>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                    deleteVoucher({ variables: { id: route.params.item._id } });
                  }}
                >
                  X??a
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