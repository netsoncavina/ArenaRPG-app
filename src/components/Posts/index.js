import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import Post from "./Post/Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.15.18:5000/posts")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setPosts(data);
          setLoading(false);
        }, 500);
      });
  }, []);

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
        {isLoading ? (
          <ActivityIndicator size="large" color="#b02b2e" />
        ) : (
          posts.map((post) => {
            return (
              <Post
                image={post.image}
                title={post.title}
                author={post.author}
                content={post.content}
                system={post.system}
                type={post.type}
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
});
