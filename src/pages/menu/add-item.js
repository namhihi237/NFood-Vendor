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
import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SCREEN } from '../../constants';
import * as ImagePicker from 'react-native-image-picker';
const noImage = "https://res.cloudinary.com/do-an-cnpm/image/upload/v1635665899/no-image_lma0vq.jpg";
import axios from 'axios';
import { createFormData } from '../../utils';
const AddItem = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  let [photo, setPhoto] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loadingImage, setLoadingImage] = React.useState(false);

  const onChangeName = (name) => setName(name);
  const onChangePrice = (price) => setPrice(price);
  const onChangeDescription = (description) => setDescription(description);

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


  const [addItem, { loading: loadingAddItem }] = useMutation(MUTATION.ADD_ITEM, {
    onCompleted: () => {
      Toast('Thêm món mới thành công', 'success', 'top-right');
      navigation.goBack();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const [uploadImage, { loading: loadingUploadImage }] = useLazyQuery(QUERY.GET_SIGNATURE, {
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      const link = data.getSignatureImage;
      try {
        setLoadingImage(true);
        const upload = await axios.post(link, createFormData(photo), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoadingImage(false);
        let image1 = upload.data.secure_url || null;
        if (!image1) {
          Toast('Đã có lỗi thử lại!', 'danger');
          return;
        }
        addItem({ variables: { name, price: parseFloat(price), description, image: image1, categoryId: route.params.category._id } });
      } catch (error) {
        Toast('Đã có lỗi thử lại!', 'danger');
      }
    },
    onError: (error) => {
      Toast('Đã có lỗi thử lại!', 'danger');
    }
  });

  const createItem = () => {
    if (!name || !price || !photo || !route.params.category._id) {
      Toast('Vui lòng nhập đầy đủ thông tin', 'danger', 'top-right');
      return;
    }
    uploadImage();
  }


  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false} >
      <HeaderBack title="Thêm món mới" />
      <Loading status={loadingAddItem || loadingUploadImage || loadingImage} />
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
            keyboardType="numeric"
          />

          <Text>Mô tả (tùy chọn)</Text>
          <InputField
            placeholder="Nhập mô tả về món ăn..."
            width="90%"
            onChangeText={onChangeDescription}
          />

          <Text>Ảnh món ăn (*)</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image source={{ uri: photo ? photo.uri : noImage }} style={{ height: 200, width: 200, marginTop: 25, }} />
            </TouchableOpacity>
          </View>
        </View>
        <ButtonCustom title="Thêm món" height="6%" width="90%" onPress={createItem} />
      </View>
    </ScrollView >
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
