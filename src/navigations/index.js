import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN } from '../constants';
import { Register, Login, NoVendor, RegisterVendor, Menu, AddCategory, EditCategory, AddItem, EditItem } from '../pages';
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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
