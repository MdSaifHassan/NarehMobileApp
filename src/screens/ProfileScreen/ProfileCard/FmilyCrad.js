import * as React from "react";
import { Card, Title, Paragraph, List } from "react-native-paper";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../../defaultComponents/Colors";
import SpouseCard from "./SpouseCard";
import KidsCard from "./KidsCard";
import dateFormat from "dateformat";

const Family = (props) => {
  let kids =
    props.family &&
    props.family.filter((each) => each.familyRelationship === "kid");

  let spouse =
    props.family &&
    props.family.find((each) => each.familyRelationship === "spouse");
  console.log(spouse, "Spouse Prof Screen");
  return (
    <View style={{ paddingBottom: 10 }}>
      <Card style={{ marginTop: 20 }}>
        <View>
          <List.Accordion
            style={{
              backgroundColor: "#c1a6cd",
              paddingVertical: -10,
              justifyContent: "center",
            }}
            title="Family details"
            id="30"
            titleStyle={{ color: Colors.white }}
          >
            {props.family ? (
              <SpouseCard
                married="Married"
                doa={props.doa}
                name={spouse && spouse.familyName}
                dob={spouse && spouse.familyDOB}
              />
            ) : null}
            {kids &&
              kids.map((kid, index) => {
                return (
                  <KidsCard
                    key={kid.familyId}
                    title={`Kid ${index + 1} details`}
                    name={kid.familyName}
                    gender={
                      kid.familyGender === "M"
                        ? "Male"
                        : kid.familyGender === "F"
                        ? "Female"
                        : null
                    }
                    dob={kid.familyDOB}
                  />
                );
              })}
          </List.Accordion>
        </View>
      </Card>
    </View>
  );
};
export default Family;
const styles = StyleSheet.create({
  NameV: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "center",
  },
  FullCardBody: {
    paddingVertical: 15,
  },
  NameWrapper: {
    width: "48%",
  },
  NumberWrapper: {
    width: "48%",
    marginBottom: 10,
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
  },
  text_bottom: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
    marginTop: 5,
  },
  kidText: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.voilet1,
  },
});
