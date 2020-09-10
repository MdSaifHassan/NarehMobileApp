import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Container from "../../defaultComponents/Container";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../defaultComponents/Colors";

const NotificationComponent = ({ iconName, title, paragraph, time }) => {
  return (
    <Container>
      <View style={styles.referTitleContainer}>
        <TouchableOpacity style={styles.subContainer}>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <View style={styles.iconImage}>
              <MaterialIcons name={iconName} size={38} color={Colors.voilet5} />
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.title}> {title} </Text>
                <Text tail style={styles.paragraph}>
                  {paragraph}
                </Text>
              </View>
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  referTitleContainer: {
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  subContainer: {
    width: "91.46%",
  },
  iconImage: {
    backgroundColor: Colors.grey7,
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    alignSelf: "center",
  },
  textContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 13,
    color: Colors.grey2,
    marginBottom: 5,
  },
  time: {
    fontFamily: "roboto-medium",
    fontSize: 11,
    color: Colors.grey2,
    // marginBottom: 15,
  },
  paragraph: {
    fontFamily: "roboto-medium",
    fontSize: 12,
    color: Colors.grey2,
    marginRight: 10,
    marginBottom: 5,
  },
});
