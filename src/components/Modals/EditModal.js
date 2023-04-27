import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

const EditModal = ({
  modalVisible,
  setModalVisible,
  handlePatch,
  textEdit,
  setTextEdit,
  titleEdit,
  setTitleEdit,
  type,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.modal}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            width: "100%",
            backgroundColor: "#b02b2e",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Animatable.Image
            source={require("../../assets/edit.png")}
            style={{
              height: 60,
              width: 60,
              resizeMode: "contain",
              marginBottom: 10,
            }}
            animation="flipInX"
            duration={2500}
          />
          {type === "post" ? (
            <>
              <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
                Titulo do Post
              </Text>
              <TextInput
                value={titleEdit}
                onChangeText={setTitleEdit}
                style={styles.input}
              />
              <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
                Conteúdo
              </Text>
            </>
          ) : null}
          <TextInput
            value={textEdit}
            onChangeText={setTextEdit}
            style={styles.input}
            multiline={true}
          />
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              onPress={handlePatch}
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 10,
                marginRight: 20,
              }}
            >
              <Text style={{ color: "white" }}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 10,
                marginRight: 20,
              }}
            >
              <Text style={{ color: "white" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    height: "auto",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
