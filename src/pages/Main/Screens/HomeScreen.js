import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Posts from "../../../components/Posts";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ filter, image }) => {
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      const userValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserData(userValue);

      // console.log(userValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <LinearGradient
      colors={["#3f0f12", "#b02b2e", "#3f0f12", "#1e1e1e"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Posts filter={filter} image={image} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default HomeScreen;
