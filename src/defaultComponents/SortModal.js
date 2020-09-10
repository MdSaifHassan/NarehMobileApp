import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton, Text, Button } from "react-native-paper";
import { ShadowCard } from "./ShadowCard";
import { BottomDivider } from "./Divider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RowView from "./RowView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "./Colors";
import { Platform } from "react-native";
import { ButtonFill } from "./Button";

const SortModalContent = ({ onPress, button }) => {
  const [value, setValue] = React.useState();
  console.log("ValueSort", value);
  return (
    <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
      {value ? button(value) : null}
      <ShadowCard width={"100%"}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#c1a6cd" }}>
          <RowView aItems="center">
            <Text
              style={{
                paddingBottom: 10,
                fontFamily: "roboto-medium",
                fontSize: 14,
                lineHeight: 24,
                fontWeight: "500",
              }}
            >
              Sort By
            </Text>
            <ButtonFill onPress={onPress}>
              <Text style={{ color: Colors.white }}>OK</Text>
            </ButtonFill>
          </RowView>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>New</Text>
          <View style={styles.radioButton}>
            <RadioButton value="new" color={Colors.voilet1} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Point -- Low to High</Text>
          <View style={styles.radioButton}>
            <RadioButton value="asc" color={Colors.voilet1} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Point -- High to Low</Text>
          <View style={styles.radioButton}>
            <RadioButton value="desc" color={Colors.voilet1} />
          </View>
        </View>

        {/* <MaterialCommunityIcons name="close" size={24} color="black" /> */}
      </ShadowCard>
    </RadioButton.Group>
  );
};

const SortModalContentDynamic = ({ onPress, button, categoryTitle }) => {
  const [value, setValue] = React.useState();
  console.log("ValueSort", value);
  return (
    <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
      {value ? button(value) : null}
      <ShadowCard width={"100%"}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#c1a6cd" }}>
          <RowView aItems="center">
            <Text
              style={{
                paddingBottom: 10,
                fontFamily: "roboto-medium",
                fontSize: 14,
                lineHeight: 24,
                fontWeight: "500",
              }}
            >
              Sort By
            </Text>
            <ButtonFill onPress={onPress}>
              <Text style={{ color: Colors.white }}>OK</Text>
            </ButtonFill>
          </RowView>
        </View>

        {/* {categoryTitle? categoryTitle.map} */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>New</Text>
          <View style={styles.radioButton}>
            <RadioButton value="new" color={Colors.voilet1} />
          </View>
        </View>

        {/* <MaterialCommunityIcons name="close" size={24} color="black" /> */}
      </ShadowCard>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    // backgroundColor: "red",
    borderWidth: Platform.OS === "ios" ? 0.3 : 0,
    marginTop: 5,
    borderRadius: Platform.OS === "ios" ? 50 : 0,
  },
});

export default SortModalContent;
