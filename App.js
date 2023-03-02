import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";

// get users from localhost and assing to users

export default function App() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://192.168.15.18:5000/users");
    const users = await response.json();
    setUsers(users);
    console.log(users[0].name);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{users[0].nickName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
