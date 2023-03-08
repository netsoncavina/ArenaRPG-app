import { View, Text } from "react-native";
import React from "react";

const SettingsScreen = () => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Settings")}>
        SettingsScreen
      </Text>
    </View>
  );
};

export default SettingsScreen;
