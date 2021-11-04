import React from 'react';
import { Text, Switch } from 'native-base';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
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
import * as ImagePicker from 'react-native-image-picker';
const noImage = "https://res.cloudinary.com/do-an-cnpm/image/upload/v1635665899/no-image_lma0vq.jpg";

const AddItem = (props) => {
  const navigation = useNavigation();
  let [photo, setPhoto] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');

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
  const onChangePrice = (price) => setPrice(price);

  const createCategory = () => {
    if (!name) {
      Toast('Vui lòng nhập tên danh mục', 'danger', 'top-right');
      return;
    }
    addCategory();
  };
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0]);
      }
    });
  };

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <HeaderBack title="Thêm món mới" />
      <Loading status={loading} />
      <View style={styles.content}>
        <View>
          <Text>Tên món ăn (*)</Text>
          <InputField
            placeholder="Nhập tên món ăn..."
            width="90%"
            onChangeText={onChangeName}
          />
          <Text>Giá bán (*)</Text>
          <InputField
            placeholder="VD: 15,000 đ"
            width="90%"
            onChangeText={onChangePrice}
          />

          <Text>Mô tả (tùy chọn)</Text>
          <InputField
            placeholder="VD: 15,000 đ"
            width="90%"
            onChangeText={onChangePrice}
          />

          <Text>Ảnh món ăn (*)</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image source={{ uri: photo ? photo.uri : noImage }} style={{ height: 200, width: 200, marginTop: 25, }} />
            </TouchableOpacity>
          </View>
        </View>
        <ButtonCustom title="Thêm món" height="6%" width="90%" onPress={createCategory} />
      </View>
    </ScrollView>
  );
};
export default AddItem;

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
