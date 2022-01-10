import { Text, Pressable, View, Box, Center } from "native-base";
import React from "react";
import { StyleSheet, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SCREEN } from "../../constants";
import { Header, Toast } from "../../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY, MUTATION } from "../../graphql";
import { timeUtils } from '../../utils';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Reviews(props) {

  const navigation = useNavigation();
  const route = useRoute();

  const { data, refetch } = useQuery(QUERY.GET_REVIEWS, {
    variables: {
      type: "vendor",
    },
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
  }, []);

  const renderRatingToText = (rating) => {
    switch (rating) {
      case 1:
        return "Không hài lòng";
      case 2:
        return "Bình thường";
      case 3:
        return "Hài lòng";
      default:
        return '';
    }
  }

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text bold fontSize="lg">{item.buyer?.name}</Text>
          </View>
          <View style={{ ...styles.ratingText, backgroundColor: item.rating === 3 ? 'red' : item.rating === 2 ? '#166534' : '#7e22ce' }}>
            <Text fontSize="md" color="#fff" bold>
              {renderRatingToText(item.rating)}
            </Text>
          </View>
        </View>
        <Text italic fontSize="md" color="#959BA4">{timeUtils.convertFullTime(new Date(item.createdAt - 0))}</Text>


        <Text>{item.comment}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <Header title={"Đánh giá của khách hàng"} />
      {
        data && data.getReviews && data.getReviews.length > 0 ? (<FlatList
          data={data ? data.getReviews : []}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item._id}

        />) : (
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flex: 1 }}>
            <FontAwesome5 name="comment-slash" size={wp('10%')} color="#959BA4" />
            <Text bold italic style={{ fontSize: wp('5%'), marginTop: hp('2%'), color: '#959BA4' }}>Chưa có đánh giá nào</Text>
          </View>
        )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    marginBottom: 1,
  },
  ratingText: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,

  }
});