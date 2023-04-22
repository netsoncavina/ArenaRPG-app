import React from "react";
import { StyleSheet, Text, View, Image, Pressable, Modal } from "react-native";
import * as Animatable from "react-native-animatable";

const DeleteModal = ({ modalVisible, setModalVisible, handleDelete, type }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Animatable.Image
            source={require("../../assets/logo.png")}
            style={{
              height: 60,
              width: 60,
              resizeMode: "contain",
            }}
            animation="flipInX"
            duration={2500}
          />
          <Text style={styles.modalText}>Deseja deletar o {type}?</Text>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                handleDelete();
              }}
            >
              <Text style={styles.textStyle}>Deletar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    margin: 10,
    backgroundColor: "#b02b2e",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    width: 300,
    height: 180,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#1e1e1e",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
});
