import React from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import BackHeader from "../../defaultComponents/BackHeader";
import RadiBtn from "../../defaultComponents/Radio";
import Dropdwon from "../ProfileScreen/ProfileCard/ProfileEditCard/DropDwon";
import { Colors } from "../../defaultComponents/Colors";

const Addaddress = ({ navigation }) => {
  return (
    <View style={styles.MainContainer}>
      <BackHeader title="Add address" />

      <ScrollView style={styles.ScrollView}>
        <View style={styles.container}>
          <View style={styles.BodyWrapper}>
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text}>
                  Address line 1 <Text style={{ color: "#F26F25" }}>*</Text>
                </Text>
                <TextInput style={styles.text_bottom}>
                  Shatula manashi 5th floor
                </TextInput>
              </View>
            </View>
            {/* //////////////////////// */}
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text}>
                  Address line 2 <Text style={{ color: "#F26F25" }}>*</Text>
                </Text>
                <TextInput style={styles.text_bottom}>
                  1st cross, 3rd main road
                </TextInput>
              </View>
            </View>
            {/* /////////////////////////// */}
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text}>Landmark</Text>
                <TextInput style={styles.text_bottom}>
                  Near Petrol Bunk
                </TextInput>
              </View>
            </View>
            {/* //////////////////// */}
            <View style={styles.NameWrapper_2}>
              <View>
                <Dropdwon />
              </View>
            </View>
            <View style={[styles.NameWrapper_2, { marginBottom: 15 }]}>
              <View style={styles.RightWrapper_2}>
                <View style={styles.TextWrapper}>
                  <Text style={styles.text}>Pin code </Text>
                  <Text style={{ color: "#F26F25" }}>*</Text>
                </View>
                <TextInput style={styles.text_bottom}>560000</TextInput>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              width: "100%",
              borderBottomColor: Colors.voilet3,
            }}
          />
          <View style={styles.BodyWrapper}>
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text_top}>Name</Text>
                <TextInput style={styles.text_bottom}>Rohan dabade</TextInput>
              </View>
            </View>
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text_top}>Mobile number </Text>
                <TextInput style={styles.text_bottom}>8888888888 </TextInput>
              </View>
            </View>

            <RadiBtn navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Addaddress;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  ScrollView: {
    width: "100%",
    backgroundColor: Colors.white,
    alignSelf: "center",
  },
  BodyWrapper: {
    width: "91.46%",
    marginVertical: 15,
  },
  NameWrapper: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.grey2,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },
  NameWrapper_2: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },
  LeftWrapper: {
    width: "100%",
  },
  RightWrapper_2: {
    width: "48%",
    borderBottomWidth: 1,
    borderColor: Colors.grey2,
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
  },
  text_bottom: {
    opacity: 0.8,
    fontSize: 13,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    textAlign: "left",
    color: Colors.grey2,
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
  },
  text_top: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
  },
  TextWrapper: {
    width: 152,
    flexDirection: "row",
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
    marginRight: 2,
  },
});
