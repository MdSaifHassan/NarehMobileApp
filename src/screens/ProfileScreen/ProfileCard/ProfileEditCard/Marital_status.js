import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../../defaultComponents/Colors";
import KidsCard from "../KidsCard";
import KidsEditableCard from "./KidsEditableCard";

const Marital_status = (props) => {
  const kids = props.family.filter(
    (mem) => mem.familyRelationship !== "spouse"
  );
  console.log(kids, "--------");
  return (
    <View style={styles.container}>
      <View style={styles.BodyWrapper}>
        <View style={styles.widthWrapper}>
          <Text style={styles.text}>Marital status</Text>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btn_text}>{props.member.marital_status}</Text>
          </TouchableOpacity>
          <View style={{ width: "100%" }}>
            <View style={styles.LeftWrapper}>
              <Text style={styles.text_top}>Marriage anniversary </Text>
              <TextInput
                style={styles.SmallTextInput}
                onChangeText={props.onChangeText1}
                value={props.value1}
                defaultValue={props.member.doa}
              />
            </View>
          </View>
          <View style={styles.NameWrapper}>
            <View style={{ width: "100%" }}>
              <Text style={styles.text_top}>Spouse name </Text>
              <TextInput
                style={styles.SmallTextInput}
                onChangeText={props.onChangeText2}
                value={props.value2}
                defaultValue={props.family[0].familyName}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: "91.46%",
            alignSelf: "center",
          }}
        >
          {kids.map((kid, index) => {
            return (
              <KidsEditableCard
                key={kid.familyId}
                title={`Kid ${index + 1} Details`}
                defaultValueName={kid.familyName}
                defaultValueGender={
                  kid.familyGender === "M" ? "Male" : "Female"
                }
                defaultValueBirth={kid.familyDOB}
                onChangeTextName={props.onChangeTextName}
                onChangeTextGender={props.onChangeTextGender}
                onChangeTextBirth={props.onChangeTextBirth}
                valueName={props.valueName}
                valueBirth={props.valueBirth}
                valueGender={props.valueGender}
              />
            );
          })}
        </View>
      </View>
      <TouchableOpacity onPress={props.onPress} style={styles.SaveChangesBtn}>
        <Text style={styles.save}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Marital_status;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  BodyWrapper: {
    //
    paddingVertical: 20,
  },
  widthWrapper: {
    width: "91.46%",
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
  },
  btn: {
    width: 80,
    height: 30,
    backgroundColor: Colors.voilet1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  btn_text: {
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.white,
    textTransform: "capitalize",
  },
  NameWrapper: {
    width: "100%",

    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },
  NameWrapper_2: {
    width: "100%",
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },
  RightWrapper_2: {
    width: "48%",
    height: "100%",
  },
  TextWrapper: {
    flexDirection: "row",
  },
  text_top: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
  },
  text_bottom: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
    marginTop: 10,
    marginBottom: 5,
  },
  SaveChangesBtn: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: Colors.voilet1,
    borderRadius: 4,
    //marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  save: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
  },
  TextInput: {
    borderBottomWidth: 1,
    borderColor: Colors.grey2,
    width: "100%",
  },
  SmallTextInput: {
    width: "100%",
    borderBottomWidth: 0.7,
    borderColor: Colors.grey2,
    marginTop: 10,
    paddingBottom: 5,
  },
  KidText: {
    color: Colors.voilet1,
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
  },
});
