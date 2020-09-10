import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import RoundedDiv from "../RoundedDiv";
import SortModalContent from "../SortModal";
export const SortModal = ({ visible, onDismiss, children, button }) => {
  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);

  // const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <View style={styles.overlay}>
            <View style={styles.Modalbox}>
              <SortModalContent
                button={(value) => button(value)}
                onPress={onDismiss}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  Modalbox: {
    width: "100%",
    height: 180,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  //   ManWrapper: {
  //     width: "91.46%",
  //     // backgroundColor: "green",
  //     height: "100%",
  //   },
  //   Header: {
  //     width: "100%",
  //     height: 60,
  //     backgroundColor: "#fff",
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     borderBottomWidth: 1,
  //     borderBottomColor: "gray",
  //   },
  //   text: {
  //     height: 20,
  //     width: 90,
  //     fontSize: 12,
  //     fontFamily: "roboto-regular",
  //     fontWeight: "400",
  //     color: "#373737",
  //     lineHeight: 23,
  //     overflow: "hidden",
  //   },
  //   text_2: {
  //     fontSize: 13,
  //     fontFamily: "roboto-medium",
  //     fontWeight: "400",
  //     color: "#303030",
  //     lineHeight: 19,
  //     marginRight: 3,
  //   },

  //   Radiowrapper: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },
  //   MainRadioBox: {
  //     width: "100%",
  //     flexDirection: "column",
  //     height: 43,
  //     // alignItems: "center",
  //     justifyContent: "center",
  //     // backgroundColor: "red",
  //     justifyContent: "space-between",
  //     marginTop: 10,
  //   },
  //   HomeBtn: {
  //     fontSize: 11,
  //     fontFamily: "roboto-regular",
  //     fontWeight: "400",
  //     color: "#834d9b",
  //     lineHeight: 17,
  //     textTransform: "uppercase",
  //   },
});
