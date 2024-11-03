import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import { Text, Platform } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/tab/Home';
import Bookmark from '../screens/tab/Bookmark';
import Profile from '../screens/tab/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 100 : 70,
          backgroundColor: 'rgba(246, 246, 246, 0.88)',
          shadowOpacity: 0,
          opacity: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 35 : 10,
        },
      }}>
        
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={30}
              color={focused ? '#3D8361' : '#9C9C9C'}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{color: focused ? '#3D8361' : '#9C9C9C'}}
              className="text-black text-xs">
              Home
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name={focused ? 'bookmark' : 'bookmark-o'}
              size={30}
              color={focused ? '#3D8361' : '#9C9C9C'}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{color: focused ? '#3D8361' : '#9C9C9C'}}
              className="text-black text-xs">
              Feed
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name={focused ? 'user-circle' : 'user-circle-o'}
              size={30}
              color={focused ? '#3D8361' : '#9C9C9C'}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{color: focused ? '#3D8361' : '#9C9C9C'}}
              className="text-black text-xs">
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name={routes.MAIN} component={BottomTabNavigation} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
