import { Text, Image, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { MUTATION } from "../../graphql";
import { InputField, ButtonCustom, Toast, Loading } from '../../components';
import { SCREEN } from "../../constants"
export default function Login(props) {

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const onChangePhoneNumber = (value) => setPhoneNumber(value);
  const onChangePassword = (value) => setPassword(value);

  const [loginMutation, { loading }] = useMutation(MUTATION.LOGIN, {
    variables: {
      phoneNumber,
      password
    },
    onCompleted: (data) => {
      Toast('Đăng nhập thành công', 'success');
      if (data.login.user.isVendor) {
        // navigation.navigate(SCREEN.HOME)
        console.log("Home");
      } else {
        navigation.navigate(SCREEN.NO_VENDOR);
      }
    },
    onError: (error) => {
      Toast(error.message, 'danger');
    }
  })
  const login = () => {
    // check required fields
    if (!phoneNumber || !password) {
      Toast('Vui lòng nhập đầy đủ thông tin', 'danger');
      return;
    }
    loginMutation();
  }

  return (
    <ScrollView style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <Loading status={loading} message={'Đăng nhập'} />
      <View style={styles.mainContainer}>
        <Text fontSize="3xl" bold style={styles.title}>Đăng nhập</Text>
        <InputField
          iconName={"mobile-alt"}
          placeholder="09xxxxxxx9"
          onChangeText={onChangePhoneNumber}
        />
        <InputField
          iconName={"lock"}
          secureTextEntry={true}
          placeholder="************"
          onChangeText={onChangePassword}
        />
        <View style={styles.saveMeContainer}>
          <View style={styles.saveMe}>
            <Switch
              colorScheme="dark"
              size="md"
            />
            <Text fontSize="md" style={styles.textColor} bold>Lưu mật khẩu</Text>
          </View>
          <TouchableOpacity>
            <Text fontSize="md" style={styles.textColor} bold>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>


        <ButtonCustom title={"Đăng nhập"} onPress={login} />
        <View style={styles.haveAccount}>
          <Text fontSize="lg" >Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(SCREEN.REGISTER)}>
            <Text bold fontSize="lg" style={styles.textLink}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    display: 'flex',
  },
  mainContainer: {
    justifyContent: 'center',
    height: hp('95%'),
    alignItems: 'center',
  },
  title: {
    marginBottom: hp('5%'),
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  textDetail: {
    color: '#B2B6BB',
    marginBottom: hp('2%'),
    marginTop: hp('10%'),
  },

  buttonContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginTop: hp('5%'),
  },
  haveAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('3%'),

  },
  textLink: {
    color: '#36AFDC',
    marginLeft: wp('2%'),
  },
  textColor: {
    color: "#444251"
  },
  saveMe: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveMeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('4%'),
    width: wp('80%'),
  }
});