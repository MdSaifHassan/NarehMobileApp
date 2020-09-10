import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonFill, ButtonOutline } from "../Button";
import { Colors } from "../Colors";
import RowView from "../RowView";

export const Modal_3 = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={props.visible} onDismiss={props.onDismiss}>
          <View style={styles.Modalbox}>
            <Text
              style={{
                alignSelf: "flex-end",
                fontSize: 25,
                marginRight: 20,
              }}
              onPress={props.onDismiss}
            >
              x
            </Text>
            {/* <View style={styles.IconWrapper}> */}
            <MaterialIcons name="error" size={70} color="red" />
            {/* </View> */}
            <Text style={styles.text}> {props.name}</Text>
            <Text style={styles.text_2}>{props.footerName}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                //backgroundColor: "yellow",
                width: "100%",
                marginTop: 27,
              }}
            >
              <ButtonFill self={"center"}>
                <Text
                  style={
                    (styles.text,
                    { color: Colors.white, paddingHorizontal: 19 })
                  }
                >
                  {props.btn1}
                </Text>
              </ButtonFill>
              <ButtonOutline self={"center"}>
                <Text
                  style={
                    (styles.text,
                    { color: Colors.grey2, paddingHorizontal: 19 })
                  }
                >
                  {props.btn2}
                </Text>
              </ButtonOutline>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Modalbox: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 30,
  },
  text: {
    fontSize: 17,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    textAlign: "center",
    color: "#834d9b",
    lineHeight: 23,
    marginTop: 2,
    marginBottom: 13,
  },
  text_2: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "400",
    textAlign: "center",
    color: "#303030",
    lineHeight: 19,
    // width: 206,
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
