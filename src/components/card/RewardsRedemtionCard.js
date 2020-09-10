import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import BookMyShow from "../../../assets/ios1x_NoPath.png";

import { Colors } from "../../defaultComponents/Colors";
// import RewardsItemBox from "./RewardsItemBox";

const arrow = "\u003E";

const DATA = [
  {
    image: require("../../../assets/ios1x_NoPath.png"),
    title: "Book My Show-Winpin eVouchers",
    price: "1500 (E-Voucher)",
    points: "2,000",
  },
  {
    image: require("../../../assets/ios1x_NoPath.png"),
    title: "Book My Show-Winpin eVoucher",
    price: "1500 (E-Voucher)",
    points: "2,000",
  },
  {
    image: require("../../../assets/ios1x_NoPath.png"),
    title: "Book My Show-Winpin eVouche",
    price: "1500 (E-Voucher)",
    points: "2,000",
  },
  {
    image: require("../../../assets/ios1x_NoPath.png"),
    title: "Book My Show-Winpin eVouch",
    price: "1500 (E-Voucher)",
    points: "2,000",
  },
];

export function Item({ image, title, price, points }) {
  return (
    <View>
      {image ? (
        <Image
          resizeMethod="auto"
          style={styles.image}
          source={{ uri: image }}
        />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.boxTitle}>{title}</Text>
        {/* <Text style={styles.price}>Rs {price}</Text> */}
        <Text style={styles.points}>Points Required: {points}</Text>
      </View>
    </View>
  );
}

const RewardsRedemtionCard = ({ onPress, onPress1, title, rightTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity onPress={onPress} style={styles.viewButton}>
          <Text style={styles.view}>
            {rightTitle} {arrow}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={DATA}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={onPress1}>
                <Item
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  points={item.points}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.title}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "91.46%",
    alignSelf: "center",
  },
  title: {
    fontFamily: "roboto-medium",
    fontSize: 14,
    color: Colors.grey2,
  },
  view: {
    fontFamily: "roboto-medium",
    fontSize: 11,
    color: Colors.grey2,
  },
  flatlistContainer: {
    minHeight: 171,
  },

  itemContainer: {
    width: 150,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 4,
    elevation: 3,
    shadowColor: Colors.grey1,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    height: 80,
    resizeMode: "contain",
  },
  textContainer: {
    justifyContent: "space-between",
    paddingLeft: 3,
  },
  boxTitle: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    color: Colors.black2,
    marginTop: 5,
  },
  price: {
    fontFamily: "roboto-regular",
    fontSize: 10,
    color: Colors.black2,
    marginTop: 5,
  },
  points: {
    fontFamily: "roboto-regular",
    fontSize: 10,
    color: Colors.voilet1,
    marginVertical: 5,
  },
});

export default RewardsRedemtionCard;
