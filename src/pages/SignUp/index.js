import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";

export default function SingUp() {
  const [userData, setUserData] = useState({
    name: "",
    nickName: "",
    email: "",
    picture: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const formatBase64 = (base64) => {
    const base64Img = `data:image/jpg;base64,${base64}`;
    return base64Img;
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Desculpe, precisamos de acesso às suas fotos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result.assets[0].base64);
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
      setUserData({
        ...userData,
        picture: `data:image/png;base64,${result.assets[0].base64}`,
      });
    }
  };

  const createUser = async (userData) => {
    let name = userData.name;
    let nickName = userData.nickName;
    let email = userData.email;
    let password = userData.password;
    let picture = userData.picture;

    try {
      const response = await fetch("http://192.168.15.18:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          nickName: nickName,
          email: email,
          password: password,
          picture: picture,
        }),
      });
      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = () => {
    console.log(userData);
    if (userData.password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }
    createUser(userData);
    console.log("Usuário cadastrado com sucesso!");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Realize seu cadastro aventureiro!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <View style={styles.imageContainer}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.image}
              resizeMode="cover"
              onPress={handleChoosePhoto}
            />
          ) : (
            <Ionicons
              name="person"
              size={100}
              color="#fff"
              onPress={handleChoosePhoto}
            />
          )}
        </View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome..."
          onChangeText={(value) => setUserData({ ...userData, name: value })}
        />

        <Text style={styles.label}>Apelido</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu apelido..."
          onChangeText={(value) =>
            setUserData({ ...userData, nickName: value })
          }
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email..."
          onChangeText={(value) => setUserData({ ...userData, email: value })}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.password}
          placeholder="Digite sua senha..."
          secureTextEntry={true}
          onChangeText={(value) =>
            setUserData({ ...userData, password: value })
          }
        />

        <Text style={styles.label}>Confirme sua senha</Text>
        <TextInput
          style={styles.password}
          placeholder="Confirme sua senha..."
          secureTextEntry={true}
          onChangeText={(value) => setConfirmPassword(value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b02b2e",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  containerForm: {
    backgroundColor: "#3f0f12",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  imageContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#b02b2e",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  label: {
    fontSize: 20,
    marginTop: 28,
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: "#fff",
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

  password: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: "#fff",
  },
});
