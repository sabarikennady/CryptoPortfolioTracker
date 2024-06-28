import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon
          name="user-circle"
          size={120}
          color="#fff"
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <Text style={styles.phone}>+1234567890</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 4,
  },
  phone: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default ProfileScreen;
