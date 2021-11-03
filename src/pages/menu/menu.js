import { Text, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation , useIsFocused} from '@react-navigation/native';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { InputField, ButtonCustom, Toast, Loading, HeaderBack } from '../../components';
import { SCREEN } from "../../constants";
import { QUERY, client } from '../../graphql';
import AddButton from "./add-button";
import Category from "./category";

export default function Menu(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState([]);


  const { loading, refetch } = useQuery(QUERY.GET_CATEGORY, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCategories(data.getAllCategory);
    }
  });

  const renderCategories = () => {
    if (categories.length != 0) {
      return categories.map((item, index) => {
        return <Category key={index} data={item} />
      });
    }
  }

  const renderItem = () =>
  (
    <ScrollView style={styles.mainContainer}>
      <View style={{ backgroundColor: "#fff", height: 100, paddingTop: 30, paddingHorizontal: wp('5%') }}>
        <AddButton title="Tạo danh mục" onPress={() => navigation.navigate(SCREEN.ADD_CATEGORY)} />
      </View>
      {renderCategories()}
    </ScrollView >
  );


  const navigation = useNavigation();
  return (
    <View style={{ paddingBottom: hp('7%') }}>
      <Loading status={ loading} />
      <HeaderBack title="Menu" button={"Lưu"} />
      <FlatList
        data={[1]}
        renderItem={() => renderItem()}
        refreshing={isFetching}
        onRefresh={() => refetch()}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
});