import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppStackNavigator';
import routes from '../constants/routes';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';


const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={routes.LOGIN} component={Login} />
      <AuthStack.Screen name={routes.REGISTER} component={Register} />
      <AuthStack.Screen name={routes.APP} component={AppNavigation} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
