import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Post from "./Post/Post";

const Posts = ({ filter, image }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getPosts = async () => {
    let url;
    // setLoading(true);
    if (filter == "Inicio") {
      url = "http://192.168.15.18:5000/posts";
    } else if (filter == "Mesas") {
      url = "http://192.168.15.18:5000/posts/post/Mesa";
    } else if (filter == "Jogadores") {
      url = "http://192.168.15.18:5000/posts/post/Jogadores";
    } else if (filter == "Off Topic") {
      url = "http://192.168.15.18:5000/posts/post/Off Topic";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setPosts(data);
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, [filter]);

  const onRefresh = () => {
    getPosts();
  };

  return (
    <>
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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#b02b2e" />
        ) : posts.length == 0 ? (
          <>
            <Text style={styles.text}>Nenhum post encontrado :( </Text>
            <Image
              style={styles.image}
              source={require("../../assets/meme.png")}
            />
          </>
        ) : (
          // Order posts by most recent
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
                  icon={image}
                  comments={post.comments}
                  postId={post._id}
                  key={post._id}
                />
              );
            })
        )}
      </ScrollView>
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    color: "#b02b2e",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
