import React from 'react';
import { Text, Switch } from 'native-base';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AddButton from './add-button';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { QUERY, client, MUTATION } from '../../graphql';
import { SCREEN } from "../../constants";
import Item from './item';

const Category = (props) => {
  const { data } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.category} onPress={props.onPress}>
      <View style={styles.header}>
        <Text style={styles.categoryText} bold fontSize="md">{data?.name || 'Tra Sua'}</Text>
        <Switch
          onToggle={props.onToggle}
          isChecked={data.isActive}
          trackColor={{ true: '#000', false: '#a4a4a4a4' }}
          thumbColor={data.isActive ? '#000' : '#000'}
          fontSize="sm"
        />
      </View>
      <View style={styles.action}>
        <AddButton title="Chỉnh sửa" type="edit" onPress={() => navigation.navigate(SCREEN.EDIT_CATEGORY, { category: data })} />
        <AddButton title="Thêm món" onPress={() => navigation.navigate(SCREEN.ADD_ITEM, { category: data })} />
      </View>
      <View style={styles.line}></View>
      {
        data.items.length != 0 ? data.items.map((item, index) => {
          return <Item key={index} data={item} />
        }) : (<View style={styles.noItem}>
          <Text style={styles.noItemText} italic>Danh mục này của bạn hiện không có món ăn nào, hãy thêm món để được đa dạng thực đơn hơn</Text>
        </View>)
      }
    </View>
  );
};
export default Category;

const styles = StyleSheet.create({
  category: {
    backgroundColor: '#fff',
    marginTop: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  line: {
    height: 1,
    backgroundColor: '#a4a4a4a4',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  noItem: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: hp('10%'),
    paddingHorizontal: wp('8%'),
  },
  noItemText: {
    color: '#a4a4a4a4',
  }
});
