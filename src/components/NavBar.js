import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const NavBar = () => {
  const options = ["Inicio", "Mesas", "Jogadores", "Off Topic"];

  return (
    <View style={styles.container}>
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
          console.log(selectedItem, index);
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
    width: 80,
    height: 30,
    backgroundColor: "#1e1e1e66",
    borderRadius: 5,
    borderWidth: 0.2,
  },
});

export default NavBar;
