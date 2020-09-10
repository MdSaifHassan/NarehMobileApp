import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";

import { Colors } from "../defaultComponents/Colors";

const DATA = [
  {
    image: require("../../assets/ios1x_dashboard.png"),
    title: "Dashboard",
    color: Colors.voilet1,
  },
  {
    image: require("../../assets/ios1x_gift.png"),
    title: "Claim Points",
    color: Colors.black2,
  },
  {
    image: require("../../assets/ios1x_Icons.png"),
    title: "Profile",
    color: Colors.black2,
  },
];

const BottomNavigator = () => {
  return (
    <View style={styles.container}>
      {DATA.map((item) => {
        return (
          <TouchableOpacity style={styles.subContainer} key={item.title}>
            <Image style={styles.image} source={item.image} />
            <Text style={[styles.title, { color: item.color }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: "4.5%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  subContainer: {
    alignItems: "center",
  },
  image: {
    marginBottom: 5,
  },
  title: {
    fontSize: 10,
    fontFamily: "roboto-medium",
  },
});

export default BottomNavigator;
