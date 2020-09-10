import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonFill } from "../../defaultComponents/Button";
import Header from "../../components/Header";
import {
  SearchNSort,
  FromToCalendar,
  OrderCard,
} from "./RedemptionHistoryComponents";
import { Colors } from "../../defaultComponents/Colors";
import Container from "../../defaultComponents/Container";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";

const RedemptionHistoryScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [search, setSearch] = useState("");

  const [modalV, setModalV] = useState(false); // error modal just enter this - setModalV(true);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Redemption History" />

      <SearchNSort
      // valueSearch
      // onChangeTextSearch
      // onPressSearch
      // onPressOpenModal
      />

      <FromToCalendar
        fromCal={(CalIn) => setValue(CalIn)}
        toCal={(a) => setValue1(a)}
      />

      <View style={styles.cardContainer}>
        <Container>
          <OrderCard
            orderId="Order Id"
            orderDate="29 May 2020"
            orderPoints={1160}
            onPress={() => navigation.navigate("RedemptionsDetails")}
          />
        </Container>
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

export default RedemptionHistoryScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
});
