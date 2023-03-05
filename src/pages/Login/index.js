import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    nickName: "",
    password: "",
  });

  const login = async () => {
    let nickName = userData.nickName;
    let password = userData.password;
    console.log(nickName, password);
    try {
      const response = await fetch("http://192.168.15.18:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: nickName,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-vindo aventureiro!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.label}>Apelido</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu apelido..."
          onChangeText={(value) =>
            setUserData({ ...userData, nickName: value })
          }
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          secureTextEntry={true}
          onChangeText={(value) =>
            setUserData({ ...userData, password: value })
          }
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
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
  buttonRegister: {
    marginTop: 12,
    alignSelf: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#a1a1a1",
  },
});
