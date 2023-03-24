import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import icons from "../../../../utils/index";

const Comments = ({ author, text }) => {
  const [authorInfo, setAuthorInfo] = useState("");
  const [image, setImage] = useState("");
  const [isIcon, setIsIcon] = useState(false);

  const getAuthorInfo = async () => {
    try {
      fetch(`http://192.168.15.18:5000/users/user/${author}`)
        .then((response) => response.json())
        .then((data) => {
          setAuthorInfo(data);
          setImage(data[0].picture);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuthorInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {image ? (
          <Image
            style={styles.image}
            source={image.length > 2 ? { uri: image } : icons[image].image}
          />
        ) : (
          <ActivityIndicator
            size="small"
            color="#b02b2e"
            style={{ marginRight: 10 }}
          />
        )}

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
