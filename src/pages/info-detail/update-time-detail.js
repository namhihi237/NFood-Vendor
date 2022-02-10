import { Text, View, Modal, Button, Radio } from "native-base";
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header, Toast , ButtonCustom} from '../../components';
import { QUERY, MUTATION } from '../../graphql';
import { useQuery, useMutation } from '@apollo/client';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TIME } from '../../constants';

export default function UpdateTimeDetail(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [value, setValue] = React.useState(route.params.item.openTime);
  const [type, setType] = React.useState(null);

  const [time, setTime] = React.useState({
    day: route.params.item.day,
    openTime: route.params.item.openTime,
    closeTime: route.params.item.closeTime,
    isOpen: route.params.item.isOpen,
  });

  const [updateTime] = useMutation(MUTATION.UPDATE_TIME_OPEN, {
    variables: {
      timeOpen: time
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    },
    onCompleted: (data) => { 
      navigation.goBack();
    }
  });

  let item = route.params.item;
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
  const showModal = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.infoStore}>
      <Header title={"Giờ mở cửa"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={{alignItems: "center"}}>
          <View>
            <Text mb="4" bold fontSize="xl" style={styles.title}>{renderDate(item)}</Text>
          </View>
          <View style={styles.form}>
            <TouchableOpacity style={styles.input} onPress={() => {
              setType(1);
              setValue(item.openTime);
              showModal();
            }}>
              <Text fontSize="md">Từ: {time?.openTime}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input} onPress={() => {
              setType(2);
              setValue(item.closeTime);
              showModal();
            }}>
              <Text fontSize="md">Đến: {time?.closeTime}</Text>
            </TouchableOpacity>
          </View>
       </View>

        <ButtonCustom title="Lưu" height="6%" onPress={updateTime}/>
      </View>

      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"xl"}>
        <Modal.Content minH="350" maxH="500">
          <Modal.CloseButton />
          <Modal.Body>
            <ScrollView>
              <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value}
                onChange={nextValue => {
                  setValue(nextValue);
                  const newValue = type === 1 ? { ...time, openTime: nextValue } : { ...time, closeTime: nextValue };
                  setTime(newValue);
                  setModalVisible(false);
                }}>
                {TIME.map((item, index) => {
                  return (
                    <Radio value={item.time} my={1} key={index}>
                      {item.time}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  infoStore: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp('2%'),
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
  },
  form: {
    flexDirection: 'row',
    width: '90%',
  }
});