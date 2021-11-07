import React from 'react';
import { Text, Button, Modal } from 'native-base';
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
import axios from 'axios';
import { createFormData } from '../../utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EditItem = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  let [photo, setPhoto] = React.useState('');
  const [name, setName] = React.useState(route.params.item.name);
  const [price, setPrice] = React.useState(route.params.item.price.toString());
  const [description, setDescription] = React.useState(route.params.item.description);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false)


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


  const [editItem, { loading: editItemLoading }] = useMutation(MUTATION.EDIT_ITEM, {
    fetchPolicy: 'network-only',
    refetchQueries: [{ query: QUERY.GET_CATEGORY }],
    onCompleted: () => {
      Toast('Cập nhật thành công', 'success', 'top-right');
      navigation.navigate(SCREEN.MENU);
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
        editItem({ variables: { id: route.params.item._id, name, price: parseFloat(price), description, image: image1 } });
      } catch (error) {
        Toast('Đã có lỗi thử lại!', 'danger');
      }
    },
    onError: (error) => {
      Toast('Đã có lỗi thử lại!', 'danger');
    }
  });

  const updateItem = () => {
    if (name === '') {
      Toast('Tên sản phẩm không được để trống', 'danger');
      return;
    }
    if (price === '') {
      Toast('Giá sản phẩm không được để trống', 'danger');
      return;
    }

    if (photo) {
      uploadImage();
      return;
    }
    editItem({ variables: { id: route.params.item._id, name, price: parseFloat(price), description } });
  };

  const [deleteItem, { loading }] = useMutation(MUTATION.DELETE_ITEM, {
    variables: {
      id: route.params.item._id,
    },
    onCompleted: () => {
      Toast('Xóa món ăn thành công', 'success', 'top-right');
      navigation.navigate(SCREEN.MENU);
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });


  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false} >
      <HeaderBack title="Sửa thông tin món ăn" />
      <Loading status={editItemLoading || loadingUploadImage || loadingImage || loading} />
      <View style={styles.content}>
        <View>
          <Text>Tên món ăn (*)</Text>
          <InputField
            placeholder="Nhập tên món ăn..."
            width="90%"
            onChangeText={onChangeName}
            value={name}
          />
          <Text>Giá bán (*)</Text>
          <InputField
            placeholder="VD: 15,000 đ"
            width="90%"
            onChangeText={onChangePrice}
            keyboardType="numeric"
            value={price}
          />

          <Text>Mô tả (tùy chọn)</Text>
          <InputField
            placeholder="Nhập mô tả về món ăn..."
            width="90%"
            onChangeText={onChangeDescription}
            value={description}
          />

          <Text>Ảnh món ăn (*)</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image source={{ uri: photo ? photo.uri : route.params.item.image }} style={{ height: 200, width: 200, marginTop: 25, }} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteIcon} onPress={() => setModalVisible(!modalVisible)}>
          <View >
            <FontAwesome5 name="trash-alt" size={20} color="red" />
          </View>
          <Text style={styles.deleteText} italic>Xóa danh mục này</Text>
        </TouchableOpacity>
        <ButtonCustom title="Lưu thay đổi" height="6%" width="90%" onPress={updateItem} />
      </View>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        closeOnOverlayClick={false}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Xóa món ăn</Modal.Header>
          <Modal.Body>
            <Text>Nếu bạn xóa món ăn này sẽ không thể lấy lại được lại được. Vấn tiếp tục!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => setModalVisible(false)}>Hủy</Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  deleteItem();
                }}
              >
                Xóa
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView >
  );
};
export default EditItem;

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
  deleteIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    marginLeft: 6,
    color: '#a4a4a4a4'
  }
});
