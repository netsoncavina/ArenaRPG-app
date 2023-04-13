import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import moment from "moment/moment";
import "moment/locale/pt-br";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import PostView from "./PostView/PostView";
import PopUpMenu from "../../PopUpMenu";

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
  postId,
}) => {
  moment.locale("pt-br");
  const [showMenu, setShowMenu] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showSecondaryIcons, setShowSecondaryIcons] = useState(false);
  const showDropDownMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleShowSecondaryIcons = () => {
    setShowSecondaryIcons(!showSecondaryIcons);
  };

  const handleShowPost = () => {
    setShowPost(!showPost);
  };

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

          {/* <PopUpMenu /> */}
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
        {showSecondaryIcons ? (
          <>
            <Ionicons
              name="heart"
              size={20}
              color="white"
              style={styles.interactionIcon}
            />
            <Ionicons
              name="chatbubble"
              size={20}
              color="white"
              style={styles.interactionIcon}
            />
            <Ionicons
              name="share-social"
              size={20}
              color="white"
              style={styles.interactionIcon}
            />
            <Ionicons
              name="arrow-forward"
              size={20}
              color="white"
              style={styles.interactionIcon}
              onPress={handleShowSecondaryIcons}
            />
          </>
        ) : (
          <>
            <Ionicons
              name="arrow-back"
              size={20}
              color="white"
              style={styles.interactionIcon}
              onPress={handleShowSecondaryIcons}
            />
            <Ionicons
              name="md-pencil-outline"
              size={20}
              color="white"
              style={styles.interactionIcon}
            />
            <Ionicons
              name="trash"
              size={20}
              color="black"
              style={styles.interactionIcon}
            />
          </>
        )}
      </View>
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
    width: 170,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
    position: "absolute",
    bottom: 10,
    right: 10,
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
