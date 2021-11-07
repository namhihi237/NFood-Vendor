import React from 'react';
import { Text, Modal, Button } from 'native-base';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ButtonCustom, Toast, Loading, HeaderBack } from '../../components';
import InputField from './input-field';
import { QUERY, client, MUTATION } from '../../graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SCREEN } from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EditCategory = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = React.useState(route.params.category.name);
  const [modalVisible, setModalVisible] = React.useState(false)

  const [deleteCategory, { loading }] = useMutation(MUTATION.DELETE_CATEGORY, {
    variables: {
      id: route.params.category._id,
    },
    onCompleted: () => {
      Toast('Xóa danh mục thành công', 'success', 'top-right');
      navigation.navigate(SCREEN.MENU);
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const [updateCategory, { loading: loadingUpdate }] = useMutation(MUTATION.UPDATE_CATEGORY, {
    variables: {
      id: route.params.category._id,
      name,
    },
    onCompleted: () => {
      Toast('Cập nhật danh mục thành công', 'success', 'top-right');
      navigation.navigate(SCREEN.MENU);
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const onChangeName = (name) => setName(name);

  const editCategory = () => {
    if (!name) {
      Toast('Vui lòng nhập tên danh mục', 'danger', 'top-right');
      return;
    }
    updateCategory();
  };

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <HeaderBack title="Chỉnh sửa danh mục" />
      <Loading status={loading || loadingUpdate} />
      <View style={styles.content}>
        <View>
          <Text>Tên danh mục</Text>
          <InputField placeholder="Tên danh mục..." onChangeText={(text) => props.onChangeText(text)} width="90%" onChangeText={onChangeName} value={name} />
          <TouchableOpacity style={styles.deleteIcon} onPress={() => setModalVisible(!modalVisible)}>
            <View >
              <FontAwesome5 name="trash-alt" size={20} color="red" />
            </View>
            <Text style={styles.deleteText} italic>Xóa danh mục này</Text>
          </TouchableOpacity>
        </View>
        <ButtonCustom title="Cập nhật" height="6%" width="90%" onPress={editCategory} />
      </View>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        closeOnOverlayClick={false}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Xóa danh mục</Modal.Header>
          <Modal.Body>
            <Text>Nếu bạn xóa danh mục này thì các món ăn trong danh mục cũng sẽ bị xóa và sẽ không thể lấy lại được lại được. Vấn tiếp tục!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => setModalVisible(false)}>Hủy</Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  deleteCategory();
                }}
              >
                Xóa
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};
export default EditCategory;

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
