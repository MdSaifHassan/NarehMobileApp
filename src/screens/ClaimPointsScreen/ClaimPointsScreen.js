import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";

import Header from "../../components/Header";
import { Colors } from "../../defaultComponents/Colors";
import { ButtonOutline, ButtonFill } from "../../defaultComponents/Button";
import VioletDiv from "../../defaultComponents/VioletDiv";
import DefaultBackgroundText from "./DefaultBackgroundText";
import ClaimPointsList from "./ClaimPointsList";
import {
  ModalDelete,
  ModalFailure,
  Sucess,
} from "../../defaultComponents/ModalFolder/ContentModal";
import { tokenApi } from "../../api/nsl";

import LoadingScreen from "../../defaultComponents/LoadingScreen";

import { couponRE } from "../../components/RegExValidations";
import { useIsFocused } from "@react-navigation/native";

export default function ClaimPointsScreen({ navigation, route }) {
  // const couponScan = route ? route.params.data : null;

  const isFocused = useIsFocused();
  useEffect(() => {
    if (route.params?.data) {
      setCoupon(route.params?.data);
      setLoading(true);
      tokenApi().then((res) =>
        res
          .post("/v1/coupons/verifyCoupon", { coupon })
          .then((response) => {
            setData(response.data.response);
            console.log(response.data.response);
            setLoading(false);
            setCouponList((prev) => [...prev, response.data.response[0]]);
            console.log(couponsList.length, "LENGTH");
            setPoints((prev) =>
              eval(
                parseFloat(prev) + parseFloat(response.data.response[0].points)
              )
            );
            setCoupon("");
          })

          .catch((error) => {
            setLoading(false);
            setCoupon("");
            setModal2(true);

            if (couponsList.length < 1) {
              setAdd(true);
            }
            // setCouponList([]);
            // setPointsTotal(0);
          })
      );
      setAdd(false);
      // setCoupon(data);
    }
  }, [route.params?.data, isFocused]);

  const [data, setData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modalV, setModalV] = useState(false);
  const [add, setAdd] = useState(true);
  const [couponsList, setCouponList] = useState([]);
  const [deleteBtn, setDelete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [points, setPoints] = useState(0);
  const [isValidCoupon, setIsValidCoupon] = useState(false);

  console.log(couponsList, "-----LL");
  const pressHandler2 = () => {
    const coupons = couponsList.map((coup) => coup.coupon_code).join();
    console.log(coupons, "------couponsArray");
    tokenApi().then((res) =>
      res
        .post("/v1/coupons/submitCoupon", {
          coupon: coupons,
        })
        .then((response) => {
          console.log(response.data, "-----rr");
          setModal1(true);
        })
        .catch((error) => {
          setLoading(false);
          setModal2(true);
        })
    );
    setPoints(0);
    setAdd(true);
    setCouponList([]);
  };

  console.log(".....dd", deleteBtn);
  const addHandler = () => {
    if (coupon === "") {
      return setModalV(true);
    }
    // if (!isValidCoupon) {
    //   return setModalV(true);
    // }

    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v1/coupons/verifyCoupon", { coupon })
        .then((response) => {
          setData(response.data.response);
          console.log(response.data.response);
          setLoading(false);
          setCouponList((prev) => [...prev, response.data.response[0]]);
          console.log(couponsList.length, "LENGTH");
          setPoints((prev) =>
            eval(
              parseFloat(prev) + parseFloat(response.data.response[0].points)
            )
          );
          setCoupon("");
          // setPointsTotal((prev) =>
          //   parseFloat(
          //     parseFloat(prev) + parseFloat(response.data.response[0].points)
          //   )
          // );
        })

        .catch((error) => {
          setLoading(false);
          setCoupon("");
          setModal2(true);

          if (couponsList.length < 1) {
            setAdd(true);
          }
          // setCouponList([]);
          // setPointsTotal(0);
        })
    );
    setAdd(false);
  };

  console.log(points, "PointsCumulated");

  const deleteHandler2 = () => {
    setModal(false);
    setDelete(true);
    console.log("----DELETE", deleteBtn);
    deleteHandler(currentIndex);
    setCurrentIndex();
    setDelete(false);
  };
  const modalHandler = (index) => {
    setCurrentIndex(index);
    console.log("....i");
    setModal(true);
  };
  const deleteHandler = (currentIndex) => {
    console.log(currentIndex, "------ii");
    const pointsDeductionCoupon = couponsList[currentIndex].points;
    console.log(pointsDeductionCoupon, "PPP");
    setPoints((prev) =>
      eval(parseFloat(prev) - parseFloat(pointsDeductionCoupon))
    );
    return setCouponList((prev) => {
      console.log(prev, "----prev");
      return prev.filter((coup, i) => i !== currentIndex);
    });
  };
  const changeHandlerCouponName = (coupon) => {
    setCoupon(coupon);
    setIsValidCoupon(couponRE(coupon));
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  // const totalPointsFunc = () =>{

  // console.log(pointsTotal, "TOTAL POINTS");
  // }

  return (
    <View style={styles.container}>
      <Header title="Claim Points" />

      <View style={styles.contentContainer}>
        <View style={styles.addWrapper}>
          <View style={styles.addBar}>
            <TextInput
              placeholder="Enter Coupon Name"
              placeholderTextColor="rgba(2,2,29,0.42)"
              style={
                (styles.enterAddText,
                {
                  color: isValidCoupon ? Colors.voilet1 : Colors.red1,
                })
              }
              value={coupon}
              onChangeText={changeHandlerCouponName}
              maxLength={18}
              minLength={14}
            />

            <View style={styles.addIcon}>
              <TouchableOpacity onPress={addHandler}>
                <Text style={styles.addText}> Add </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.scanWapper}>
            <ButtonOutline onPress={() => navigation.navigate("Scan")}>
              <Text style={styles.scanText}>SCAN</Text>
            </ButtonOutline>
          </View>
        </View>
        <VioletDiv>
          <Text style={styles.totalTitle}>Total Cumulative Points:</Text>
          <Text style={styles.totalPoints}> {points.toString()} </Text>
        </VioletDiv>

        {add ? (
          <View style={styles.defaultContainer}>
            <DefaultBackgroundText>
              (Alpha Numeric 14 - 18) Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore
            </DefaultBackgroundText>
          </View>
        ) : (
          couponsList !== [] && (
            <>
              <FlatList
                data={couponsList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ClaimPointsList
                    onPress={() => modalHandler(index)}
                    number={item.coupon_code}
                    productName={item.product_name}
                    points={item.points}
                  />
                )}
              />
              {loadingScreen}
              <View style={styles.submitButton}>
                <ButtonFill width="40%" onPress={pressHandler2}>
                  <Text style={styles.submitText}>Submit</Text>
                </ButtonFill>
              </View>
            </>
          )
        )}
      </View>
      {modal ? (
        <ModalDelete
          visible={modal}
          onDismiss={() => setModal(false)}
          name="Are you sure?"
          footerName="Do you want to delete it?"
          btn1="Cancel"
          btn2="Yes, Delete"
          Icon="delete"
          delete={deleteHandler2}
        />
      ) : null}
      {modal1 ? (
        <Sucess
          visible={modal1}
          onDismiss={() => {
            setModal1(false);
            navigation.navigate("Points");
          }}
          name="Yay!"
          footerName="Coupons added successfully"
          Icon="md-done-all"
        />
      ) : null}
      {modal2 ? (
        <ModalFailure
          visible={modal2}
          onDismiss={() => setModal2(false)}
          name="Please recheck the coupon"
          footerName="Entered Coupun is not a valid coupun"
          Icon="error"
        />
      ) : null}
      {modalV ? (
        <ModalFailure
          visible={modalV}
          Icon="error"
          name="Enter valid coupun"
          footerName="Please enter a valid coupun"
          onDismiss={() => {
            // setDisable(false);
            setModalV(false);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  addBar: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 35,
    width: "66%",
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  enterAddText: {
    paddingVertical: 11,
    paddingLeft: 20,
    borderColor: Colors.grey3,
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    fontSize: 12,
    fontWeight: "400",
    flex: 1,
  },
  addIcon: {
    backgroundColor: Colors.voilet1,
    minWidth: 48,
    height: 35,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: "center",
  },
  addText: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: "roboto-regular",
  },
  scanWapper: {
    // maxWidth: "25%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  scan: {
    maxWidth: 78,
    borderWidth: 1,
    height: 35,
    borderColor: Colors.grey4,
    borderRadius: 4,
    paddingVertical: 8,
    paddingRight: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  scanText: {
    fontSize: 13,
    color: Colors.grey2,
    fontFamily: "roboto-medium",
    paddingHorizontal: 22,
  },
  totalTitle: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: "roboto-medium",
  },
  totalPoints: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: "roboto-medium",
  },
  contentContainer: {
    flex: 1,
  },
  defaultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  claimsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  submitButton: {
    flex: 1,
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "flex-end",
    maxWidth: 250,
  },
  submitText: {
    color: Colors.white,
    width: "100%",
    textAlign: "center",
    fontFamily: "roboto-regular",
    fontSize: 14,
    fontWeight: "400",
  },
  errorMsg: {
    marginTop: 4,
    fontSize: 10,
    color: Colors.red1,
  },
});
