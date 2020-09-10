import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import SearchBar from "../../defaultComponents/SearchBar";
import { Colors } from "../../defaultComponents/Colors";
import Calendar from "../../components/Calendar";
import { AntDesign } from "@expo/vector-icons";

export const SearchNSort = (props) => {
  return (
    <View style={styles.searchWrapper}>
      <View style={{ width: "66%" }}>
        <SearchBar
          value={props.valueSearch}
          onChangeText={props.onChangeTextSearch}
          onPress={props.onPressSearch}
        />
      </View>
      <View style={styles.sortWapper}>
        <TouchableOpacity style={styles.sort} onPress={props.onPressOpenModal}>
          <Image
            source={require("../../../assets/sort.png")}
            style={styles.arrow}
          />
          <Text>Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const FromToCalendar = (props) => {
  return (
    <View style={styles.dateWrapper}>
      <View style={styles.dateSubWrapper}>
        <Calendar text="From" oneLess calData={props.fromCal} />
      </View>
      <View style={[styles.dateSubWrapper, styles.dateSubWrapperRight]}>
        <Calendar text="To" calData={props.toCal} />
      </View>
    </View>
  );
};

export const OrderCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.idText}>{props.orderId}</Text>
        <Text style={styles.dateText}>{props.orderDate}</Text>
      </View>

      <TouchableOpacity style={styles.rightContainer} onPress={props.onPress}>
        <Text style={styles.pointsText}>{props.orderPoints}</Text>
        <AntDesign name="right" size={15} color={Colors.voilet1} />
      </TouchableOpacity>
    </View>
  );
};

export const OrderCardHeader = (props) => {
  return (
    <View style={styles.headerCardContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.idText}>{props.orderId}</Text>
        <Text style={styles.dateText}>{props.orderDate}</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.qtyText}>Qty: {props.quantity}</Text>
      </View>

      <TouchableOpacity style={styles.rightContainer} onPress={props.onPress}>
        <Text style={styles.pointsText}>{props.orderPoints}</Text>
        {/* <AntDesign name="right" size={15} color={Colors.voilet1} /> */}
      </TouchableOpacity>
    </View>
  );
};

export const OrderDetailsCard = (props) => {
  return (
    <View style={styles.detailsCardContainer}>
      <View
        style={{
          ...styles.orderDetailsCol,
          justifyContent: "space-between",
          paddingBottom: 5,
        }}
      >
        <Text style={styles.itemNameText}>{props.itemName}</Text>
        <Text style={styles.itemStatusText}>{props.itemStatus}</Text>
      </View>

      <View style={styles.orderDetailsCol}>
        <Text style={styles.itemMenuText}>Shipment status</Text>
        <Text style={styles.itemDetailsText}>
          {":   "}
          {props.shipmentStatus}
        </Text>
      </View>

      <View style={styles.orderDetailsCol}>
        <Text style={styles.itemMenuText}>Courier name</Text>
        <Text style={styles.itemDetailsText}>
          {":   "}
          {props.courierName}
        </Text>
      </View>

      <View style={styles.orderDetailsCol}>
        <Text style={styles.itemMenuText}>Awb no</Text>
        <Text style={styles.itemDetailsText}>
          {":   "}
          {props.awbNo}
        </Text>
      </View>

      <View style={styles.orderDetailsCol}>
        <Text style={styles.itemMenuText}>Dispatch date</Text>
        <Text style={styles.itemDetailsText}>
          {":   "}
          {props.dispatchDate}
        </Text>
      </View>

      <View style={styles.orderDetailsCol}>
        <Text style={styles.itemMenuText}>Delivery date</Text>
        <Text style={styles.itemDetailsText1}>
          {":   "}
          {props.deliveryDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    width: "91.46%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
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
    marginTop: 26,
    width: "91.46%",
    alignSelf: "center",
  },
  dateSubWrapper: {
    justifyContent: "center",
  },
  cardContainer: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: Colors.grey3,
    flexDirection: "row",
    width: "100%",
  },
  headerCardContainer: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: Colors.grey2,
    flexDirection: "row",
    width: "100%",
  },
  detailsCardContainer: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: Colors.grey3,
    width: "100%",
  },
  orderDetailsCol: {
    flexDirection: "row",
  },
  leftContainer: { flex: 1 },
  rightContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  idText: {
    fontFamily: "roboto-medium",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.black1,
  },
  dateText: {
    fontFamily: "roboto-regular",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 15,
    color: Colors.black1,
  },
  pointsText: {
    fontFamily: "roboto-bold",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.green1,
    marginRight: 10,
  },
  qtyText: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    fontWeight: "400",
    color: Colors.grey2,
  },
  itemNameText: {
    fontFamily: "roboto-medium",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.black1,
  },
  itemStatusText: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 22,
    color: Colors.black1,
    marginRight: 30,
    opacity: 0.85,
  },
  itemMenuText: {
    fontFamily: "roboto-regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 22,
    color: Colors.grey2,
    opacity: 0.85,
    minWidth: 100,
  },
  itemDetailsText: {
    flex: 1,
    fontFamily: "roboto-regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 22,
    color: Colors.voilet1,
    opacity: 0.85,
  },
  itemDetailsText1: {
    flex: 1,
    fontFamily: "roboto-regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 22,
    color: Colors.green1,
    opacity: 0.85,
  },
});
