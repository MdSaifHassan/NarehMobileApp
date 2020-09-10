import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ShadowCardWithoutPadding } from "../../defaultComponents/ShadowCard";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext } from "../../contexts/AuthContext";

const RewardsCard = (props) => {
  const { apiState } = useContext(AuthContext);
  return (
    <ShadowCardWithoutPadding>
      <Image
        style={{ height: 80, resizeMode: "contain" }}
        source={props.smallImageURL}
      />

      <View style={styles.textContainer}>
        <Text style={styles.boxTitle}>{props.rewardName} </Text>
        {/* <Text style={styles.price}>Rs 1500 (E-Voucher)</Text> */}
        <Text style={styles.points}>Points Required:{props.rewardPoints}</Text>
      </View>
      <View style={{ alignSelf: "center", marginTop: 15 }}>
        {apiState.permissions.cart ? (
          <ButtonFill onPress={props.onPress}>
            <Text style={styles.btnText}>ADD TO CART</Text>
          </ButtonFill>
        ) : null}
      </View>
    </ShadowCardWithoutPadding>
  );
};

export default RewardsCard;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 11,
    fontWeight: "400",
    color: Colors.white,
    fontFamily: "roboto-regular",
  },
  textContainer: {
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  boxTitle: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    color: Colors.black2,
    marginTop: 5,
    overflow: "hidden",
    height: 18,
    marginRight: 10,
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
