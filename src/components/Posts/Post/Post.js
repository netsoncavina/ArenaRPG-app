import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet, Share } from "react-native";
import moment from "moment/moment";
import "moment/locale/pt-br";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import PostView from "./PostView/PostView";
import DeleteModal from "../../Modals/DeleteModal";
import EditModal from "../../Modals/EditModal";
import { likePost, editPost, deletePost } from "../../../api/post";

const Post = ({
  title,
  author,
  content,
  system,
  type,
  image,
  createdAt,
  icon,
  comments,
  likes,
  deslikes,
  postId,
  currentUser,
  refresh,
}) => {
  moment.locale("pt-br");
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showSecondaryIcons, setShowSecondaryIcons] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [textEdit, setTextEdit] = useState(content);
  const [heartColor, setHeartColor] = useState("white");
  const showDropDownMenu = () => {
    setShowMenu(!showMenu);
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowSecondaryIcons = () => {
    setShowSecondaryIcons(!showSecondaryIcons);
  };

  const handleShowPost = () => {
    setShowPost(!showPost);
  };

  const handleEditPost = async () => {
    try {
      const response = await editPost(postId, titleEdit, textEdit);
      // console.log(response);
      setIsEditModalVisible(false);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(postId);
      // console.log(response);
      setIsDeleteModalVisible(false);
      refresh();
    } catch (error) {
      console.log(error);
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
      // console.log(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="time-outline" size={20} color="white" />
          <Text
            style={{
              color: "#fff",
              marginRight: 7,
              marginLeft: 4,
            }}
          >
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </View>
      <View>
        <Pressable onPress={handleShowPost}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
        <View style={styles.authorInfo}>
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
        <View style={styles.icons}>
          <Ionicons
            name="book"
            size={18}
            color="white"
            style={{ marginRight: 3 }}
          />
          <Text style={{ color: "white", margin: 3 }}>{system}</Text>

          <FontAwesomeIcon
            icon={faDiceD20}
            size={18}
            color="white"
            style={{ marginLeft: 15, marginRight: 3 }}
          />
          <Text style={{ color: "white", margin: 3 }}>{type}</Text>
        </View>
      </View>
      <View style={styles.interactionIcons}>
        {showSecondaryIcons === false ? (
          <>
            {likes.includes(user?._id) ? (
              <Ionicons
                name="heart"
                size={24}
                color={heartColor}
                style={styles.interactionIcon}
                onPress={handleLike}
              />
            ) : (
              <Ionicons
                name="heart"
                size={24}
                color={heartColor}
                style={styles.interactionIcon}
                onPress={handleLike}
              />
            )}
            <Ionicons
              name="chatbubble"
              size={24}
              color="white"
              style={styles.interactionIcon}
            />
            <Ionicons
              name="share-social"
              size={24}
              color="white"
              style={styles.interactionIcon}
              onPress={handleShare}
            />
            {currentUser === author ? (
              <Ionicons
                name="arrow-forward"
                size={24}
                color="white"
                style={styles.interactionIcon}
                onPress={handleShowSecondaryIcons}
              />
            ) : null}
          </>
        ) : (
          <>
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={styles.interactionIcon}
              onPress={handleShowSecondaryIcons}
            />
            <Ionicons
              name="md-pencil-outline"
              size={24}
              color="white"
              style={styles.interactionIcon}
              onPress={() => setIsEditModalVisible(true)}
            />
            <Ionicons
              name="trash"
              size={24}
              color="white"
              style={styles.interactionIcon}
              onPress={() => setIsDeleteModalVisible(true)}
            />
          </>
        )}
      </View>
      <DeleteModal
        modalVisible={isDeleteModalVisible}
        setModalVisible={setIsDeleteModalVisible}
        handleDelete={handleDeletePost}
        type={"post"}
      />

      <EditModal
        modalVisible={isEditModalVisible}
        setModalVisible={setIsEditModalVisible}
        handlePatch={handleEditPost}
        textEdit={textEdit}
        setTextEdit={setTextEdit}
        titleEdit={titleEdit}
        setTitleEdit={setTitleEdit}
        type={"post"}
      />

      {showPost && (
        <PostView
          title={title}
          author={author}
          content={content}
          system={system}
          type={type}
          image={image}
          createdAt={createdAt}
          icon={icon}
          postId={postId}
          modalVisible={showPost}
          setModalVisible={setShowPost}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 180,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 3,
    alignItems: "center",
    color: "#fff",
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 3,
    position: "absolute",
    top: 10,
    left: 10,
    height: 35,
    // width: 90,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
  },
  icons: {
    height: 30,
    width: 220,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
  },
  image: {
    width: 350,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  interactionIcons: {
    flexDirection: "row",
    alignItems: "space-between",

    justifyContent: "space-between",
    margin: 3,
    position: "absolute",
    top: 140,
    left: 10,
    width: 350,
  },
  interactionIcon: {
    margin: 5,
  },
});

export default Post;
