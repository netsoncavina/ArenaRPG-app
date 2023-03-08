import { View, Text } from "react-native";
import React from "react";

const CreateScreen = () => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("NewPost")}>CreateScreen</Text>
    </View>
  );
};

export default CreateScreen;
