import { Text, View } from "native-base";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SCREEN } from "../../constants";
import { Header } from '../../components';
import { QUERY } from '../../graphql';
import { useQuery } from '@apollo/client';


const renderTimeOpen = (timeOpen = []) => {
  let times = [];
  timeOpen.forEach((item) => {
    switch (item.day) {
      case '2':
        times.push(`Thứ 2: ${item.openTime}h - ${item.closeTime}h`);
        break;
      case '3':
        times.push(`Thứ 3: ${item.openTime}h - ${item.closeTime}h`);
        break;
      case '4':
        times.push(`Thứ 4: ${item.openTime}h - ${item.closeTime}h`);
        break;
      case '5':
        times.push(`Thứ 5: ${item.openTime}h - ${item.closeTime}h`);
        break;
      case '6':
        times.push(`Thứ 6: ${item.openTime}h - ${item.closeTime}h`);
        break;
      case '7':
        times.push(`Thứ 7: ${item.openTime}h - ${item.closeTime}h`);
        break;
      case '8':
        times.push(`Chủ nhật: ${item.openTime}h - ${item.closeTime}h`);
        break;
    }
  });
  return times;
}

export default function InfoDetail(props) {
  const navigation = useNavigation();

  const { data } = useQuery(QUERY.GET_PROFILE, {
    variables: {
      role: 'vendor'
    },
    fetchPolicy: 'network-only'
  });

  const renderTime = () => {
    if (data) {
      const { timeOpen } = data.getUser;
      const times = renderTimeOpen(timeOpen);

      return times.map((item, index) => {
        return (
          <Text fontSize="md" key={index} style={{ marginBottom: hp('1%') }}>{item}</Text>
        )
      });
    }
  }

  return (
    <View style={styles.infoStore}>
      <Header title={"Chỉnh sửa thông tin cửa hàng"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={{ backgroundColor: '#fff', paddingHorizontal: wp('5%'), paddingVertical: wp('2%') }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <Text bold fontSize="lg">Thông tin cửa hàng</Text>
            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate(SCREEN.INFO_DETAIL)}>
              <FontAwesome5 name="edit" size={16} color="#000" />
              <Text style={{ marginLeft: 10 }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text bold fontSize="2xl" mb="2">{data?.getUser?.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#000" style={{ marginTop: 2 }} />
              <Text isTruncated={true} style={{ marginLeft: 10 }} fontSize="md">{data?.getUser?.address}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 name="phone" size={16} color="#000" style={{ marginTop: 2 }} />
              <Text isTruncated={true} style={{ marginLeft: 10 }} fontSize="md">{data?.getUser?.phoneNumber}</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#fff', paddingHorizontal: wp('5%'), paddingVertical: wp('2%') }} mt="2">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <Text bold fontSize="lg">Chỉnh sửa giờ mở cửa</Text>
            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }}
              onPress={() => navigation.navigate(SCREEN.UPDATE_TIME, {
                timeOpen: data?.getUser?.timeOpen
              })}>
              <FontAwesome5 name="edit" size={16} color="#000" />
              <Text style={{ marginLeft: 10 }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View>
            {renderTime()}
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoStore: {
    flex: 1,
  },
  container: {
    flex: 1,
  }
});