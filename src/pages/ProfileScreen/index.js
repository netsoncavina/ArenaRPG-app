import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment/moment";
import "moment/locale/pt-br";
import Post from "../../components/Posts/Post/Post";
import { getUserPosts } from "../../api/user";

const ProfileScreen = (profileData) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const userData = profileData.route.params.profileData;

  useEffect(() => {
    setTimeout(() => {
      getUserPosts(userData.nickName).then((data) => {
        setPosts(data);
      });
      setLoading(false);
    }, 500);
  }, []);
  const [loaded] = useFonts({
    Tormenta20x: require("../../../assets/fonts/Tormenta20x.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Animatable.View style={{ flex: 1 }} animation="fadeInDown">
      <LinearGradient
        colors={["#b02b2e", "#3f0f12", "#1e1e1e"]}
        style={{ flex: 1 }}
      >
        <Animatable.View
          style={styles.container}
          delay={200}
          animation="fadeInDown"
        >
          <View style={styles.topBar}>
            <Animatable.Image
              source={{
                uri: userData.picture,
              }}
              style={styles.imageStyle}
              animation="zoomIn"
              delay={800}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontFamily: "Tormenta20x",
                  color: "white",
                  fontSize: 23,
                }}
              >
                {userData.nickName}
              </Text>
              <Text
                style={{
                  fontFamily: "Tormenta20x",
                  color: "white",
                  fontSize: 13,
                  paddingLeft: 2,
                }}
              >
                Conta criada {moment(userData.createdAt).fromNow()}
              </Text>
              <Text
                style={{
                  fontFamily: "Tormenta20x",
                  color: "white",
                  fontSize: 13,
                  paddingLeft: 2,
                }}
              >
                {posts.length === 0
                  ? "Nenhum post publicado"
                  : posts.length > 1
                  ? `${posts.length} posts publicados`
                  : `${posts.length} post publicado`}
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={["#b02b2e", "#1e1e1e"]}
            style={{ marginTop: 20 }}
          >
            <View style={styles.midContainer}>
              <Text
                style={{
                  fontFamily: "Tormenta20x",
                  color: "white",
                  fontSize: 23,
                }}
              >
                Posts deste usuario
              </Text>
            </View>
          </LinearGradient>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: isLoading
                ? "center"
                : posts.length == 0
                ? "center"
                : "flex-start",
            }}
            style={styles.container}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#b02b2e" />
            ) : posts.length == 0 ? (
              <>
                <Text style={styles.text}>Nenhum post encontrado :( </Text>
                <Image
                  source={require("../../assets/sad.png")}
                  style={styles.image}
                />
              </>
            ) : (
              posts
                .sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .map((post) => {
                  return (
                    <Post
                      image={post.image}
                      title={post.title}
                      author={post.author}
                      content={post.content}
                      system={post.system}
                      type={post.type}
                      createdAt={post.createdAt}
                      comments={post.comments}
                      postId={post._id}
                      key={post._id}
                    />
                  );
                })
            )}
          </ScrollView>
        </Animatable.View>
      </LinearGradient>
    </Animatable.View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  topBar: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  imageStyle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: "#1e1e1e",
    borderWidth: 2,
    marginRight: 20,
  },
  midContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "#1e1e1e",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  container: {
    height: "100%",
  },
  image: {
    width: 300,
    height: 300,
  },
});
