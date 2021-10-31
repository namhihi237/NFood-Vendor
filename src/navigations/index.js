import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { SCREEN } from '../constants';
import { Register  } from '../pages';

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
        initialRouteName={"R"}
        screenOptions={{
          headerShown: false,
          transitionSpec: { open: config, close: config },
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen name={"R"} component={Register} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
