import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

import * as Animatable from "react-native-animatable";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require("../../assets/logo.png")}
          style={{ width: "100%" }}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>
          Encontra mesas e aventuras a qualquer momento!
        </Text>
        <Text style={styles.text}>Faça login para começar sua jornada</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b02b2e",
  },
  containerLogo: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#3f0f12",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#a1a1a1",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff",
    width: "100%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "#b02b2e",
    fontWeight: "bold",
  },
});
