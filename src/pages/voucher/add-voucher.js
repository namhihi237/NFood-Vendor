import {
  Text, Pressable, View, Box, Center, Fab, Input, FormControl, Radio
} from "native-base";
import React from "react";
import { StyleSheet, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SCREEN } from "../../constants";
import { Header, Toast } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { timeUtils } from '../../utils';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
export default function AddVoucher(props) {

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container} >
      <Header title={"Tạo mã khuyến mãi"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <FormControl
        isInvalid
        w={{
          base: "100%",
          md: "20%",
        }}
      >
        <View style={{ paddingHorizontal: wp('5%'), marginTop: 10 }}>
          <FormControl.Label>Mã giảm giá</FormControl.Label>
          <Input placeholder="Nhập mã khuyến mãi..." />
          <FormControl.Label>Loại</FormControl.Label>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            // value={value}
            onChange={(nextValue) => {
              // setValue(nextValue)
            }}
          >
            <Radio value="one" my={1}>
              Phần trăm
            </Radio>
            <Radio value="two" my={1}>
              Số tiền
            </Radio>
          </Radio.Group>
        </View>
      </FormControl>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

});