import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import icons from "../utils/index";

const Notification = ({ type, author }) => {
  const [image, setImage] = useState(null);
  const [isIcon, setIsIcon] = useState(false);

  const getAuthorInfo = async () => {
    try {
      fetch(`https://arena-rpg.up.railway.app/users/user/${author}`)
        .then((response) => response.json())
        .then((data) => {
          setImage(data[0].picture);
          if (
            Number(data[0].picture) >= "0" &&
            Number(data[0].picture) <= "20"
          ) {
            setIsIcon(true);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuthorInfo();
    // console.log(image.length);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={isIcon ? icons[image].image : { uri: image }}
      />
      <View style={{ width: "80%" }}>
        <Text style={{ color: "white" }}>
          {author + " "}
          {type === "comment" ? "Comentou no seu post" : "curtiu seu post"}
        </Text>
      </View>
      <Text style={styles.time}>1 hora atrás</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b1b1b50",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 25,
    marginRight: 7,
  },
  time: {
    position: "absolute",
    right: 10,
    top: 5,
    color: "white",
    fontSize: 10,
  },
});
