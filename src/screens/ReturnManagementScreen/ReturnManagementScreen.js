import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";

import Header from "../../components/Header";
import { Colors } from "../../defaultComponents/Colors";
import { ButtonOutline, ButtonFill } from "../../defaultComponents/Button";
import SearchBar from "../../defaultComponents/SearchBar";
import Calendar from "../../components/Calendar";
import { ReturnList, ReturnListDelete } from "./ReturnList";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { tokenApi } from "../../api/nsl";
import dateFormat from "dateformat";
import Container from "../../defaultComponents/Container";
import { useIsFocused } from "@react-navigation/native";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";

const ReturnManagementScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [dataCopy, setDataCopy] = useState(null);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  const [modalV, setModalV] = useState(false);

  const isFocused = useIsFocused();

  let v = dateFormat(value, "yyyymmdd");
  let v1 = dateFormat(value1, "yyyymmdd");

  useEffect(() => {
    if (v <= v1) {
      setLoading(true);
      tokenApi().then((res) =>
        res
          .post("/v2/members/listReturns", {
            page: "1",
            perPage: "100",
            fromDate: dateFormat(value, "dd-mm-yyyy"),
            toDate: dateFormat(value1, "dd-mm-yyyy"),
            search,
          })
          .then((response) => {
            setLoading(false);
            setData(response.data.response.data);
            setDataCopy(response.data.response.data);
            console.log(response.data.response.data, "DATAFETCHED");
          })
          .catch((err) => {
            setLoading(false);
            setError("Invalid request");
          })
      );
    } else {
      setModalV(true);
    }
  }, [value, value1, isFocused]);

  const searchHandler = () => {
    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v2/members/listReturns", {
          page: "1",
          perPage: "100",
          fromDate: dateFormat(value, "dd-mm-yyyy"),
          toDate: dateFormat(value1, "dd-mm-yyyy"),
          search,
        })
        .then((response) => {
          setLoading(false);
          setData(response.data.response.data);
          console.log(response.data.response.data.length, "DATAFETCHED");
        })
        .catch((err) => {
          setLoading(false);
          alert("Invalid request");
          setData([]);
        })
    );
  };
  const changeHandler = (text) => {
    setSearch(text);
    const newData = dataCopy.filter((item) =>
      item.productCode.toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header title="Return Management" />
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <SearchBar
              onChangeText={(text) => changeHandler(text)}
              value={search}
              onPress={searchHandler}
            />
          </View>
          <View style={styles.dateWrapper}>
            <View style={styles.dateSubWrapper}>
              <Calendar
                text="From"
                oneLess
                calData={(CalIn) => setValue(CalIn)}
              />
            </View>
            <View style={[styles.dateSubWrapper, styles.dateSubWrapperRight]}>
              <Calendar text="To" calData={(CalIn) => setValue1(CalIn)} />
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.listContainer}>
            {loadingScreen}
            {data ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={({ item }) => {
                  return (
                    <>
                      {/* <Container> */}
                      <ReturnList
                        productName={item.productCode}
                        quantity={item.quantity}
                        unclaimedQuantity={item.unclaimedQuantity}
                        claimType={item.claimAs}
                      />
                      {/* </Container> */}
                    </>
                  );
                }}
              />
            ) : null}
            <View style={styles.addNewButton}>
              <ButtonFill onPress={() => navigation.navigate("NewReturn")}>
                <Text style={styles.addNewText}>Add New Return</Text>
              </ButtonFill>
            </View>
          </View>
        </View>
      </View>
      {modalV ? (
        <ModalFailure
          visible={modalV}
          Icon="error"
          name="Please Enter Valid Dates"
          footerName="Select dates correctly to get results"
          onDismiss={() => {
            // setDisable(false);
            setModalV(false);
          }}
        />
      ) : null}
    </View>
  );
};

export default ReturnManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: { flex: 1 },
  contentContainer: {
    width: "91.46%",
    alignSelf: "center",
    marginVertical: 20,
  },
  searchContainer: {
    paddingVertical: 20,
    width: "100%",
  },
  dateWrapper: {
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },
  dateSubWrapper: {
    // width: "50%",
  },
  dateSubWrapperRight: {
    // alignItems: "flex-end",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContainer: {
    width: "91.46%",
    alignSelf: "center",
    // alignItems: "center",
    flex: 1,
  },
  addNewButton: {
    // flex: 1,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "flex-end",
    // maxWidth: 150,
  },
  addNewText: {
    color: Colors.white,
    // width: "100%",
    textAlign: "center",
    fontFamily: "roboto-regular",
    fontSize: 14,
    fontWeight: "400",
    marginVertical: 4,
  },
});
