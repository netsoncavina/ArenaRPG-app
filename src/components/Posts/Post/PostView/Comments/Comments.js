import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import icons from "../../../../utils/index";

const Comments = ({
  userInfo,
  commentId,
  author,
  text,
  likes,
  deslikes,
  edited,
  createdAt,
  answers,
}) => {
  const [authorInfo, setAuthorInfo] = useState("");
  const [image, setImage] = useState("");
  const [isLiked, setIsLiked] = useState("");

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

  const handleLike = async () => {
    try {
      fetch(`http://192.168.15.18:5000/comments/like/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLiked(!isLiked);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuthorInfo();
    likes.includes(userInfo._id) ? setIsLiked(true) : setIsLiked(false);
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

      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={handleLike}>
          {isLiked ? (
            <Ionicons name="heart" size={24} color="red" />
          ) : (
            <Ionicons name="heart-outline" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
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
    // height: "100%",
    paddingLeft: 32,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 32,
    paddingTop: 15,
  },
});
