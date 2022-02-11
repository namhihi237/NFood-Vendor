import { Text, View, Input } from "native-base";
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header, Toast, ButtonCustom } from '../../components';
import { MUTATION } from '../../graphql';
import { useMutation } from '@apollo/client';

export default function UpdateProfile(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = React.useState(route.params.vendor.name);
  const [address, setAddress] = React.useState(route.params.vendor.address);
  const [email, setEmail] = React.useState(route.params.vendor.email);

  const onChangeName = (name) => setName(name);
  const onChangeAddress = (address) => setAddress(address);
  const onChangeEmail = (email) => setEmail(email);

  const [updateProfile] = useMutation(MUTATION.UPDATE_PROFILE, {
    variables: {
      name,
      address,
      email,
      image: route.params.vendor.image,
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const update = () => {
    // validate
    if (!name || !address) {
      Toast('Vui lòng nhập đầy đủ thông tin', 'danger', 'top-right');
      return;
    }

    updateProfile();
  }

  return (
    <View style={styles.infoStore}>
      <Header title={"Giờ mở cửa"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View>
          <Text mb="2">Tên quán (*)</Text>
          <Input fontSize="md" value={name} onChangeText={onChangeName} borderColor="#B2B6BB" />

          <Text mb="2" mt="4">Địa chỉ (*)</Text>
          <Input fontSize="md" value={address} onChangeText={onChangeAddress} borderColor="#B2B6BB" />

          <Text mb="2" mt="4">Email</Text>
          <Input fontSize="md" value={email} onChangeText={onChangeEmail} type="email" borderColor="#B2B6BB" />
        </View>
        <ButtonCustom height="6%" width="90%" title="Cập nhật" onPress={update} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoStore: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
    justifyContent: 'space-between'
  }
});