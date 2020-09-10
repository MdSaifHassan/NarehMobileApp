import * as React from "react";
import { Card, Title, Paragraph, List } from "react-native-paper";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { Colors } from "../../../defaultComponents/Colors";

const ProfileCard = (props) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View>
      <Card>
        <View>
          <List.Accordion
            style={styles.CardHeader}
            title="General"
            id="30"
            titleStyle={{ color: Colors.white }}
            expanded={expanded}
            onPress={handlePress}
          >
            <View style={{ paddingVertical: 20 }}>
              <View style={styles.NameV}>
                <View style={styles.NameWrapper}>
                  <Text style={styles.text}>Name</Text>
                  <Text style={styles.text_bottom}>{props.name}</Text>
                </View>
                <View style={styles.NumberWrapper}>
                  <Text style={styles.text}>Mobile Number *</Text>
                  <Text style={styles.text_bottom}>{props.mobile}</Text>
                </View>
              </View>
              {/* /////////////// */}
              <View style={styles.NameV}>
                <View style={styles.NameWrapper}>
                  <Text style={styles.text}>Birth Date</Text>
                  <Text style={styles.text_bottom}>{props.dob}</Text>
                </View>
                <View style={styles.NumberWrapper}>
                  <Text style={styles.text}>Store name</Text>
                  <Text style={styles.text_bottom}>{props.storeName}</Text>
                </View>
              </View>
              {/* ////////////////// */}
              <View style={styles.NameV}>
                <View style={styles.NameWrapper}>
                  <Text style={styles.text}>Email</Text>
                  <Text style={styles.text_bottom}>{props.email}</Text>
                </View>
              </View>
            </View>
          </List.Accordion>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  CardHeader: {
    backgroundColor: Colors.voilet5,
    justifyContent: "center",
    color: "red",
    paddingVertical: -10,
  },
  NameV: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    alignSelf: "center",
  },
  NameWrapper: {
    justifyContent: "center",
    width: "48%",
  },
  NumberWrapper: {
    width: "48%",
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
});
export default ProfileCard;
