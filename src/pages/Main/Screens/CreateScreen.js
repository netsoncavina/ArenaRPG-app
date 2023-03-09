import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../../../components/NavBar";

const CreateScreen = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate("NewPost")}>CreateScreen</Text>
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

export default CreateScreen;
