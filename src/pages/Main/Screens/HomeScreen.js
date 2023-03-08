import { View, Text } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Home")}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
