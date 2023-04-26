import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import icons from "../../../../utils/index";
import { TextInput } from "react-native-gesture-handler";
import DeleteModal from "../../../../Modals/DeleteModal";
import EditModal from "../../../../Modals/EditModal";

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
  changeComment,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [textEdit, setTextEdit] = useState(text);
  const [currentComment, setCurrentComment] = useState(text);
  const [authorInfo, setAuthorInfo] = useState("");
  const [image, setImage] = useState("");
  const [isLiked, setIsLiked] = useState("");
  const [isDesliked, setIsDesliked] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

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
          setIsDesliked(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeslike = async () => {
    try {
      fetch(`http://192.168.15.18:5000/comments/deslike/${commentId}`, {
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
          setIsDesliked(!isDesliked);
          setIsLiked(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePatch = async () => {
    try {
      fetch(`http://192.168.15.18:5000/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textEdit,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsEdit(false);
          setCurrentComment(textEdit);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      fetch(`http://192.168.15.18:5000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsDeleted(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuthorInfo();
    likes.includes(userInfo._id) ? setIsLiked(true) : setIsLiked(false);
    deslikes.includes(userInfo._id)
      ? setIsDesliked(true)
      : setIsDesliked(false);
  }, []);

  return isDeleted ? null : (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row" }}>
            {edited ? (
              <Text style={{ color: "gray", fontSize: 10 }}>Editado</Text>
            ) : null}
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color="white"
              style={styles.interactionIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.commentContent}>
        <Text>{currentComment}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleLike} style={{ paddingRight: 30 }}>
            {isLiked ? (
              <Ionicons name="heart" size={24} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeslike}
            style={{ paddingRight: 30 }}
          >
            {isDesliked ? (
              <Ionicons name="heart-dislike" size={24} color="#3f0f12" />
            ) : (
              <Ionicons name="heart-dislike-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          {authorInfo[0]?.nickName === userInfo?.nickName ? (
            <>
              <TouchableOpacity
                onPress={() => setIsEdit(true)}
                style={{ paddingRight: 30 }}
              >
                <Ionicons name="md-pencil-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Ionicons
                  name="trash"
                  size={24}
                  color="black"
                  style={{ alignSelf: "flex-end" }}
                />
              </TouchableOpacity>
            </>
          ) : null}
          <DeleteModal
            modalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            handleDelete={handleDelete}
            type={"comentário"}
          />
          <EditModal
            modalVisible={isEdit}
            setModalVisible={setIsEdit}
            handlePatch={handlePatch}
            textEdit={textEdit}
            setTextEdit={setTextEdit}
          />
        </View>
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
    paddingRight: 32,
    paddingTop: 15,
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
