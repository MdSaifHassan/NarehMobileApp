import React, { useState } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { ErrorText } from "../../screens/ProfileScreen/ProfileEditScreenCards/ProfileDefaultComponents/ProfileEditText";

const ClientTypeP = ({ transferState }) => {
  const [selectedState, setSelectedState] = useState("");
  const [open, setOpen] = useState(false);
  console.log(selectedState, "for selectedstate");
  return (
    <View style={styles.PickerWrapper}>
      <View style={styles.TextWrapper}>
        <Text style={styles.text}>Client Type</Text>
        {/* <Text style={{ color: "#F26F25" }}>*</Text> */}
      </View>
      <View>
        {Platform.OS === "ios" ? (
          <View>
            <TouchableOpacity
              style={{ marginTop: 10, marginBottom: 5 }}
              onPress={() => setOpen((prev) => !prev)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{selectedState}</Text>
                {open ? <ErrorText>Close</ErrorText> : null}
              </View>
            </TouchableOpacity>
            {open && (
              <Picker
                itemStyle={styles.Picker}
                onValueChange={(value) => setSelectedState(value)}
                selectedValue={selectedState}
              >
                <Picker.Item key="1" label="Select Type" value="" />
                <Picker.Item key="Retailer" label="Retailer" value="Retailer" />
                <Picker.Item
                  key="Distributor"
                  label="Distributor"
                  value="Distributor"
                />
                {selectedState ? transferState(selectedState) : null}
              </Picker>
            )}
          </View>
        ) : (
          <Picker
            itemStyle={styles.Picker}
            selectedValue={selectedState}
            onValueChange={(value) => setSelectedState(value)}
          >
            <Picker.Item key="1" label="Select Type" value="" />
            <Picker.Item key="Retailer" label="Retailer" value="Retailer" />
            <Picker.Item
              key="Distributor"
              label="Distributor"
              value="Distributor"
            />
            {selectedState ? transferState(selectedState) : null}
          </Picker>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PickerWrapper: {
    width: "100%",
    justifyContent: "space-between",
    // borderTopWidth: Platform.OS === "ios" ? 0.4 : 0,
    borderBottomWidth: Platform.OS === "ios" ? 0.4 : 0,
    borderBottomColor: "#303030",
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    marginVertical: 10,
  },
  Picker: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "left",
    color: Platform.OS === "ios" ? Colors.voilet1 : Colors.grey2,
    width: "80%",
    alignSelf: "center",
  },
  TextWrapper: {
    flexDirection: "row",
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    // fontWeight: 400,
    color: Colors.grey,
  },
});

export default ClientTypeP;
