import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "./utils";

const NavBar = ({ animation, filter, setFilter, image, setImage }) => {
  const [isIcon, setIsIcon] = useState(false);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserData().then((data) => {
      if (
        data.picture != null &&
        data.picture != undefined &&
        data.picture != "" &&
        data.picture < icons.length
      ) {
        setImage(icons[data.picture].image);
        setIsIcon(true);
      } else {
        setImage(data.picture);
        setIsIcon(false);
      }
    });
  }, []);
  const [loaded] = useFonts({
    Tormenta20x: require("../../assets/fonts/Tormenta20x.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const options = ["Inicio", "Mesas", "Jogadores", "Off Topic"];
  return (
    <Animatable.View
      style={styles.container}
      delay={200}
      animation="fadeInDown"
    >
      <SelectDropdown
        defaultButtonText="Inicio"
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
          setFilter(selectedItem);
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
      <Text style={{ fontFamily: "Tormenta20x", color: "white", fontSize: 20 }}>
        Heróis do RPG
      </Text>
      <View>
        <Animatable.Image
          source={isIcon ? image : { uri: image }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            borderColor: "#1e1e1e",
            borderWidth: 2,
          }}
          animation="zoomIn"
          delay={800}
        />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b02b2e",
    padding: 10,
    borderTopWidth: 0.2,
  },
  dropdown: {
    width: 110,
    height: 30,
    backgroundColor: "#1e1e1e66",
    borderRadius: 5,
    borderWidth: 0.2,
  },
});

export default NavBar;
