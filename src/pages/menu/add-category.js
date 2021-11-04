import React from 'react';
import { Text, Switch } from 'native-base';
import { StyleSheet, View, ScrollView, } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ButtonCustom, Toast, Loading, HeaderBack } from '../../components';
import InputField from './input-field';
import { QUERY, client, MUTATION } from '../../graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../constants';
const AddCategory = (props) => {
  const navigation = useNavigation();

  const [name, setName] = React.useState('');
  const [addCategory, { loading }] = useMutation(MUTATION.ADD_CATEGORY, {
    variables: {
      name
    },
    // refetchQueries: [{ query: QUERY.GET_CATEGORY }],
    update(cache, { data: { createCategory } }) {
      const { getAllCategory } = cache.readQuery({ query: QUERY.GET_CATEGORY });
      cache.writeQuery({
        query: QUERY.GET_CATEGORY,
        data: {
          getAllCategory: [...getAllCategory, createCategory]
        }
      });
    },
    onCompleted: () => {
      Toast('Tạo mới danh mục thành công', 'success', 'top-right');
      navigation.navigate(SCREEN.MENU);
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const onChangeName = (name) => setName(name);

  const createCategory = () => {
    if (!name) {
      Toast('Vui lòng nhập tên danh mục', 'danger', 'top-right');
      return;
    }
    addCategory();
  };

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <HeaderBack title="Tạo danh mục" />
      <Loading status={loading} />
      <View style={styles.content}>
        <View>
          <Text>Tên danh mục</Text>
          <InputField
            placeholder="Tên danh mục..."
            onChangeText={(text) => props.onChangeText(text)}
            width="90%"
            onChangeText={onChangeName}
          />
        </View>
        <ButtonCustom title="Tạo danh mục" height="6%" width="90%" onPress={createCategory} />
      </View>
    </ScrollView>
  );
};
export default AddCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    marginTop: 10,
    justifyContent: 'space-between',
    height: hp('85%'),
  },
});
