import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../../defaultComponents/Colors";

const DashboardMenuCard = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <View style={styles.topBox}>
          <Image source={props.source} style={styles.icon} />
          <Text style={[styles.pointsTitle, { color: props.pointsTitleColor }]}>
            {props.pointsTitle}
          </Text>
        </View>

        <View style={styles.bottomBox}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 100,
  },
  topBox: {
    flexDirection: "row",
  },
  icon: {
    maxWidth: 21,
    maxHeight: 21,
    marginRight: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  pointsTitle: {
    fontSize: 20,
    fontFamily: "roboto-medium",
  },
  title: {
    color: Colors.grey2,
    marginLeft: 10,
  },
  bottomBox: {},
});

export default DashboardMenuCard;
