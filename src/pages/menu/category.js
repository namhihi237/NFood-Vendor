import React from 'react';
import { Text, Switch } from 'native-base';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddButton from './add-button';

const Category = (props) => {
  const { data } = props;
  console.log(props);
  return (
    <View style={styles.category} onPress={props.onPress}>
      <View style={styles.header}>
        <Text style={styles.categoryText} bold fontSize="md">{data?.name || 'Tra Sua'}</Text>
        <Switch
          value={props.isActive}
          onValueChange={props.onChange}
          trackColor={{ true: '#000', false: '#a4a4a4a4' }}
          thumbColor={props.isActive ? '#000' : '#000'}
          fontSize="sm"
        />
      </View>
      <View style={styles.action}>
        <AddButton title="Chỉnh sửa" type="edit" />
        <AddButton title="Thêm món" />
      </View>
      <View style={styles.line}></View>
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
});
