import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardScreen from "../screens/DashboardScreen";
import HourlyScreen from "../screens/HourlyScreen";
import DailyScreen from "../screens/DailyScreen";
import RadarScreen from "../screens/RadarScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
          } else if (route.name === "Hourly") {
            iconName = focused ? "clock-time-four-outline" : "clock-time-four-outline";
          } else if (route.name === "Daily") {
            iconName = focused ? "calendar" : "calendar";
          } else if (route.name === "Radar") {
            iconName = focused ? "radar" : "radar";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons
              name={iconName as any}
              size={size}
              color={color}
            />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Hourly" component={HourlyScreen} />
      <Tab.Screen name="Daily" component={DailyScreen} />
      <Tab.Screen name="Radar" component={RadarScreen} />
    </Tab.Navigator>
  );
}
