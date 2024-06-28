import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OptionsScreen from '../screens/OptionsScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Watchlist from '../screens/Watchlist';
import {Colors} from '../constants/Colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Watchlist') {
              iconName = 'bookmark';
            } else if (route.name === 'Options') {
              iconName = 'line-chart';
            } else if (route.name === 'Rewards') {
              iconName = 'gift';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.blue,
          tabBarInactiveTintColor: Colors.secondaryTextColor,
          tabBarStyle: {backgroundColor: Colors.primaryColor},
          headerShown: false,
        })}>
        <Tab.Screen name="Watchlist" component={Watchlist} />
        <Tab.Screen name="Options" component={OptionsScreen} />
        <Tab.Screen name="Rewards" component={RewardsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
