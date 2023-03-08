import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./Screens/HomeScreen";
import CreateScreen from "./Screens/CreateScreen";
import SettingsScreen from "./Screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;
          if (routeName === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (routeName === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={"#b02b2e"} />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          let routeName = route.name;
          if (routeName === "Home") {
            color = focused ? "#b02b2e" : "white";
            return <Text style={{ color: color, paddingBottom: 7 }}>Home</Text>;
          } else if (routeName === "Create") {
            color = focused ? "#b02b2e" : "white";
            return (
              <Text style={{ color: color, paddingBottom: 7 }}>Create</Text>
            );
          } else if (routeName === "Settings") {
            color = focused ? "#b02b2e" : "white";
            return (
              <Text style={{ color: color, paddingBottom: 7 }}>Setting</Text>
            );
          }
        },
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#1e1e1e",
          padding: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
