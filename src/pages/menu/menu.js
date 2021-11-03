import { Text, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { InputField, ButtonCustom, Toast, Loading, HeaderBack } from '../../components';
import { SCREEN } from "../../constants";
import { QUERY, client } from '../../graphql';
import AddButton from "./add-button";
import Category from "./category";

export default function Menu(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState([]);

  const { loading } = useQuery(QUERY.GET_CATEGORY, {
    fetchPolicy: "cache-first",
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
  const [getFreshes, { loading: loading1 }] = useLazyQuery(QUERY.GET_CATEGORY, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setIsFetching(false);
      setCategories(data.getAllCategory);

    },
    onError: (error) => {
      setIsFetching(false);
      Toast.show(error.message, "danger", "top-right");
    }
  });

  const onRefresh = () => {
    console.log("onRefresh");
    getFreshes();
  }

  const renderItem = () =>
  (<ScrollView style={styles.mainContainer}>
    <Loading status={loading || loading1} />
    <HeaderBack title="Menu" button={"Lưu"} />
    <View style={{ backgroundColor: "#fff", height: 100, paddingTop: 30, paddingHorizontal: wp('5%') }}>
      <AddButton title="Tạo danh mục" onPress={() => navigation.navigate(SCREEN.ADD_CATEGORY)} />
    </View>
    {renderCategories()}
  </ScrollView >);


  const navigation = useNavigation();
  return (
    <FlatList
      data={[1]}
      renderItem={({ item }) => renderItem()}
      refreshing={isFetching}
      onRefresh={() => onRefresh()}
    />

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
});