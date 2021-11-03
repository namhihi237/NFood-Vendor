import { Text, Box, View, Switch } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { InputField, ButtonCustom, Toast, Loading, HeaderBack } from '../../components';
import { SCREEN } from "../../constants";
import { QUERY, client } from '../../graphql';
import AddButton from "./add-button";
import Category from "./category";

export default function Menu(props) {

  const [categories, setCategories] = useState([]);

  const { data } = useQuery(QUERY.GET_CATEGORY, {
    onCompleted: (data) => {
      setCategories(data.getAllCategory);
    },
  });

  const renderCategories = () => {
    if (categories) {
      return categories.map((item, index) => {
        return <Category key={index} data={item} />
      });
    }
  }

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.mainContainer}>
      <HeaderBack title="Menu" button={"Lưu"} />
      <View style={{ backgroundColor: "#fff", height: 100, paddingTop: 30, paddingHorizontal: wp('5%') }}>
        <AddButton title="Tạo danh mục" />
      </View>
      {renderCategories()}
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
  },
});