import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Notification from "../../../components/Notification/Notification";

const NotificationsScreen = () => {
  return (
    <LinearGradient
      colors={["#b02b2e", "#3f0f12", "#1e1e1e"]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Notification type={"comment"} author={"VoidNoxian"} />
        <Notification type={"like"} author={"Dayzinha"} />
        <Notification type={"comment"} author={"Jack"} />
        <Notification type={"like"} author={"Jamersons"} />
        <Notification type={"like"} author={"Tomato"} />
      </ScrollView>
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
