import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import BottomTabNavigation from './BottomTabNavigation';
import NewsDetails from '../screens/general/NewsDetails';

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name={routes.MAIN} component={BottomTabNavigation} />
      <AppStack.Screen name={routes.NEWSDETAILS} component={NewsDetails} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
