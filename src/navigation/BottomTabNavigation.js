import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/tab/Home';
import Bookmark from '../screens/tab/Bookmark';
import Profile from '../screens/tab/Profile';

const TabBarLabel = ({focused, label}) => (
  <Text style={{color: focused ? '#3D8361' : '#9C9C9C', fontSize: 12}}>
    {label}
  </Text>
);

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
            <TabBarLabel focused={focused} label="Home" />
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
            <TabBarLabel focused={focused} label="Feed" />
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
            <TabBarLabel focused={focused} label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
