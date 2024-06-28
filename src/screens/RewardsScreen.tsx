import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants/Colors';

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rewards</Text>

      <View style={styles.rewardSection}>
        <Icon
          name="diamond"
          size={24}
          color="#FFD700"
          style={styles.rewardIcon}
        />
        <View style={styles.rewardContent}>
          <Text style={styles.rewardTitle}>Diamond Tier</Text>
          <Text style={styles.rewardDescription}>
            Access exclusive events and early product releases. Enjoy
            personalized support and premium rewards.
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.rewardSection}>
        <Icon name="star" size={24} color="#FF6347" style={styles.rewardIcon} />
        <View style={styles.rewardContent}>
          <Text style={styles.rewardTitle}>Gold Tier</Text>
          <Text style={styles.rewardDescription}>
            Receive priority customer service and special discounts on selected
            items. Join members-only webinars.
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.rewardSection}>
        <Icon
          name="trophy"
          size={24}
          color="#C0C0C0"
          style={styles.rewardIcon}
        />
        <View style={styles.rewardContent}>
          <Text style={styles.rewardTitle}>Silver Tier</Text>
          <Text style={styles.rewardDescription}>
            Earn bonus points with every purchase and access to exclusive
            product trials. Receive early access to sales.
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.rewardSection}>
        <Icon
          name="certificate"
          size={24}
          color="#8B4513"
          style={styles.rewardIcon}
        />
        <View style={styles.rewardContent}>
          <Text style={styles.rewardTitle}>Bronze Tier</Text>
          <Text style={styles.rewardDescription}>
            Enjoy regular updates on new products and promotions. Participate in
            monthly giveaways and contests.
          </Text>
        </View>
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
  header: {
    fontSize: 20,
    color: Colors.primaryTextColor,
    textAlign: 'left',
    marginVertical: 10,
    marginBottom: 30,
  },
  rewardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rewardIcon: {
    marginRight: 16,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    color: Colors.primaryTextColor,
    marginBottom: 8,
  },
  rewardDescription: {
    fontSize: 14,
    color: Colors.secondaryTextColor,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.disabledState,
    marginVertical: 16,
  },
});

export default RewardsScreen;
