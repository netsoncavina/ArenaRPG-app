import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Comments = ({ author, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/1374081?v=4",
          }}
          style={styles.image}
        />
        <Text>{author}</Text>
      </View>
      <View style={styles.commentContent}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderBottomWidth: 0.9,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 25,
    marginRight: 7,
  },
  commentContent: {
    width: "100%",
    height: "100%",
    paddingLeft: 32,
  },
});
