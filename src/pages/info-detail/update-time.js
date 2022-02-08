import { Text, View, Switch } from "native-base";
import React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../../components';
import { QUERY, MUTATION } from '../../graphql';
import { useQuery, useMutation } from '@apollo/client';

export default function UpdateTime(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const { data, refetch } = useQuery(QUERY.GET_PROFILE, {
    variables: {
      role: 'vendor'
    },
    fetchPolicy: 'network-only',
  });

  const [updateTime] = useMutation(MUTATION.UPDATE_TIME_OPEN, {
    onCompleted: () => {
      refetch();
    },
  })

  const updateToggleItem = (item) => {
    console.log(item);
    updateTime({
      variables: {
        timeOpen: {
          day: item.day,
          openTime: item.openTime,
          closeTime: item.closeTime,
          isOpen: !item.isOpen
        }
      },
    });
  }

  const renderDate = (item) => {
    switch (item.day) {
      case '2':
        return 'Thứ 2';
      case '3':
        return 'Thứ 3';
      case '4':
        return 'Thứ 4';
      case '5':
        return 'Thứ 5';
      case '6':
        return 'Thứ 6';
      case '7':
        return 'Thứ 7';
      case '8':
        return 'Chủ nhật';
    }
  }

  const renderHours = (item) => {
    return `${item.openTime}h - ${item.closeTime}h`;
  }

  const renderTime = () => {
    if (data) {
      const timeOpen = data.getUser.timeOpen;
      return timeOpen.map((item, index) => {
        return (
          <View key={index} mb="8" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                mr="2"
                onToggle={() => updateToggleItem(item)}
                isChecked={item?.isOpen}
                trackColor={{ true: '#16a34a', false: '#a4a4a4a4' }}
                thumbColor={item?.isActive ? '#16a34a' : '#16a34a'}
                fontSize="sm"
              />
              <Text fontSize="md" bold>{renderDate(item)}</Text>
            </View>

            <Text fontSize="md">{renderHours(item)}</Text>
          </View>
        );
      });
    }
  }

  return (
    <View style={styles.infoStore}>
      <Header title={"Giờ mở cửa"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        {renderTime()}
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
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  }
});