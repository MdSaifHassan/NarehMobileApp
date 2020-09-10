import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";
import { Colors } from "../../defaultComponents/Colors";
import { ShadowCard } from "../../defaultComponents/ShadowCard";
import Calendar from "../../components/Calendar";
import { ButtonOutline } from "../../defaultComponents/Button";
import { tokenApi } from "../../api/nsl";
import dateFormat from "dateformat";
import ClientTypeP from "./AddNewContainerPicker";
import { ErrorText } from "../ProfileScreen/ProfileEditScreenCards/ProfileDefaultComponents/ProfileEditText";

const Dropdown = ({ products }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    tokenApi().then((res) =>
      res
        .post("/v1/lookup/products")
        .then((response) => {
          console.log(response.data.response.data.length);
          setData(response.data.response.data);
        })
        .catch((error) => console.log(error))
    );
  }, []);

  return (
    <View style={styles.PickerWrapper}>
      <View style={styles.TextWrapper}>
        <Text style={styles.text}>Product Code</Text>
      </View>

      {data ? products(data) : null}

      {/* {data ? ( 
        <FlatList
          data={data}
          keyExtractor={item.productID}
          renderItem={({ item }) => {
            return (
              <Picker
                itemStyle={styles.Picker}
                selectedValue={selectedProduct}
                onValueChange={(StateValue) => setSelectedProduct(StateValue)}
              >
                <Picker.Item label={item.productName} value={item.productID} />
              </Picker>
            );
          }}
        />
      ) : null} */}

      {/* <Picker.Item label="NYM6001GHK004" value="1" />
        <Picker.Item label="NYM6001GHK005" value="2" />
        <Picker.Item label="NYM6001GHK006" value="3" />
        <Picker.Item label="NYM6001GHK007" value="4" /> */}
    </View>
  );
};

const AddNewContainer = ({
  onPress,
  cData,
  value,
  onChangeText,
  product,
  transferStatetoParent,
  valueUnclaim,
  onChangeTextUnclaim,
  disabled,
  show,
}) => {
  const [selectedProduct, setSelectedProduct] = useState();

  const [open, setOpen] = useState(false);

  const fetch = (data) => {
    //setDataa(data);
    return (
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
                <Text>{selectedProduct}</Text>
                {open && <ErrorText>Close</ErrorText>}
              </View>
            </TouchableOpacity>
            {open && (
              <Picker
                itemStyle={styles.Picker}
                selectedValue={selectedProduct}
                onValueChange={(StateValue) => setSelectedProduct(StateValue)}
              >
                <Picker.Item key="1" label="Select Product" value={null} />
                {data.map((item) => {
                  return (
                    <Picker.Item
                      key={item.productID}
                      label={item.productName}
                      value={item.productName}
                    />
                  );
                })}
                {selectedProduct ? product(selectedProduct) : null}
              </Picker>
            )}
          </View>
        ) : (
          <Picker
            itemStyle={styles.Picker}
            selectedValue={selectedProduct}
            onValueChange={(StateValue) => setSelectedProduct(StateValue)}
          >
            <Picker.Item key="1" label="Select Product" value="" />
            {data.map((item) => {
              return (
                <Picker.Item
                  key={item.productID}
                  label={item.productName}
                  value={item.productName}
                />
              );
            })}
            {selectedProduct ? product(selectedProduct) : null}
          </Picker>
        )}
      </View>
    );
  };
  console.log(selectedProduct, "SELECTED");

  // const pressHandler = () => {
  //   const { productName } = dataa.find(
  //     (item) => item.productID === selectedProduct
  //   );
  //   console.log(productName, quantity, value, "...picker Product");
  //   values(productName, quantity, value);
  // tokenApi().then((res) =>
  //   res
  //     .post("/v1/members/addReturns", [
  //       {
  //         productCode: "TEST-12-34",
  //         quantity,
  //         returnDate: dateFormat(value, "dd-mm-yyyy"),
  //       },
  //     ])
  //     .then((response) => {
  //       console.log(response.data.message);
  //       setModal(true);
  //     })
  //     .catch((err) => console.log(err.response))
  // );
  // };

  return (
    <View style={styles.containerBox}>
      <ShadowCard>
        <ClientTypeP transferState={transferStatetoParent} />
        <Dropdown products={(data) => fetch(data)} />
        <View style={styles.Wrapper}>
          <View style={styles.LeftWrapper}>
            {show && (
              <View
                style={{
                  marginVertical: 10,
                  width: "48%",
                }}
              >
                <Text style={styles.qtyText}> Claimed Quantity</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextInput
                    style={styles.SmallTextInput}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            )}

            <View
              style={{
                marginVertical: 10,
                width: "48%",
              }}
            >
              <Text style={styles.qtyText}> Unclaimed Quantity</Text>
              <View
                style={{
                  flex: 1,
                }}
              >
                <TextInput
                  style={styles.SmallTextInput}
                  value={valueUnclaim}
                  onChangeText={onChangeTextUnclaim}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
          <Text style={styles.qtyText}>Return Date</Text>
          <Calendar date="Dec, 2019" calData={(CalIn) => cData(CalIn)} />
        </View>
        <View style={styles.addBtn}>
          <ButtonOutline disabled={disabled} onPress={onPress}>
            <Text style={styles.addText}>Add Product</Text>
          </ButtonOutline>
        </View>
      </ShadowCard>
    </View>
  );
};

export default AddNewContainer;

const styles = StyleSheet.create({
  containerBox: {
    marginTop: 20,
  },
  PickerWrapper: {
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
  Picker: {
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "roboto-bold",
    color: Colors.red1,
    justifyContent: "flex-start",
    textAlign: "center",
  },
  TextWrapper: {
    flexDirection: "row",
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
    textAlign: "center",
  },
  Wrapper: {
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "row",
    marginTop: 16,
  },
  LeftWrapper: {
    // alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  qtyText: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
    marginBottom: 10,
  },
  SmallTextInput: {
    // width: "100%",
    borderBottomWidth: 0.7,
    borderColor: Colors.grey2,
    paddingBottom: 5,
    minWidth: 40,
    marginBottom: 15,
    // textAlign: "center",
    // alignSelf: "center",
  },
  calendarContainer: {
    // width: "100%",
    // alignItems: "flex-start",
    // flexDirection: "row",
  },
  calendarSubContainer: {
    // flex: 1,
    // justifyContent: "space-between",
  },
  addBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  addText: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
  },
});
