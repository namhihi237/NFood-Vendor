import { Text, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Toast, Loading, Header } from '../../components';
import { SCREEN } from "../../constants";
import { QUERY, client, MUTATION } from '../../graphql';
import AddButton from "./add-button";
import Category from "./category";

export default function Menu(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState([]);

  const [getData, { data }] = useLazyQuery(QUERY.GET_CATEGORY, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getData();

  }, [categories]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);


  const renderCategories = () => {
    if (data) {
      return data.getAllCategory.map((item, index) => {
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
    let newCategories = data.getAllCategory.map(category => {
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
        <AddButton title="T???o danh m???c" onPress={() => navigation.navigate(SCREEN.ADD_CATEGORY)} />
      </View>
      {data ? renderCategories() : null}
    </ScrollView >
  );


  const navigation = useNavigation();
  return (
    <View style={{ paddingBottom: hp('7%'), }}>
      <Header title="Menu" icon="arrow-left" onPress={() => navigation.goBack()} />
      <FlatList
        data={[1]}
        renderItem={() => renderItem()}
        refreshing={isFetching}
        onRefresh={() => getData()}
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