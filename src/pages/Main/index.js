import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./Screens/HomeScreen";
import CreateScreen from "./Screens/CreateScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";
import NavBar from "../../components/NavBar";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <>
      <NavBar />
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
            } else if (routeName === "Notifications") {
              iconName = focused ? "notifications" : "md-notifications-outline";
            }
            return <Ionicons name={iconName} size={size} color={"#b02b2e"} />;
          },
          tabBarLabel: ({ focused, color, size }) => {
            let routeName = route.name;
            if (routeName === "Home") {
              color = focused ? "#b02b2e" : "white";
              return (
                <Text style={{ color: color, paddingBottom: 7 }}>Home</Text>
              );
            } else if (routeName === "Create") {
              color = focused ? "#b02b2e" : "white";
              return (
                <Text style={{ color: color, paddingBottom: 7 }}>Create</Text>
              );
            } else if (routeName === "Notifications") {
              color = focused ? "#b02b2e" : "white";
              return (
                <Text style={{ color: color, paddingBottom: 7 }}>
                  Notifications
                </Text>
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
        <Tab.Screen name="Home" children={() => <HomeScreen />} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </>
  );
}
