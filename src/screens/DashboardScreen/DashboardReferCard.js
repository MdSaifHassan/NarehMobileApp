import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";

import { Colors } from "../../defaultComponents/Colors";
import { HeaderGradient } from "../../defaultComponents/HeaderGradient";

const DashboardReferCard = ({ onPress }) => {
  return (
    <ImageBackground
      source={require("../../../assets/referbg.png")}
      style={styles.container}
    >
      <View style={styles.referContainer}>
        <View style={styles.referTitleContainer}>
          <Text style={styles.referQuestionTitle}>
            Want to refer a Retailer?
          </Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.refferButton}>
          <Text style={styles.referTitle}> Refer </Text>
          <Image source={require("../../../assets/ios1x_share.png")} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 74,
  },
  referContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "91.46%",
    alignSelf: "center",
  },
  referTitleContainer: {
    width: "40%",
  },
  refferButton: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 5,
    maxWidth: 111,
    width: "30%",
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  referQuestionTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "roboto-bold",
  },
  referTitle: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "roboto-bold",
    marginRight: 6,
  },
});

export default DashboardReferCard;
