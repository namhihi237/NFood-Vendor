import { Text, Switch, View, Box, Center, Fab } from "native-base";
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
export default function Vouchers(props) {

  const navigation = useNavigation();
  const route = useRoute();

  const { data, refetch } = useQuery(QUERY.GET_VOUCHERS, {
    fetchPolicy: 'cache-and-network',
  });

  const [toggleStatusVoucher] = useMutation(MUTATION.TOGGLE_STATUS_VOUCHER, {
    onError: err => {
      Toast(err.message, 'danger', 'top-right');
    },
    onCompleted: data => {
      refetch();
    }
  });

  const handleToggleStatusVoucher = async (id) => {
    toggleStatusVoucher({
      variables: {
        id
      }
    })
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  const renderTypeDiscount = (discountType) => {
    switch (discountType) {
      case 'PERCENT':
        return 'Phần trăm';
      case 'FIXED':
        return 'Tiền';
      default:
        return '';
    }
  }

  const renderDiscount = (item) => {
    switch (item.discountType) {
      case 'PERCENT':
        return `${item.discount} %`;
      case 'FIXED':
        return `${item.discount} đ`;
      default:
        return '';
    }
  }


  const renderItem = (item) => {
    return (
      <View style={{ marginHorizontal: wp('2%'), paddingHorizontal: wp('3%') }} bg="#fff" mt="2" mb="1" pt="2" pb="2" shadow={1} rounded={4}>
        <View justifyContent="space-between" flexDirection="row">
          <Text bold fontSize="xl">{item.promoCode}</Text>
          <Switch
            offTrackColor="tertiary.100"
            onTrackColor="tertiary.200"
            onThumbColor="tertiary.500"
            offThumbColor="tertiary.50"
            size="md"
            isChecked={item.status}
            onToggle={() => {
              handleToggleStatusVoucher(item._id)
            }}
          />
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text italic>Loại mã</Text>
          <Text>{renderTypeDiscount(item.discountType)}</Text>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text italic>Giảm giá</Text>
          <Text>{renderDiscount(item)}</Text>
        </View>

        <View flexDirection="row" justifyContent="space-between">
          <Text italic>Thời gian tạo</Text>
          <Text color="#4f4f4f4f">{timeUtils.convertFullTime(new Date(item.createdAt - 0))}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <Header title={"Quản lý mã khuyến mãi"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <FlatList
        data={data?.getVouchers}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => item._id}
      />
      <Fab
        position="absolute"
        size="sm"
        icon={<FontAwesome5Icon name="plus" size={20} color="white" />}
        onPress={() => navigation.navigate(SCREEN.ADD_VOUCHER)}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

});