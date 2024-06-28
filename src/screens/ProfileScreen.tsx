import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants/Colors';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Crypto Tracker</Text>
          <Text style={styles.email}>tracker@crypto.com</Text>
        </View>
        <Icon
          name="user-circle"
          size={60}
          color={Colors.blue}
          style={styles.avatar}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionName}>Notification</Text>
        <Icon
          name="bell"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Funds</Text>
        <Icon
          name="dollar"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Settings</Text>
        <Icon
          name="gear"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Connected Apps</Text>
        <Icon
          name="link"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Logout</Text>
        <Icon
          name="sign-out"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Support</Text>
        <Icon
          name="life-ring"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Contact</Text>
        <Icon
          name="envelope"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Invite</Text>
        <Icon
          name="users"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Licenses</Text>
        <Icon
          name="certificate"
          size={20}
          color={Colors.secondaryTextColor}
          style={styles.sectionIcon}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 6,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 4,
    paddingBottom: 16,
    marginHorizontal: 8,
    padding: 8,
    marginBottom: 48,
    marginTop: 24,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    color: Colors.primaryTextColor,
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: Colors.secondaryTextColor,
  },
  avatar: {
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.disabledState,
    marginVertical: 4,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    padding: 8,
  },
  sectionName: {
    fontSize: 14,
    color: Colors.primaryTextColor,
    flex: 1,
    marginRight: 16,
  },
  sectionIcon: {
    marginRight: 10,
  },
  versionInfo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'transparent',
  },
  versionText: {
    fontSize: 10,
    color: Colors.secondaryTextColor,
  },
});

export default ProfileScreen;
