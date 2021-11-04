import React from 'react';
import { Text, Switch, } from 'native-base';
import { StyleSheet, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { QUERY, client, MUTATION } from '../../graphql';
import { SCREEN } from "../../constants";
import { moneyUtils } from '../../utils';
const Item = (props) => {
  const { data } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.item} onPress={props.onPress}>
      <View style={styles.itemContent}>
        <View style={styles.itemContentLeft}>
          <Image source={{ uri: data?.image }} style={styles.image} />
        </View>
        <View style={styles.itemContentRight}>
          <View style={styles.nameAndSwitch}>
            <Text bold>{data?.name}</Text>
            <Switch
              onToggle={props.onToggle}
              isChecked={data?.isActive}
              trackColor={{ true: '#000', false: '#a4a4a4a4' }}
              thumbColor={data?.isActive ? '#000' : '#000'}
              fontSize="sm"
            />
          </View>
          <Text style={styles.itemContentRightText}>{moneyUtils.convertVNDToString(data?.price)} đ</Text>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};
export default Item;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    marginTop: hp('1%'),
  },
  itemContent: {
    flexDirection: 'row',
  },
  image: {
    height: wp('12%'),
    width: wp('12%'),
    borderRadius: 5,
    marginRight: wp('2%'),
  },

  line: {
    height: 1,
    backgroundColor: '#a4a4a4a4',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  itemContentRightText: {
    marginTop: 5,
  },
  nameAndSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('76%'), // 76 + 12 + 2 + 10 = 100
  },
});
