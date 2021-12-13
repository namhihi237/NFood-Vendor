import { Text, Image, Popover, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function NewOrder(props) {

  const [isReceiveOrder, setIsReceiveOrder] = useState(false);

  const { data } = useQuery(QUERY.GET_PROFILE, {
    variables: {
      role: "vendor"
    },
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      setIsReceiveOrder(data.getUser.isReceiveOrder);
    }
  });

  const [updateStatusReceiveOrder] = useMutation(MUTATION.UPDATE_STATUS_RECEIVE_ORDER, {
    onCompleted: (data) => {
      setIsReceiveOrder(data.updateStatusReceiveOrder);
    },
  });

  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Header title={"Đơn hàng mới"} />
      <View style={{ paddingHorizontal: wp('5%') }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <Text fontSize="lg">Sẵn sàng nhận đơn</Text>
          <Switch
            offTrackColor="orange.100"
            onTrackColor="orange.200"
            onThumbColor="orange.500"
            offThumbColor="orange.50"
            size="lg"
            isChecked={isReceiveOrder}
            onToggle={() => {
              updateStatusReceiveOrder()
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
  },

});