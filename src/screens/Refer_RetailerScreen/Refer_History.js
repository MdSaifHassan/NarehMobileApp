import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { IconButton } from "react-native-paper";

const Refer_History = ({ name, mobile, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Itemwrapper}>
        <View style={styles.NameV}>
          <View
            style={{
              width: 40,
              // overflow: "hidden"
            }}
          >
            <IconButton
              icon="account"
              color={Colors.voilet1}
              size={30}
              style={{
                alignSelf: "center",
                height: 30,
              }}
            />
          </View>
          <View style={styles.Item}>
            <View style={styles.NameWrapper}>
              <Text style={styles.text}>{name}</Text>
              <Text
                style={{
                  ...styles.text,
                  lineHeight: 15,
                  fontWeight: "400",
                  fontFamily: "roboto-regular",
                }}
              >
                {mobile}
              </Text>
            </View>
            <View style={styles.NumberWrapper}>
              <Text
                style={{
                  ...styles.text,
                  fontFamily: "roboto-regular",
                  fontWeight: "400",
                  color: Colors.grey2,
                }}
              >
                {date}
              </Text>
              {/* <Text style={{ fontSize: 14 }}>Vasudeva shope</Text> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Refer_History;

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
  },
  Itemwrapper: {
    flexDirection: "row",
  },
  Item: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 15,
  },
  NameV: {
    width: "100%",
    //height: 41,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey2,
  },
  NameWrapper: {
    // height: 41,
  },
  NumberWrapper: {
    // height: 41,
    width: "35%",
    // backgroundColor: "#c1a6cd",
  },
  text: {
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: "roboto-medium",
    opacity: 0.85,
    color: "#232323",
  },
});
