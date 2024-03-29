import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Share,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "../../../utils/index";
import Comments from "./Comments/Comments";
import { TouchableOpacity } from "react-native-gesture-handler";
import { likePost } from "../../../../api/post";

const PostView = ({
  title,
  author,
  content,
  system,
  type,
  image,
  likes,
  createdAt,
  modalVisible,
  setModalVisible,
  postId,
}) => {
  const [user, setUser] = useState(null);
  const [isIcon, setIsIcon] = useState(false);
  const [source, setSource] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [heartColor, setHeartColor] = useState("white");
  const [isLiked, setIsLiked] = useState(false);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const getComments = async () => {
    try {
      fetch(`http://192.168.15.18:5000/comments/post/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async () => {
    try {
      const response = await likePost(postId, user._id);
      // console.log(response);
      setHeartColor(heartColor === "white" ? "red" : "white");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: title,
        message: "Titulo: " + title + "\n" + content,
        url: image,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log("shared with activity type of", result.activityType);
        } else {
          // console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        alert("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getUserData().then((data) => {
      setUser(data);
      if (
        data.picture != null &&
        data.picture != undefined &&
        data.picture != "" &&
        data.picture < icons.length
      ) {
        setSource(icons[data.picture].image);
        setIsIcon(true);
      } else {
        setSource(data.picture);
        setIsIcon(false);
      }
      if (likes.includes(data._id)) {
        setIsLiked(true);
        setHeartColor("red");
      }
    });
    getComments();
  }, []);

  const handleComment = async () => {
    try {
      fetch("https://arena-rpg.up.railway.app/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          author: user.nickName,
          postId: postId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setComments([...comments, data]);
          clearInput();
        });
      // console.log(comments);
    } catch (e) {
      console.log(e);
    }
  };

  const clearInput = () => {
    setComment("");
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.topBar}>
          <Ionicons
            name="return-down-back"
            size={35}
            color="white"
            style={{ marginLeft: 5 }}
            onPress={() => setModalVisible(!modalVisible)}
          />

          <Text
            style={{ fontFamily: "Tormenta20x", color: "white", fontSize: 23 }}
          >
            Arena RPG
          </Text>
          <View>
            <Image
              source={isIcon ? source : { uri: source }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                borderColor: "#1e1e1e",
                borderWidth: 2,
              }}
              animation="zoomIn"
              delay={800}
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.imageInnerText}>{title}</Text>
        </View>
        <View style={styles.info}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color="white"
              style={{ marginLeft: 5 }}
            />
            <Text style={{ color: "#fff", marginRight: 7, marginLeft: 4 }}>
              {author}
            </Text>
          </View>
          <View>
            <Text style={styles.type}>{type}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesomeIcon
              icon={faDiceD20}
              size={18}
              color="white"
              style={{ marginLeft: 15, marginRight: 3, marginTop: 3 }}
            />
            <Text style={{ color: "white", margin: 3 }}>{system}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={{ fontSize: 15 }}>{content}</Text>
        </View>
        <View style={styles.interactionIcons}>
          {isLiked ? (
            <Ionicons
              name="heart"
              size={24}
              color="red"
              style={styles.interactionIcon}
              onPress={handleLike}
            />
          ) : (
            <Ionicons
              name="heart"
              size={24}
              color="white"
              style={styles.interactionIcon}
              onPress={handleLike}
            />
          )}

          <Ionicons
            name="share-social"
            size={24}
            color="white"
            style={styles.interactionIcon}
            onPress={handleShare}
          />
        </View>
        {comments.length != 0 ? (
          <View style={{ height: "43%" }}>
            <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
              {comments.map((comment) => (
                <Comments
                  userInfo={user}
                  commentId={comment._id}
                  author={comment.author}
                  text={comment.text}
                  likes={comment.likes}
                  deslikes={comment.deslikes}
                  edited={comment.edited}
                  createdAt={comment.createdAt}
                  answers={comment.answers}
                  key={Math.random()}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.commentsSection}>
            <Text>Nenhum comentário ainda</Text>
            <Animatable.Image
              source={require("../../../../assets/beholder_image.png")}
              style={{ width: 200, height: 200, marginTop: "20%" }}
              animation="zoomIn"
              delay={800}
            />
          </View>
        )}

        <TextInput
          placeholder="Adicione um comentário"
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => setComment(text)}
          value={comment}
        />
        <Ionicons
          name="send"
          size={25}
          color="white"
          style={styles.sendIcon}
          onPress={() => {
            comment != "" &&
            comment != undefined &&
            comment != null &&
            comment.length > 0 &&
            comment.trim().length !== 0
              ? handleComment()
              : null;
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b02b2e",
    padding: 10,
    borderTopWidth: 0.2,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    opacity: 0.2,
  },
  imageInnerText: {
    position: "absolute",
    fontSize: 30,
    fontFamily: "Tormenta20x",
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  type: {
    backgroundColor: "#b02b2e",
    color: "white",
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
    fontFamily: "Tormenta20x",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
  },
  content: {
    padding: 10,
    borderBottomWidth: 0.9,
  },
  interactionIcons: {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.9,
  },
  interactionIcon: {
    margin: 5,
  },
  commentsSection: {
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: "100%",
  },
  textInput: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    backgroundColor: "#b02b2e",
    color: "white",
    padding: 10,
  },
  sendIcon: {
    position: "absolute",
    bottom: 13,
    right: 25,
  },
});

export default PostView;
