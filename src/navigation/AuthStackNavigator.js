import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AppNavigation from './AppStackNavigator';
import routes from '../constants/routes';


const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={routes.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={routes.REGISTER} component={SignUpScreen} />
      <AuthStack.Screen name={routes.APP} component={AppNavigation} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
