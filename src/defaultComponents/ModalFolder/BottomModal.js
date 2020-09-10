import * as React from "react";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import RoundedDiv from "../RoundedDiv";
import { ButtonFill } from "../Button";
import { Colors } from "react-native/Libraries/NewAppScreen";
export const Modal_3 = ({ visible, onDismiss, onPress, navigation }) => {
  const [value, setValue] = React.useState("first");

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <View style={styles.overlay}>
            <View style={styles.Modalbox}>
              <View style={styles.ManWrapper}>
                <View style={styles.Header}>
                  <Text style={styles.text_2}>Select address</Text>
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                    onPress={onPress}
                  >
                    x
                  </Text>
                </View>
                <RadioButton.Group
                  onValueChange={(value) => setValue(value)}
                  value={value}
                >
                  <View style={styles.Radiowrapper}>
                    <RadioButton value="first" />
                    <View style={styles.MainRadioBox}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text_2}>John Doe,</Text>
                        <Text style={styles.text}>John Doe,</Text>
                        <RoundedDiv width={51}>
                          <Text style={styles.HomeBtn}>Home</Text>
                        </RoundedDiv>
                      </View>
                      <Text
                        style={{
                          ...styles.text,
                          overflow: "hidden",
                          width: "80%",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed... diam nonumy eirmod tempor invidunt labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </Text>
                    </View>
                  </View>
                  {/* /// */}
                  <View style={styles.Radiowrapper}>
                    <RadioButton value="second" />
                    <View style={styles.MainRadioBox}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text_2}>John Doe,</Text>
                        <Text style={styles.text}>John Doe,</Text>
                        <RoundedDiv width={51}>
                          <Text style={styles.HomeBtn}>Work</Text>
                        </RoundedDiv>
                      </View>
                      <Text
                        style={{
                          ...styles.text,
                          overflow: "hidden",
                          width: "80%",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed... diam nonumy eirmod tempor invidunt labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </Text>
                    </View>
                  </View>
                  {/* .//////////////// */}
                  <View style={styles.Radiowrapper}>
                    <RadioButton value="third" />
                    <View style={styles.MainRadioBox}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text_2}>John Doe,</Text>
                        <Text style={styles.text}>John Doe,</Text>
                        <RoundedDiv width={51}>
                          <Text style={styles.HomeBtn}>Office</Text>
                        </RoundedDiv>
                      </View>
                      <Text
                        style={{
                          ...styles.text,
                          overflow: "hidden",
                          width: "80%",
                        }}
                      >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed... diam nonumy eirmod tempor invidunt labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </Text>
                    </View>
                  </View>
                </RadioButton.Group>
                <View style={styles.BtnWrapper}>
                  <ButtonFill onPress={() => navigation.navigate("AddAddress")}>
                    <Text style={styles.text_btn}>Add Address</Text>
                  </ButtonFill>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default Modal_3;

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  Modalbox: {
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  ManWrapper: {
    width: "91.46%",
    // backgroundColor: "green",
    height: "100%",
  },
  Header: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  text: {
    height: 20,
    width: 90,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: "#373737",
    lineHeight: 23,
    overflow: "hidden",
  },
  text_2: {
    fontSize: 13,
    fontFamily: "roboto-medium",
    fontWeight: "400",
    color: "#303030",
    lineHeight: 19,
    marginRight: 3,
  },

  Radiowrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  MainRadioBox: {
    width: "100%",
    flexDirection: "column",
    height: 43,
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    justifyContent: "space-between",
    marginTop: 10,
  },
  HomeBtn: {
    fontSize: 11,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: "#834d9b",
    lineHeight: 17,
    textTransform: "uppercase",
  },
  BtnWrapper: {
    marginLeft: "8%",
    marginTop: "5%",
  },
  text_btn: {
    color: Colors.white,
    fontSize: 12,
  },
});
