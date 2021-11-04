import { Text, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Toast, Loading, HeaderBack } from '../../components';
import { SCREEN } from "../../constants";
import { QUERY, client, MUTATION } from '../../graphql';
import AddButton from "./add-button";
import Category from "./category";

export default function Menu(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState([]);

  const { loading, refetch } = useQuery(QUERY.GET_CATEGORY, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCategories(data.getAllCategory);
      console.log(data.getAllCategory);
    }
  });

  const renderCategories = () => {
    if (categories.length != 0) {
      return categories.map((item, index) => {
        return <Category key={index} data={item} onToggle={() => {
          toggleCategory({ variables: { id: item._id } });
          updateCategory(item);
        }} />
      });
    }
  }

  const [toggleCategory] = useMutation(MUTATION.TOGGLE_CATEGORY, {
    onCompleted: (data) => {
      // refetch();
    },
    onError: (error) => {
      Toast(error.message, 'danger', 'top-right');
    }
  });

  const updateCategory = (item) => {
    let newCategories = categories.map(category => {
      if (category._id == item._id) {
        return { ...category, isActive: !category.isActive };
      }
      return category;
    });
    setCategories(newCategories);
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
    <View style={{ paddingBottom: hp('7%'), }}>
      <Loading status={loading} />
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
    minHeight: hp('86%'), /// 7 + 7 + 86 = 100%;
  },
});