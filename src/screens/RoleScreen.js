import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { ButtonOutline, ButtonFill } from "../defaultComponents/Button";
import { tokenApi } from "../api/nsl";
import { Button } from "react-native-paper";
import { Colors } from "../defaultComponents/Colors";
import { AuthContext } from "../contexts/AuthContext";
import Container from "../defaultComponents/Container";
import { ShadowCard } from "../defaultComponents/ShadowCard";

import { StatusBar } from "expo-status-bar";
import Logo from "../components/Logo/Logo";

const RoleScreen = ({ route, navigation }) => {
  const { authContext } = React.useContext(AuthContext);
  const [pressed, setPressed] = useState(false);
  const { role, tokenRes } = route.params;

  // const [permissions, setPermissions] = useState(null)
  // const [selectedState, setSelectedState] = useState("0");
  // const [roleSelected, setRoleSelected] = useState("");
  // const role = ["Sales Head", "Regional Head", "Sales Manager"];

  //console.log(roleSelected);
  // const valueChangeHandler = (StateValue, index) => {
  //   console.log(index, "---index");
  //   setSelectedState(StateValue);
  //   setRoleSelected(role[index]);
  // };

  console.log("....Role....", role);
  // console.log("....RoleSelected....", roleSelected);

  const pressHandler = (index) => {
    const roleSelected = role[index];
    console.log("...role[index", roleSelected);
    setPressed(true);
    tokenApi().then((res) =>
      res
        .post("/v1/auth/selectRole", {
          memberType: roleSelected,
        })
        .then((response) => {
          console.log(response.data.response);
          authContext.roleSelect1(roleSelected);
        })
        .catch((error) => {
          alert("Invalid role");
          setPressed(false);
        })
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: "transparent", width: "100%" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container width="80%">
            <StatusBar style="dark" />
            <View style={styles.logo}>
              <Logo />
            </View>
            <View style={styles.logoTitle}>
              <Text style={styles.logoText}>PRABHAT SUPER SEEDS</Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 40,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                  color: Colors.grey2,
                  marginBottom: 20,
                  // textAlign: "center",
                }}
              >
                Select your role
              </Text>
              {role
                ? role.map((state, index) => {
                    return (
                      <View style={styles.buttonSelect} key={index}>
                        <ShadowCard>
                          <TouchableOpacity
                            disabled={pressed}
                            onPress={() => pressHandler(index)}
                          >
                            <Text style={{ textAlign: "center" }}>{state}</Text>
                          </TouchableOpacity>
                        </ShadowCard>

                        {/* <Button
                          disabled={pressed}
                          mode="outlined"
                          onPress={() => pressHandler(index)}
                          color={Colors.grey2}
                        >
                          {state}
                        </Button> */}
                      </View>
                    );
                  })
                : null}
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Image
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: -1,
        }}
        source={require("../../assets/AuthIcons/bgImage.png")}
      />
    </View>

    // <View
    //   style={{
    //     flex: 1,
    //     marginTop: 100,
    //     justifyContent: "center",
    //   }}
    // >
    //   <Text
    //     style={{
    //       color: Colors.green1,
    //       fontSize: 20,
    //       fontWeight: "bold",
    //       marginVertical: 15,
    //       textAlign: "center",
    //     }}
    //   >
    //     Select your role
    //   </Text>
    //   {role
    //     ? role.map((state, index) => {
    //         return (
    //           <View style={{ marginBottom: 20 }} key={index}>
    //             <Button
    //               disabled={pressed}
    //               mode="outlined"
    //               onPress={() => pressHandler(index)}
    //             >
    //               {state}
    //             </Button>
    //           </View>
    //         );
    //       })
    //     : null}
    // </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "15%",
    backgroundColor: Colors.white,
  },
  logo: {
    alignSelf: "center",
  },
  logoTitle: {
    alignSelf: "center",
    paddingTop: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.green1,
    fontFamily: "roboto-bold",
  },
  buttonSelect: {
    alignSelf: "center",
    minWidth: "70%",
    marginBottom: 10,
  },
});
export default RoleScreen;
