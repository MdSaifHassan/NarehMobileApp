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
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { Colors } from "../../../../defaultComponents/Colors";
import { tokenApi } from "../../../../api/nsl";
import {
  ButtonOutline,
  ButtonFill,
} from "../../../../defaultComponents/Button";
import { ErrorText } from "./ProfileEditText";

const SelectState = ({ state, transferState }) => {
  const [states, setStates] = useState(null);
  const [selectedState, setSelectedState] = useState(state);
  const [open, setOpen] = useState(false);

  console.log(state);
  console.log(selectedState, "SELECTEDSTATE");

  React.useEffect(() => {
    tokenApi().then((res) =>
      res
        .post("/v1/lookup/states")
        .then((response) => {
          // console.log(response.data.response);
          setStates(response.data.response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }, []);

  return (
    <View style={styles.PickerWrapper}>
      <View style={styles.TextWrapper}>
        <Text style={styles.text}>State </Text>
        <Text style={{ color: "#F26F25" }}>*</Text>
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
                {open && <ErrorText>Close</ErrorText>}
              </View>
            </TouchableOpacity>
            {open && (
              <Picker
                itemStyle={styles.Picker}
                selectedValue={selectedState}
                onValueChange={(StateValue) => setSelectedState(StateValue)}
                // onPress={() => setOpen(true)}
              >
                {states &&
                  states.map((state, index) => {
                    return (
                      <Picker.Item
                        key={state.stateName}
                        label={state.stateName}
                        value={state.stateName}
                      />
                    );
                  })}
                {selectedState ? transferState(selectedState) : null}
              </Picker>
            )}
          </View>
        ) : (
          <Picker
            itemStyle={styles.Picker}
            selectedValue={selectedState}
            onValueChange={(StateValue) => setSelectedState(StateValue)}
            // onPress={() => setOpen(true)}
          >
            {states &&
              states.map((state, index) => {
                return (
                  <Picker.Item
                    key={state.stateName}
                    label={state.stateName}
                    value={state.stateName}
                  />
                );
              })}
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

export default SelectState;
