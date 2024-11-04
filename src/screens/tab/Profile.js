import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import { logout } from '../../redux/actions/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({navigation}) => {
  const userData = useSelector(state => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout(); 
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      navigation.replace('Login');
    }
  }, [userData, navigation]);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          {userData.photoURL ? (
            <Image
              source={{uri: userData.photoURL}}
              style={styles.profileImage}
            />
          ) : (
            <Icon name="account-circle" size={150} color="#cccccc" />
          )}
          <Text style={styles.name}>{userData.displayName}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Button
            title={loading ? 'Logging out...' : 'Logout'}
            onPress={handleLogout}
            disabled={loading}
          />
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

export default ProfileScreen;
