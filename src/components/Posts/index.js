import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { getPosts } from "../../api/post";
import Post from "./Post/Post";

const Posts = ({ filter, image, currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts(filter, setLoading).then((data) => {
      setPosts(data);
      setLoading(false);
      setRefreshing(false);
    });
  }, [filter]);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(filter, setLoading).then((data) => {
      setPosts(data);
      setLoading(false);
      setRefreshing(false);
    });
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
        ) : filter !== "Recomendados" ? (
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
                  likes={post.likes}
                  deslikes={post.deslikes}
                  postId={post._id}
                  currentUser={currentUser}
                  refresh={onRefresh}
                  key={post._id}
                />
              );
            })
        ) : (
          posts
            .sort(() => Math.random() - 0.5)
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
                  likes={post.likes}
                  deslikes={post.deslikes}
                  postId={post._id}
                  currentUser={currentUser}
                  refresh={onRefresh}
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
