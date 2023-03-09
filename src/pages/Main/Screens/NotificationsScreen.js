import { View, Text } from "react-native";
import React from "react";

const NotificationsScreen = () => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Settings")}>
        NotificationsScreen
      </Text>
    </View>
  );
};

export default NotificationsScreen;
