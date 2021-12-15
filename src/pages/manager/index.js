import { Text, Box, View, Pressable, StatusBar, Center } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { TabView, SceneMap } from 'react-native-tab-view';

import { InputField, ButtonCustom, Toast, Header } from '../../components';
import { SCREEN } from "../../constants"

const FirstRoute = () => <Center flex={1}><Image source={require('../../../assets/images/no-order.png')} style={{ width: wp('50%'), height: wp('55%') }} /></Center>
const SecondRoute = () => <Center flex={1}><Image source={require('../../../assets/images/no-order.png')} style={{ width: wp('50%'), height: wp('55%') }} /></Center>
const initialLayout = { width: Dimensions.get('window').width };
export default function Manager(props) {
  const route = useRoute();

  const navigation = useNavigation();

  const [index, setIndex] = React.useState(route?.params?.index || 0);
  const [routes] = React.useState([
    { key: 'orders', title: 'Danh sách đơn' },
    { key: 'turnover', title: 'Doanh thu' },
  ]);


  const renderScene = SceneMap({
    orders: FirstRoute,
    turnover: SecondRoute,
  });

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? '#1f2937' : '#a1a1aa';
          const borderColor = index === i ? 'warning.600' : 'coolGray.200';

          return (
            <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}>
                <Text style={{ color }}>{route?.title}</Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    )
  };


  return (
    <View style={styles.mainContainer}>
      <Header title={"Quản lý"} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ marginTop: StatusBar.currentHeight }}
      />
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