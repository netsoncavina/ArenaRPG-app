import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

const CreateScreen = ({ setPage }) => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [system, setSystem] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      const data = JSON.parse(jsonValue);
      setUser(data.nickName);
    } catch (e) {
      console.log(e);
    }
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
      aspect: [6, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(`data:image/png;base64,${result.assets[0].base64}`);
    }
  };

  const clear = () => {
    setTitle("");
    setContent("");
    setSystem("");
    setType("");
    setImage("");
  };

  const createPost = async () => {
    try {
      const response = await fetch("http://192.168.15.18:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          system: system,
          type: type,
          image: image,
          author: user,
        }),
      });
      if (response.status != 201) {
        console.log(response);
        alert("Erro ao criar post");
        return;
      }
      const data = await response.json();
      // console.log(data);
      clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const options = ["D&D", "Ghanor", "Tormenta", "AP"];
  const options2 = ["Mesa", "Player", "Off Topic"];

  return (
    <View>
      <View style={styles.container}>
        {image ? (
          <View style={{ height: 100 }}>
            <Image style={styles.image} resizeMode="cover" src={image} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.selectImage}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Selecionar imagem</Text>
              <Ionicons
                name="image"
                size={35}
                color="white"
                style={{ marginLeft: 5 }}
              />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.inputSpace}>
          <Text style={styles.inputTitle}>Titulo do Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o titulo do seu post"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <Text style={styles.inputTitle}>Descrição</Text>
          <TextInput
            style={styles.inputMultiline}
            placeholder="Digite a descrição do seu post"
            multiline={true}
            onChangeText={(text) => setContent(text)}
            value={content}
          />
        </View>
        <View style={styles.dropDowns}>
          <View style={styles.dropdownView}>
            <Text style={styles.dropdownTitle}>Sistema</Text>
            <SelectDropdown
              defaultButtonText="Tormenta"
              buttonStyle={styles.dropdown}
              buttonTextStyle={{ color: "white", fontSize: 16 }}
              dropdownStyle={{
                backgroundColor: "#b02b2e",
                borderWidth: 0.2,
              }}
              dropdownTextStyle={{ color: "white" }}
              rowTextStyle={{ color: "white" }}
              data={options}
              onSelect={(selectedItem, index) => {
                setSystem(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          <View style={styles.dropdownView}>
            <Text style={styles.dropdownTitle}> Tipo</Text>
            <SelectDropdown
              defaultButtonText="Mesa"
              buttonStyle={styles.dropdown}
              buttonTextStyle={{ color: "white", fontSize: 16 }}
              dropdownStyle={{
                backgroundColor: "#b02b2e",
                borderWidth: 0.2,
              }}
              dropdownTextStyle={{ color: "white" }}
              rowTextStyle={{ color: "white" }}
              data={options2}
              onSelect={(selectedItem, index) => {
                setType(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            createPost();
          }}
        >
          <Text style={styles.buttonText}>Postar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  selectImage: {
    marginTop: 20,
    height: 100,
    width: "90%",
    backgroundColor: "rgba(255,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSpace: {
    marginTop: 30,
    width: "90%",
  },
  inputTitle: {
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
  inputMultiline: {
    borderBottomWidth: 1,
    height: 80,
    marginBottom: 12,
    fontSize: 16,
    color: "#fff",
  },
  dropDowns: {
    marginTop: 20,
    width: "80%",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
  },
  dropdownView: {
    alignContent: "center",
    justifyContent: "center",
    width: 110,
    flexDirection: "column",
  },
  dropdownTitle: {
    fontSize: 16,
    width: 100,
    marginLeft: 25,
    marginBottom: 5,
  },
  dropdown: {
    width: 110,
    height: 30,
    backgroundColor: "#b02b2e",
    borderRadius: 5,
    borderWidth: 0.2,
  },
  button: {
    backgroundColor: "rgba(255,0,0,0.5)",
    width: "80%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default CreateScreen;
