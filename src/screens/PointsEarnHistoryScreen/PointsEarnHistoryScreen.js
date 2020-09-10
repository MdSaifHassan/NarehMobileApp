import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";
import Calendar from "../../components/Calendar";
import PointCard from "./PointCard";
import { Colors } from "../../defaultComponents/Colors";
import SearchBar from "../../defaultComponents/SearchBar";
import { SortModal } from "../../defaultComponents/ModalFolder/sortModal";
import { tokenApi } from "../../api/nsl";
import Container from "../../defaultComponents/Container";
import dateFormat from "dateformat";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";

const PointsEarnHistoryScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [dataCopy, setDataCopy] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modalV, setModalV] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [search, setSearch] = useState("");
  const [points, setPoints] = useState(null);
  const [radioValue, setRadioValue] = useState();
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const { apiContext } = useContext(AuthContext);

  let v = dateFormat(value, "yyyymmdd");
  let v1 = dateFormat(value1, "yyyymmdd");

  useEffect(() => {
    if (v <= v1) {
      setLoading(true);
      tokenApi().then((res) =>
        res
          .post("/v1/members/earnHistory", {
            page: "1",
            perPage: "150",
            search: search,
            fromDate: dateFormat(value, "isoDate"),
            toDate: dateFormat(value1, "isoDate"),
            sortBy: radioValue === "new" ? "created_date" : "points",
            sortOrder: radioValue !== "new" ? radioValue : "desc",
          })
          .then((response) => {
            // console.log(response.data.response.data);

            setData(response.data.response.data);
            setDataCopy(response.data.response.data);
            apiContext.totalPoints(response.data.response.total_points);
            setPoints(response.data.response);
            console.log(response.data.response.data, "DATA");
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          })
      );
    } else {
      // alert("Select dates correctly to get results"); //Modal Error required
      setModalV(true);
    }
  }, [value, value1, isFocused]);

  console.log(dateFormat(value, "isoDate"), "---calendar date values");

  const apiCall = () => {
    tokenApi().then((res) =>
      res
        .post("/v1/members/earnHistory", {
          page: "1",
          perPage: "150",
          search: search,
          fromDate: dateFormat(value, "isoDate"),
          toDate: dateFormat(value1, "isoDate"),
          sortBy: radioValue === "new" ? "created_date" : "points",
          sortOrder: radioValue !== "new" ? radioValue : "desc",
        })
        .then((response) => {
          setLoading(false);
          setData(response.data.response.data);
        })

        .catch((error) => {
          setLoading(false);
          console.log(error);
        })
    );
  };

  const searchHandler = () => {
    setLoading(true);

    apiCall();
  };

  const openModal = () => {
    setModal(!modal);
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  // const renderItem = ({ item }) => (
  //   <PointCard
  //     name={item.product_name}
  //     couponCode={item.description}
  //     typeOfCoupon={item.point_type}
  //     points={item.points}
  //     dateCreated={dateFormat("2020-08-21 03:26:26", "dd mmm yyyy")}
  //   />
  // );

  //console.log(dataCopy && dataCopy, "DATA");

  // const memoizedValue = useMemo(() => renderItem, [data]);

  const changeHandler = (text) => {
    setSearch(text);
    const newData = dataCopy.filter((item) =>
      item.description.toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  };

  console.log(data && data.length, "DATA_LEngth");

  return (
    <>
      <View style={styles.container}>
        <View style={{ backgroundColor: "rgb(250, 250, 250)" }}>
          <Header title="Points Earn History" />

          <View style={styles.searchWrapper}>
            <View style={{ width: "66%" }}>
              <SearchBar
                value={search}
                onChangeText={(text) => changeHandler(text)}
                onPress={searchHandler}
              />
            </View>

            <View style={styles.sortWapper}>
              <TouchableOpacity style={styles.sort} onPress={openModal}>
                <Image
                  source={require("../../../assets/sort.png")}
                  style={styles.arrow}
                />
                <Text>Sort</Text>
              </TouchableOpacity>
            </View>
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
              <Calendar text="To" calData={(a) => setValue1(a)} />
            </View>
          </View>

          <View style={styles.pointsWrapper}>
            <Text style={styles.pointsText}>
              Total Earned Points: {points ? points.total_points : 0}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingTop: 25,
            flex: 1,
            alignItems: "center",
            // backgroundColor: "white",
          }}
        >
          <Container>
            {loadingScreen}
            {data ? (
              <FlatList
                // ListEmptyComponent={
                //   <Text style={{ marginTop: 30, textAlign: "center" }}>
                //     No earn history to show for the selected month
                //   </Text>
                // }
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PointCard
                    name={item.product_name}
                    couponCode={item.description}
                    typeOfCoupon={item.point_type}
                    points={item.points}
                    dateCreated={item.created_date
                      .slice(0, 11)
                      .split("-")
                      .reverse()
                      .join("-")}
                  />
                )}
                initialNumToRender={10}
              />
            ) : null}
          </Container>
        </View>
        {modal1 ? (
          <ModalContent
            visible={modal1}
            onDismiss={() => {
              setModal1(false);
            }}
            name="Book My Show-Winpin"
            footerName="eVouchers Added in your cart"
            btnText="Done"
          />
        ) : null}
        {modal ? (
          <SortModal
            button={(value) => setRadioValue(value)}
            visible={modal}
            onDismiss={() => {
              setLoading(true);
              apiCall();
              setModal(false);
            }}
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
      </View>
    </>
  );
};

export default PointsEarnHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 20,
  },
  searchWrapper: {
    width: "91.46%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 35,
    width: "66%",
  },
  search: {
    paddingVertical: 11,
    paddingLeft: 20,
    borderColor: Colors.grey3,
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    fontSize: 12,
    fontWeight: "400",
  },
  searchIcon: {
    backgroundColor: Colors.voilet1,
    width: 48,
    height: 35,
    paddingVertical: 10,
    paddingLeft: 17,
    paddingRight: 15,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: "center",
  },
  sortWapper: {
    width: "23%",
    flexDirection: "row-reverse",
  },
  sort: {
    maxWidth: 78,
    borderWidth: 1,
    height: 35,
    borderColor: Colors.grey4,
    borderRadius: 4,
    paddingVertical: 8,
    paddingRight: 21,
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    height: 10.32,
    width: 9,
    marginRight: 3,
    marginLeft: 20,
  },
  dateWrapper: {
    // justifyContent: "space-between",
    marginTop: 26,
    width: "91.46%",
    alignSelf: "center",
  },
  dateSubWrapper: {
    // alignItems: "center",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "flex-start",
  },
  dateSubWrapperRight: {},
  pointsWrapper: {
    minHeight: 40,
    marginHorizontal: "17%",
    borderRadius: 6,
    backgroundColor: Colors.voilet3,
    marginBottom: -15,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsText: {
    color: Colors.voilet4,
    fontWeight: "500",
    fontFamily: "roboto-bold",
    fontSize: 13,
    textAlign: "center",
  },
});
