import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import HourlyScreen from '../screens/HourlyScreen';
import DailyScreen from '../screens/DailyScreen';
import RadarScreen from '../screens/RadarScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name="Dash" component={DashboardScreen} />
      <Tab.Screen name="Hourly" component={HourlyScreen} />
      <Tab.Screen name="Daily" component={DailyScreen} />
      <Tab.Screen name="Radar" component={RadarScreen} />
    </Tab.Navigator>
  );
}