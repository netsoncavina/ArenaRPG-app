import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image, TextInput, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "../../../utils/index";

const PostView = ({
  title,
  author,
  content,
  system,
  type,
  image,
  createdAt,
  comments,
  icon,
  modalVisible,
  setModalVisible,
}) => {
  const [isIcon, setIsIcon] = useState(false);
  const [source, setSource] = useState(null);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserData().then((data) => {
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
    });
  }, []);
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
            style={{ fontFamily: "Tormenta20x", color: "white", fontSize: 20 }}
          >
            Heróis do RPG
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
          <View style={{ flexDirection: "row" }}>
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
        </View>
        <View style={styles.commentsSection}>
          {comments ? (
            comments.map((comment) => (
              <View key={comment.id}>
                <Text>{comment.author}</Text>
                <Text>{comment.content}</Text>
              </View>
            ))
          ) : (
            <>
              <Text>Nenhum comentário ainda</Text>
              <Animatable.Image
                source={require("../../../../assets/beholder_image.png")}
                style={{ width: 200, height: 200 }}
                animation="zoomIn"
                delay={800}
              />
            </>
          )}
        </View>
        <TextInput
          placeholder="Adicione um comentário"
          style={styles.textInput}
          multiline={true}
        />
        <Ionicons name="send" size={20} color="white" style={styles.sendIcon} />
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
  },
  image: {
    width: "100%",
    height: 150,
    opacity: 0.25,
  },
  imageInnerText: {
    position: "absolute",
    top: 10,
    left: "5%",
    width: "100%",
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