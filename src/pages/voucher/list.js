import { Text, Pressable, View, Box, Center, Fab } from "native-base";
import React from "react";
import { StyleSheet, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SCREEN } from "../../constants";
import { Header, Toast } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { timeUtils } from '../../utils';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
export default function Vouchers(props) {

  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    navigation.addListener('focus', () => {
    });
  }, []);


  const renderItem = (item) => {
    return (
      <TouchableOpacity >

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container} >
      <Header title={"Quản lý mã khuyến mãi"} icon="arrow-left" onPress={() => navigation.goBack()} />
      <Fab
        position="absolute"
        size="sm"
        icon={<FontAwesome5Icon name="plus" size={20} color="white" />}
        onPress={() => navigation.navigate(SCREEN.ADD_VOUCHER)}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

});