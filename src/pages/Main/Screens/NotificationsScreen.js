import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Notification from "../../../components/Notification/Notification";

const NotificationsScreen = () => {
  return (
    <LinearGradient
      colors={["#b02b2e", "#3f0f12", "#1e1e1e"]}
      style={{ flex: 1 }}
    >
      <View>
        <Notification />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationsScreen;
