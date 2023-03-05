import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import axios from "axios";
export default function SingUp() {
  const [userData, setUserData] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const createUser = async (userData) => {
    let name = userData.name;
    let nickName = userData.nickName;
    let email = userData.email;
    let password = userData.password;
    try {
      const response = await fetch("http://192.168.15.18:5000/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          nickName,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = () => {
    // console.log(JSON.stringify(userData));
    console.log("Clicou no botão de cadastro");
    console.log(userData);
    if (userData.password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }
    createUser(userData);
    console.log("Usuário cadastrado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Realize seu cadastro aventureiro!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
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
    </View>
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
    paddingStart: "5%",
    paddingEnd: "5%",
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
