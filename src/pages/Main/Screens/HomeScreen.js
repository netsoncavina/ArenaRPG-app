import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Posts from "../../../components/Posts";

const HomeScreen = ({ filter }) => {
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
    <View>
      <View style={styles.container}>
        <Posts filter={filter} />
      </View>
    </View>
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
