import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Post from "./Post/Post";

const Posts = () => {
  return (
    <View>
      <Post
        image={
          "https://uploads.jovemnerd.com.br/wp-content/uploads/2022/12/nc862_rpg_ghanor_4__z343lvoq-1210x544.jpg"
        }
        title={"Procura-se player"}
        author={"VoidNoxian"}
        content={"Procura-se player para uma aventura épica"}
        system={"Ghanor"}
        type={"Mesa"}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({});
