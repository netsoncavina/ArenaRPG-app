import React, { useState } from "react";
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
  const [filter, setFilter] = useState("Inicio");
  const [image, setImage] = useState(null);
  const [page, setPage] = useState("Home");
  return (
    <>
      <NavBar
        filter={filter}
        setFilter={setFilter}
        image={image}
        setImage={setImage}
        page={page}
      />

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
        {/* Change setPage based on tab screen */}
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen filter={filter} image={image} />}
        />
        <Tab.Screen name="Create" children={() => <CreateScreen />} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </>
  );
}
