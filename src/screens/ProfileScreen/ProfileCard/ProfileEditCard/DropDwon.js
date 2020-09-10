import React, { useState } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { Colors } from "../../../../defaultComponents/Colors";
import { tokenApi } from "../../../../api/nsl";

const Dropdwon = ({ city, state1 }) => {
  const [states, setStates] = useState(null);
  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedState, setSelectedState] = useState(state1);
  const [open, setOpen] = useState(false);

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
    <View style={styles.container}>
      <View style={styles.PickerWrapper}>
        <View style={styles.TextWrapper}>
          <Text style={styles.text}>State</Text>
          <Text style={{ color: "#F26F25" }}>*</Text>
        </View>
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
                  key={state.stateGST}
                  label={state.stateName}
                  value={state.stateCode}
                />
              );
            })}
        </Picker>
      </View>
      {/* <View style={{ width: 20 }} /> */}
      <View style={styles.PickerWrapper}>
        <View style={styles.TextWrapper}>
          <Text style={styles.text}>City</Text>
          <Text style={{ color: "#F26F25" }}>*</Text>
        </View>
        <TextInput
          style={styles.SmallTextInput}
          onChangeText={(CityValue) => setSelectedCity(CityValue)}
          value={selectedCity}
        />
        {/* <Picker
          itemStyle={styles.Picker}
          selectedValue={selectedCity}
          onValueChange={(CityValue) => setSelectedCity(CityValue)}
        >
          <Picker.Item label="Bengaluru" value="1" />
          <Picker.Item label="Yeshwantpur" value="2" />
          <Picker.Item label="Hebbal" value="3" />
          <Picker.Item label="Silk Board" value="4" />
        </Picker> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  PickerWrapper: {
    width: "48%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#303030",
  },
  Picker: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "left",
    color: Colors.grey2,
    justifyContent: "flex-start",
    // opacity: 0,
    // height: open ? 40 : 0,
  },
  TextWrapper: {
    // width: 152,
    flexDirection: "row",
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: "#616161",
    marginRight: 2,
  },
  SmallTextInput: {
    width: "100%",
    borderBottomWidth: 0.7,
    borderColor: Colors.grey2,
    marginTop: 10,
    paddingBottom: 5,
  },
});

export default Dropdwon;

// const Dropdwon = () => {
//   const [selectedCity, setSelectedCity] = useState("City");
//   const [selectedState, setSelectedStae] = useState("State");
//   return (
//     <View style={styles.container}>
//       <View style={styles.PickerWrapper}>
//         <View style={styles.TextWrapper}>
//           <Text style={styles.text}>State</Text>
//           <Text style={{ color: "#F26F25" }}>*</Text>
//         </View>
//         <Picker
//           style={styles.Picker}
//           selectedValue={selectedCity}
//           onValueChange={(CityValue) => setSelectedCity(CityValue)}
//         >
//           <Picker.Item label="Maharashtra" value="1" />
//           <Picker.Item label="Karnataka" value="2" />
//           <Picker.Item label="Kanpur" value="3" />
//           <Picker.Item label="Kisanganj" value="4" />
//         </Picker>
//       </View>
//       <View style={{ width: 20 }} />
//       <View style={styles.PickerWrapper}>
//         <View style={styles.TextWrapper}>
//           <Text style={styles.text}>City</Text>
//           <Text style={{ color: "#F26F25" }}>*</Text>
//         </View>
//         <Picker
//           style={styles.Picker}
//           selectedValue={selectedState}
//           onValueChange={(StateValue) => setSelectedStae(StateValue)}
//         >
//           <Picker.Item label="Bangalore" value="1" />
//           <Picker.Item label="Bihar" value="2" />
//           <Picker.Item label="Pune" value="3" />
//           <Picker.Item label="Mumbai" value="4" />
//         </Picker>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     flexDirection: "row",
//   },
//   PickerWrapper: {
//     justifyContent: "space-between",
//     borderBottomWidth: 1,
//     borderBottomColor: "#303030",
//   },
//   Picker: {
//     // height: 47,
//     // width: 153,
//     // marginBottom: 8,
//     fontSize: 13,
//     fontWeight: "400",
//     textAlign: "left",
//     color: "#303030",
//     // backgroundColor: "red",
//     padding: 0,
//     // justifyContent: "flex-start",
//   },
//   TextWrapper: {
//     width: 152,
//     flexDirection: "row",
//   },
//   InnerText: {
//     width: 59,
//     height: 18,
//   },
//   text: {
//     opacity: 0.8,
//     fontSize: 12,
//     fontFamily: "roboto-regular",
//     fontWeight: "400",
//     color: "#616161",
//     marginRight: 2,
//   },
// });

// export default Dropdwon;
