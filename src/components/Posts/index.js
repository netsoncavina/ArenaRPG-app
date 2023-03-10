import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import Post from "./Post/Post";

const Posts = () => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
        <View style={{ height: 20 }} />
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

        <Post
          image={
            "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/11/NC805-magias-do-rpg-1210x544.png"
          }
          title={"Guia de magias"}
          author={"Ignis Crae"}
          content={"Procura-se player para uma aventura épica"}
          system={"D&D"}
          type={"Off Topic"}
        />
        <Post
          image={
            "https://uploads.jovemnerd.com.br/wp-content/uploads/2021/01/NC_761-bastidores-ncrpg-1210x544.png"
          }
          title={"Formação de mesa"}
          author={"Rexthor   "}
          content={"Procura-se player para uma aventura épica"}
          system={"Cthulhu"}
          type={"Mesa"}
        />
        <Post
          image={
            "https://uploads.jovemnerd.com.br/wp-content/uploads/RPG_CYBERPUNK_FINAL_opt-1210x544.jpg"
          }
          title={"Duvidas sobre Cyberpunk"}
          author={"Arius   "}
          content={"Procura-se player para uma aventura épica"}
          system={"3D&T"}
          type={"Off Topic"}
        />
      </ScrollView>
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
