import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { Ionicons } from "@expo/vector-icons";

const PopUpMenu = () => {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      name: "Editar",
      icon: "md-pencil-outline",
      action: () => (console.log("Edit"), setVisible(false)),
    },
    {
      name: "Excluir",
      icon: "trash",
      action: () => (console.log("Delete"), setVisible(false)),
    },
    {
      name: "Denunciar",
      icon: "alert-circle",
      action: () => (console.log("Report"), setVisible(false)),
    },
  ];
  return (
    // <MenuProvider>
    <Menu style={styles.menu}>
      <MenuTrigger>
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color="white"
          style={styles.interactionIcon}
        />
      </MenuTrigger>
      <MenuOptions style={styles.options}>
        {options.map((option, index) => (
          <MenuOption onSelect={option.action} key={index}>
            <View style={styles.option}>
              <Text>{option.name}</Text>
              <Ionicons name={option.icon} size={20} color="black" />
            </View>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {},
  interactionIcon: {
    margin: 5,
  },
  options: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default PopUpMenu;
