import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import LoginSignupScreen from "../screens/LoginSignupScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }} // Hide the header since the TabNavigator handles navigation
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
    </Stack.Navigator>
  );
}
