import * as React from "react";

import {
  // Modal,
  Portal,
  Text,
  Button,
  Provider,
  Card,
  Title,
  Paragraph,
  Image,
  Modal,
} from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../Colors";
import { ButtonOutline, ButtonFill } from "../../defaultComponents/Button";
import ContactScreen from "../../screens/ContactScreen";
import { AntDesign } from "@expo/vector-icons";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
//import Modal from "react-native-modal";

export const ModalContainer = (props) => {
  return (
    <Provider>
      <Portal>
        {/* <View style={styles.centeredView}> */}
        <Modal
          animationType="slide"
          hardwareAccelerated={true}
          // animationInTiming={100000}
          // animationOut="slideOutDown"
          // animationOutTiming={100000}
          // backdropOpacity={0.2}
          visible={props.visible}
          onDismiss={props.onDismiss}
          // presentationStyle="popover"
          statusBarTranslucent={true}
          transparent={true}
          swipeDirection="down"
        >
          <View style={styles.Modalbox}>
            {/* <ButtonFill onPress={props.onDismiss} self="flex-end">
          <Text
            style={{
              color: Colors.white,
              fontSize: 13,
              fontFamily: "roboto-regular",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            close
          </Text>
        </ButtonFill> */}
            {/* <AntDesign
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onPress={props.onDismiss}
          name="close"
          size={24}
          color="black"
        /> */}
            <View style={styles.InnerCard}>{props.children}</View>
          </View>
        </Modal>
        {/* </View> */}
      </Portal>
    </Provider>
  );
};

export const ModalOk = (props) => {
  return (
    <ModalContainer visible={props.visible} onDismiss={props.onDismiss}>
      <MaterialIcons
        style={{ alignSelf: "center" }}
        size={60}
        name={props.Icon}
        color="red"
      />
      <Card.Actions
        style={{ boxShadow: "none" }}
        style={{ alignSelf: "center", flexDirection: "column" }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...styles.falear_text, fontSize: 20 }}>
            {props.name}
          </Text>
          <Text style={styles.falear_text}>{props.footerName}</Text>
        </View>
        <View style={styles.BtnWrapper}>
          <View style={styles.Btn_inner}>
            <ButtonFill self="center">
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: Colors.white,
                  fontSize: 17,
                }}
                onPress={props.onDismiss}
              >
                Ok
              </Text>
            </ButtonFill>
          </View>
        </View>
      </Card.Actions>
    </ModalContainer>
  );
};

export const ModalFailure = (props) => {
  return (
    <ModalContainer visible={props.visible} onDismiss={props.onDismiss}>
      <MaterialIcons
        style={{ alignSelf: "center" }}
        size={80}
        name={props.Icon}
        color="red"
      />
      <Card.Actions
        style={{ boxShadow: "none" }}
        style={{
          alignSelf: "center",
          flexDirection: "column",
          // marginTop: 20,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...styles.falear_text, fontSize: 18 }}>
            {props.name}
          </Text>
          <Text style={{ ...styles.falear_text, marginBottom: 10 }}>
            {props.footerName}
          </Text>
        </View>
        <View style={styles.BtnWrapper}>
          <View style={styles.Btn_inner}>
            <ButtonFill self="center">
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: Colors.white,
                  fontSize: 17,
                }}
                onPress={props.onDismiss}
              >
                Ok
              </Text>
            </ButtonFill>
          </View>
        </View>
      </Card.Actions>
    </ModalContainer>
  );
};
export const ModalSucess = (props) => {
  return (
    <ModalContainer visible={props.visible} onDismiss={props.onDismiss}>
      <Ionicons style={styles.SuccessIcon} name={props.Icon} />
      <Card.Actions
        style={{ boxShadow: "none" }}
        style={{ alignSelf: "center", flexDirection: "column" }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...styles.text, marginBottom: 8 }}>{props.name}</Text>
          <Text style={styles.falear_text}>
            {props.Footerfasttext}
            <Text style={styles.text}>{props.number}</Text>
          </Text>
          <Text style={styles.falear_text}> {props.Footerlasttext}</Text>
        </View>
        <View style={styles.BtnWrapper}>
          <View style={styles.Btn_inner}>
            <ButtonFill self="center">
              <Text style={styles.Text_1} onPress={props.onDismiss}>
                Add more claims
              </Text>
            </ButtonFill>
          </View>
          <View style={styles.Btn_inner}>
            <ButtonOutline self="center">
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: Colors.grey2,
                  fontSize: 17,
                }}
                onPress={props.onDismiss}
              >
                Point Earn History
              </Text>
            </ButtonOutline>
          </View>
        </View>
      </Card.Actions>
    </ModalContainer>
  );
};

