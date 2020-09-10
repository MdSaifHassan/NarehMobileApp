// // import * as React from "react";
// // import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
// import { View } from "react-native";

// export const ModalComp = ({ visible, onDismiss, children }) => {
// // //   //const [visible, setVisible] = React.useState(false);

// // //   return (
// // //     <Modal
// // //       visible={visible}
// // //       onDismiss={onDismiss}
// // //       contentContainerStyle={{
// // //         backgroundColor: "white",
// // //         flex: 1,
// // //         justifyContent: "center",
// // //         alignItems: "center",
// // //         marginHorizontal: "5%",
// // //         marginVertical: "10%",
// // //         elevation: 20,
// // //       }}
// // //     >
// // //       {children}
// // //     </Modal>
// // //   );
// // // };

// // export default ModalComp;

// import * as React from "react";
// import { Modal, Portal, Provider } from "react-native-paper";
// //import Modal, { ModalTitle, ModalContent } from "react-native-modals";

// export const ModalCenter = ({ visible, onDismiss, children }) => {
//   // const [visible, setVisible] = React.useState(false);

//   // const showModal = () => setVisible(true);

//   // const hideModal = () => setVisible(false);

//   return (
//     // <View style={{ justifyContent: "flex-end" }}>
//     <Modal
//       contentContainerStyle={{
//         justifyContent: "flex-end",
//       }}
//       visible={visible}
//       onDismiss={onDismiss}
//       contentContainerStyle={{
//         backgroundColor: "white",
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginHorizontal: "5%",
//         marginVertical: "10%",
//         elevation: 20,
//       }}
//     >
//       {children}
//     </Modal>
//     // </View>
//   );
// };

// // export const BottomModal = ({ visible, onDismiss, children, title }) => {
// //   return (
// //     <Modal.BottomModal
// //       visible={visible}
// //       onTouchOutside={onDismiss}
// //       height={0.3}
// //       width={1}
// //       //onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
// //       modalTitle={<ModalTitle title={title} hasTitleBar />}
// //     >
// //       <ModalContent
// //         style={{
// //           flex: 1,
// //           backgroundColor: "fff",
// //         }}
// //       >
// //         {children}
// //       </ModalContent>
// //     </Modal.BottomModal>
// //   );
// // };
import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ButtonFill } from "../Button";
import { Colors } from "../Colors";

export const ModalContent = (props) => {
  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);

  // const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible={props.visible} onDismiss={props.onDismiss}>
          <View style={styles.Modalbox}>
            <Text
              style={{
                alignSelf: "flex-end",
                fontSize: 20,
                marginRight: 17,
                marginTop: 15,
              }}
              onPress={props.onDismiss}
            >
              x
            </Text>
            <View style={{ marginVertical: 31 }}>
              <Text style={styles.text}>{props.name}</Text>
              <Text style={styles.text}>{props.footerName}</Text>
            </View>
            <ButtonFill onPress={props.onDismiss} self="center" width={100}>
              <Text style={{ color: Colors.white }}>{props.btnText}</Text>
            </ButtonFill>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ModalContent;

const styles = StyleSheet.create({
  Modalbox: {
    width: "70%",
    height: 200,
    alignSelf: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 6,
  },
  text: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    textAlign: "center",
    color: "#303030",
    lineHeight: 21,
  },
});
