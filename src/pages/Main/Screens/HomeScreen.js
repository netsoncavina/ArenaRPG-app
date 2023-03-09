import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Posts from "../../../components/Posts";

const HomeScreen = ({ navigation, name }) => {
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
        {/* <Text onPress={() => navigation.navigate("Home")}>
          Olá {userData.nickName}
        </Text> */}
        <Posts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default HomeScreen;
