import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../../../components/NavBar";

const NotificationsScreen = () => {
  return (
    <View>
      <NavBar />
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate("Settings")}>
          NotificationsScreen
        </Text>
      </View>
    </View>
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
