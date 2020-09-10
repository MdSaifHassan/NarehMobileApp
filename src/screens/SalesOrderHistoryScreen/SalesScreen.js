import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  SectionList,
} from "react-native";
import SearchBar from "../../defaultComponents/SearchBar";
import BackHeader from "../../defaultComponents/BackHeader";
import Calendar from "../../components/Calendar";
import VioletDiv from "../../defaultComponents/VioletDiv";
import { ReturnList } from "../ReturnManagementScreen/ReturnList";
import Container from "../../defaultComponents/Container";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { tokenApi } from "../../api/nsl";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import dateFormat from "dateformat";
import { ButtonFill } from "../../defaultComponents/Button";

import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";
import { AuthContext } from "../../contexts/AuthContext";

const SalesScreen = ({ navigation, route }) => {
  console.log(route.params, ".....");
  let id, item;
  if (route) {
    item = route.params.item;
    id = item.mbrID;
  }

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [dataCopy, setDataCopy] = useState(null);

  const [modalV, setModalV] = useState(false);
  const { apiState } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  // let v1 = new Date(value1).getTime();
  // let v = new Date(value).getTime();
  let v = dateFormat(value, "yyyymmdd");
  let v1 = dateFormat(value1, "yyyymmdd");
  console.log(v1, v, "v1");

  // let test = new Date(value);

  // console.log(test.setMonth(test.getMonth() - 1), "testing month");
  // console.log(dateFormat(test, "dd mmm yyyy"));

  if (apiState.permissions.members) {
    useEffect(() => {
      if (v1 >= v) {
        // if (value <= value1) {
        setLoading(true);
        tokenApi().then((res) =>
          res
            .post("/v2/members/memberSalesOrders", {
              mbrID: id,
              page: "1",
              perPage: "100",
              fromDate: dateFormat(value, "mm-yyyy"),
              toDate: dateFormat(value1, "mm-yyyy"),
              search,
            })
            .then((response) => {
              setLoading(false);
              console.log(response.data.response.data, "Data sales");
              setData(response.data.response.data);
            })
            .catch((err) => {
              setLoading(false);
              alert("Invalid request");
            })
        );
      } else {
        setModalV(true);
      }
    }, [value, value1]);
  }

  const changeHandler = (text) => {
    setSearch(text);
    // const newData = dataCopy.filter((item) =>
    //   item.productName.toLowerCase().includes(text.toLowerCase())
    // );
    // setData([...data, ...newData]);
  };

  const searchHandler = () => {
    setLoading(true);
    if (apiState.permissions.members) {
      tokenApi().then((res) =>
        res
          .post("/v2/members/memberSalesOrders", {
            mbrID: id,
            page: "1",
            perPage: "100",
            fromDate: dateFormat(value, "mm-yyyy"),
            toDate: dateFormat(value1, "mm-yyyy"),
            search,
          })
          .then((response) => {
            setLoading(false);
            console.log(response.data.response.data);
            setData(response.data.response.data);
          })
          .catch((err) => {
            alert("Invalid request");
            setLoading(false);
          })
      );
    }
    setSearch("");
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <BackHeader title="Sales Order History"></BackHeader>
      <View style={styles.searchContainer}>
        <SearchBar
          onChangeText={(text) => changeHandler(text)}
          value={search}
          onPress={searchHandler}
        />
      </View>
      <View style={styles.calendarContainer}>
        <Calendar text="From" oneLess calData={(CalIn) => setValue(CalIn)} />
        <Calendar text="To" calData={(CalIn) => setValue1(CalIn)} />
      </View>

      {loadingScreen}

      {route.params ? (
        <Text
          style={{
            color: "black",
            marginLeft: 15,
            fontSize: 20,
          }}
        >
          {item.memberName}
        </Text>
      ) : null}

      {data ? (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Container>
                  <ReturnList
                    productName={item.productName}
                    quantity={item.totalQuantity}
                  />
                </Container>
              </View>
            );
          }}
          renderSectionHeader={({ section }) => (
            <View style={{ marginBottom: 15 }}>
              <VioletDiv> {section.monthYear} </VioletDiv>
            </View>
          )}
        />
      ) : null}
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
      {/* {search!=='' ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data.data}
          renderItem={({ item }) => {
            return (
              <View>
                <VioletDiv>{data.monthYear}</VioletDiv>
                <Container>
                  <ReturnList
                    productName={item.productName}
                    quantity={item.totalQuantity}
                  />
                </Container>
              </View>
            );
          }}
        />
      ) : null} */}
    </View>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  searchContainer: {
    marginVertical: 20,
    width: "91.46%",
    alignSelf: "center",
  },
  calendarContainer: {
    // flexDirection: "row",
    width: "91.46%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
