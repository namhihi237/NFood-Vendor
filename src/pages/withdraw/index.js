import { Text, VStack, View, Box, Alert, Modal, FormControl, Input, Button, } from "native-base";
import React from "react";
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header, Toast, ButtonCustom } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { moneyUtils } from '../../utils';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
export default function WithDraw(props) {

  const navigation = useNavigation();
  const route = useRoute();
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const onChangeAmount = (value) => setAmount(value);

  const { data, refetch } = useQuery(QUERY.GET_WITHDRAW, {
    variables: {
      type: 'vendor',
    },
  });

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  const [requestWithdraw] = useMutation(MUTATION.REQUEST_WITHDRAW, {
    variables: {
      type: 'vendor',
      amount: parseFloat(amount),
    },
    onCompleted: (data) => {
      refetch();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const requestWithdrawHandler = () => {
    setShowModal(true);
  }

  return (
    <View style={styles.container} >
      <Header title={"Yếu cầu rút tiền"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.info}>
          <View style={styles.text}>
            <Text fontSize="md">Số dư hiện tại</Text>
            <Text fontSize="md" bold>{moneyUtils.convertVNDToString(data?.getWithdrawal?.money) || 0} đ</Text>
          </View>
          <View style={styles.text}>
            <Text fontSize="md">Số tiền có thể rút</Text>
            <Text bold fontSize="md">{moneyUtils.convertVNDToString(data?.getWithdrawal?.maxWithdrawal)} đ</Text>
          </View>
          <View style={styles.text}>
            <Text fontSize="md">Số tiền rút tối thiểu</Text>
            <Text bold fontSize="md">{moneyUtils.convertVNDToString(data?.getWithdrawal?.minWithdrawal)} đ</Text>
          </View>
          <View style={styles.text}>
            <Text fontSize="md" >Phí chuyển khoản</Text>
            <Text bold fontSize="md">{moneyUtils.convertVNDToString(data?.getWithdrawal?.fee) || 0} đ</Text>
          </View>

          <View style={styles.line}></View>

          <View>
            <Text color="#4f4f4f">Thông tin tài khoản</Text>
            <View style={styles.cardContainer}>
              <FontAwesome5Icon name="credit-card" size={20} color="#F24F04" />
              <View ml="4">
                <Text bold fontSize="md" mb="2">{data?.getWithdrawal.bank.accountName}</Text>
                <Text bold color="#4f4f4f">{data?.getWithdrawal.bank.accountNumber}</Text>
              </View>
            </View>
          </View>
        </View>
        {success ? (<Alert w="100%" status="success">
          <VStack space={1} flexShrink={1} w="100%" alignItems="center">
            <Alert.Icon size="md" />
            <Text fontSize="md" fontWeight="medium" _dark={{
              color: "coolGray.800"
            }}>
              Yêu cầu đã được gửi!
            </Text>

            <Box _text={{
              textAlign: "center"
            }} _dark={{
              _text: {
                color: "coolGray.600"
              }
            }}>
              Yêu cầu rút tiền của bạn đã được nhận, vui lòng chờ xét duyệt. Tiền sẽ được chuyển vào tài khoản của bạn trong vòng 48h.
            </Box>
          </VStack>
        </Alert>) : null}
        <ButtonCustom title="Yêu cầu rút tiền" width="90%" height="6%" onPress={requestWithdrawHandler} />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Rút tiền</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Số tiền cấn rút</FormControl.Label>
                <Input onChangeText={onChangeAmount} keyboardType='numeric' />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                  setShowModal(false);
                }}>
                  Huỷ
                </Button>
                <Button onPress={() => {
                  setShowModal(false);
                  requestWithdraw();
                }}>
                  Gửi
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),

  },
  info: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: 6,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});