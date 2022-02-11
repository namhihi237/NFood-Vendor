import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN } from '../constants';
import {
  Register,
  Login,
  NoVendor,
  RegisterVendor,
  Menu,
  AddCategory,
  EditCategory,
  AddItem,
  EditItem,
  AuthPhone,
  OrderDetail,
  Vouchers,
  AddVoucher,
  UpdateVoucher,
  Reviews,
  ReportItem,
  InfoDetail,
  UpdateTime,
  UpdateTimeDetail,
  UpdateProfile,
  AddBank,
  WithDraw
} from '../pages';

import Tab from './tab';
const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN.LOGIN}
        screenOptions={{
          headerShown: false,
          transitionSpec: { open: config, close: config },
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen name={SCREEN.REGISTER} component={Register} />
        <Stack.Screen name={SCREEN.LOGIN} component={Login} />
        <Stack.Screen name={SCREEN.NO_VENDOR} component={NoVendor} />
        <Stack.Screen name={SCREEN.REGISTER_VENDOR} component={RegisterVendor} />
        <Stack.Screen name={SCREEN.TAB} component={Tab} />
        <Stack.Screen name={SCREEN.MENU} component={Menu} />
        <Stack.Screen name={SCREEN.ADD_CATEGORY} component={AddCategory} />
        <Stack.Screen name={SCREEN.EDIT_CATEGORY} component={EditCategory} />
        <Stack.Screen name={SCREEN.ADD_ITEM} component={AddItem} />
        <Stack.Screen name={SCREEN.EDIT_ITEM} component={EditItem} />
        <Stack.Screen name={SCREEN.AUTH_PHONE} component={AuthPhone} />
        <Stack.Screen name={SCREEN.ORDER_DETAIL} component={OrderDetail} />
        <Stack.Screen name={SCREEN.VOUCHERS} component={Vouchers} />
        <Stack.Screen name={SCREEN.ADD_VOUCHER} component={AddVoucher} />
        <Stack.Screen name={SCREEN.UPDATE_VOUCHER} component={UpdateVoucher} />
        <Stack.Screen name={SCREEN.REVIEWS} component={Reviews} />
        <Stack.Screen name={SCREEN.REPORT_ITEM} component={ReportItem} />
        <Stack.Screen name={SCREEN.INFO_DETAIL} component={InfoDetail} />
        <Stack.Screen name={SCREEN.UPDATE_TIME} component={UpdateTime} />
        <Stack.Screen name={SCREEN.UPDATE_TIME_DETAIL} component={UpdateTimeDetail} />
        <Stack.Screen name={SCREEN.UPDATE_PROFILE} component={UpdateProfile} />
        <Stack.Screen name={SCREEN.ADD_BANK} component={AddBank} />
        <Stack.Screen name={SCREEN.WITHDRAW} component={WithDraw} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
