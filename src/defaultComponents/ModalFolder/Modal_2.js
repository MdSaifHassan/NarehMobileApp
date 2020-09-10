import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const Modal_2 = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View style={styles.Modalbox}>
            <Text
              style={{
                alignSelf: "flex-end",
                fontSize: 25,
                marginRight: 20,
              }}
              onPress={() => hideModal()}
            >
              x
            </Text>
            <View style={styles.IconWrapper}>
              <MaterialIcons name="done-all" size={24} color="#fff" />
            </View>
            <Text style={styles.text}>Tahnk {props.name}</Text>
            <Text style={styles.text_2}>Hello world{props.FooterName}</Text>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Modalbox: {
    width: "70%",
    // height: 240,
    alignSelf: "center",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 30,
    // position: "relative",
    // // top: -100,
    // bottom: "-150%",
  },
  text: {
    fontSize: 17,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    textAlign: "center",
    color: "#834d9b",
    lineHeight: 23,
  },
  text_2: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "400",
    textAlign: "center",
    color: "#303030",
    lineHeight: 19,
    width: 202,
  },
  IconWrapper: {
    width: 47,
    height: 47,
    backgroundColor: "#00a650",
    marginBottom: 13,
    borderRadius: 47 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