export const Sucess = (props) => {
  return (
    <ModalContainer visible={props.visible} onDismiss={props.onDismiss}>
      <Ionicons style={styles.SuccessIcon} name={props.Icon} />
      <Card.Actions style={{ alignSelf: "center", flexDirection: "column" }}>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ ...styles.text, marginBottom: 1 }}>{props.name}</Text>

          <Text style={{ ...styles.falear_text, width: "100%" }}>
            {props.footerName}
          </Text>
        </View>
        <ButtonFill self="center">
          <Text
            style={{
              paddingHorizontal: 10,
              color: Colors.white,
              fontSize: 17,
            }}
            onPress={props.onDismiss}
          >
            Ok
          </Text>
        </ButtonFill>
      </Card.Actions>
    </ModalContainer>
  );
};
export const ModalDelete = (props) => {
  return (
    <ModalContainer visible={props.visible} onDismiss={props.onDismiss}>
      <MaterialIcons
        style={{ alignSelf: "center" }}
        size={60}
        name={props.Icon}
        color="red"
      />
      <Card.Actions
        style={{
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...styles.text, marginBottom: 10 }}>{props.name}</Text>
          <Text style={styles.text_1}>{props.footerName}</Text>
        </View>
        <View style={styles.BtnWrapper}>
          <View style={styles.Btn_inner}>
            <ButtonFill self="center">
              <Text style={styles.Text_1} onPress={props.onDismiss}>
                Cancel
              </Text>
            </ButtonFill>
          </View>
          <View style={styles.Btn_inner}>
            <ButtonOutline self="center">
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: Colors.grey2,
                  fontSize: 17,
                }}
                onPress={props.delete}
              >
                Delete
              </Text>
            </ButtonOutline>
          </View>
        </View>
      </Card.Actions>
    </ModalContainer>
  );
};

export const ProductImageModal = (props) => {
  return (
    <ModalContainer visible={props.visible} onDismiss={props.onDismiss}>
      <Card.Actions
        style={{
          alignSelf: "center",
          flexDirection: "column",
          maxWidth: "90%",
        }}
      >
        <ScrollView>{props.children}</ScrollView>
        <ButtonFill onPress={props.onDismiss} self="center">
          <Text
            style={{
              color: Colors.white,
              fontSize: 13,
              fontFamily: "roboto-regular",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Ok
          </Text>
        </ButtonFill>
      </Card.Actions>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  Modalbox: {
    width: "90%",
    // maxWidth: "100%",
    // minHeight: "30%",
    // minHeight: 300,
    maxHeight: "90%",
    alignSelf: "center",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  text: {
    fontSize: 16,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    textAlign: "center",
    color: Colors.voilet2,
    alignSelf: "center",
  },
  Text_1: {
    fontSize: 16,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    textAlign: "center",
    color: Colors.white,
    lineHeight: 23,
  },
  SuccessIcon: {
    alignSelf: "center",
    // backgroundColor: Colors.green1,
    borderRadius: 43 / 1,
    fontSize: 80,
    color: Colors.green1,
  },
  Btn_inner: {
    margin: 5,
  },
  BtnWrapper: {
    flexDirection: "row",
  },
  falear_text: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    textAlign: "center",
    color: Colors.grey2,
    lineHeight: 18,
    marginTop: 10,
  },
  image: {
    width: "30%",
    alignSelf: "center",
  },
});
