import React from 'react';
import { Text, Switch, } from 'native-base';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { QUERY, client, MUTATION } from '../../graphql';
import { SCREEN } from "../../constants";
import { moneyUtils } from '../../utils';
import { Toast, Loading, HeaderBack } from '../../components';
const Item = (props) => {
  const { data } = props;
  const navigation = useNavigation();
  const [item, setItem] = React.useState(data);

  const [toggleItem] = useMutation(MUTATION.TOGGLE_ITEM, {
    variables: {
      id: item._id,
    },
    onError: (error) => {
      setItem({ ...item, isActive: !item.isActive });
      Toast(error.message, 'danger', 'top-right');
    }
  });

  // update the toggle item
  const updateToggleItem = () => {
    toggleItem();
    // update state
    setItem({
      ...item,
      isActive: !item.isActive,
    });
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <TouchableOpacity style={styles.itemContentLeft} onPress={() => navigation.navigate(SCREEN.EDIT_ITEM, { item })}>
          <Image source={{ uri: item?.image }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.itemContentRight}>
          <View style={styles.nameAndSwitch}>
            <Text bold>{item?.name}</Text>
            <Switch
              onToggle={() => updateToggleItem()}
              isChecked={item?.isActive}
              trackColor={{ true: '#000', false: '#a4a4a4a4' }}
              thumbColor={item?.isActive ? '#000' : '#000'}
              fontSize="sm"
            />
          </View>
          <Text style={styles.itemContentRightText}>{moneyUtils.convertVNDToString(item?.price)} đ</Text>
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
