import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStackNavigator from './AuthStackNavigator';
import AppStackNavigator from './AppStackNavigator';
import {useSelector} from 'react-redux';

const RootStack = createStackNavigator();

const RootNavigation = () => {
  
  const userData = useSelector(state => state.auth.userData);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!!userData && userData?.token ? (
          <RootStack.Screen
            name="App"
            component={AppStackNavigator}
          />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
