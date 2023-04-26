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
            height: 200,
            width: "100%",
            backgroundColor: "#b02b2e",
            borderRadius: 10,
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
          <TextInput
            value={textEdit}
            onChangeText={setTextEdit}
            style={styles.input}
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
              <Text>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsEdit(false)}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 10,
                marginRight: 20,
              }}
            >
              <Text>Cancelar</Text>
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
    width: "80%",
    height: 40,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
