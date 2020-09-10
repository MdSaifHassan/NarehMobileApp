import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import ReferCard from "./ReferCard";
import Header from "../../components/Header";
import Refer_History from "./Refer_History";
import { Colors } from "../../defaultComponents/Colors";
import { showModal } from "../../defaultComponents/ModalFolder/Modal";
import Modal_3 from "../../defaultComponents/ModalFolder/BottomModal";
import ContentModal, {
  ModalDelete,
  ModalSucess,
  ModalFailure,
  Sucess,
} from "../../defaultComponents/ModalFolder/ContentModal";
import { tokenApi } from "../../api/nsl";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import dateFormat from "dateformat";

const Refer_Retailer = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  useEffect(() => {
    tokenApi().then((res) =>
      res
        .post("/v1/members/listReferrals", {
          perPage: "100",
          page: "1",
        })
        .then((response) => {
          setLoading(false);
          setData(response.data.response.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
    );
  }, []);

  const addHandler = (data) => {
    console.log("good", data);
    if (data === "Success") {
      setLoading(true);
      tokenApi().then((res) =>
        res
          .post("/v1/members/listReferrals", {
            perPage: "100",
            page: "1",
          })
          .then((response) => {
            setLoading(false);
            setData(response.data.response.data);
            console.log(response.data.response.data);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          })
      );
      setModal(true);
    } else {
      setModal1(true);
    }
  };

  console.log(data ? data.length : "1");

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }
  return (
    <View style={styles.MainContainer}>
      <Header title="Refer Retailer" />
      {/* <View style={styles.ScrollView}> */}
      <View style={{ marginBottom: 20 }}>
        <ReferCard onPress={(data) => addHandler(data)} />
      </View>
      {/* </View> */}
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Refer History</Text>
      </View>
      {loadingScreen}
      <View style={styles.ScrollView}>
        {data ? (
          <FlatList
            ListEmptyComponent={
              <Text style={{ marginTop: 30, textAlign: "center" }}>
                You haven't referred anyone
              </Text>
            }
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Refer_History
                name={item.referralName}
                mobile={item.referralMobile}
                date={dateFormat(item.referredDate, "dd mmm yyyy")}
              />
            )}
          />
        ) : (
          <Text>No history</Text>
        )}
      </View>

      {modal ? (
        <Sucess
          Icon="md-done-all"
          name="Thank you"
          number="SN000101"
          footerName="for your referral, we will connect ASAP"
          visible={modal}
          onDismiss={() => setModal(false)}
        />
      ) : null}
      {modal1 ? (
        <ModalFailure
          Icon="error"
          name="Sorry"
          footerName="Mobile number is already registered "
          visible={modal1}
          onDismiss={() => setModal1(false)}
        />
      ) : null}
    </View>
  );
};

export default Refer_Retailer;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  ScrollView: {
    width: "91.46%",
    alignSelf: "center",
    paddingBottom: 15,
    flex: 1,
  },
  Header: {
    //height: 34,
    paddingVertical: 8,
    backgroundColor: Colors.voilet5,
    // marginTop: 30,
    justifyContent: "center",
  },
  HeaderText: {
    width: "91.46%",
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    lineHeight: 22,
    alignSelf: "center",
    color: Colors.white,
  },
});

//   <ModalSucess
//     Icon="md-done-all"
//     name="Thank you"
//     number="000101"
//     footerName="is simply dummy text of the printing and hello"
//     Footerfasttext=" Your Claim of Point "
//     Footerlasttext="onehello bdh"
//     visible={modal}
//     onDismiss={() => setModal(false)}
//   />
// ):
// <ModalDelete
//   Icon="delete-forever"
//   name="Thank you"
//   footerName=" the printing and hello"
//   visible={modal}
//   onDismiss={() => setModal(false)}
// />
