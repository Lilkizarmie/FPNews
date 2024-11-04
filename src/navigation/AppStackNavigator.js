import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import BottomTabNavigation from './BottomTabNavigation';

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name={routes.MAIN} component={BottomTabNavigation} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
