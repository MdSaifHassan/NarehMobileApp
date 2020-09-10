import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { ShadowCard } from "../../defaultComponents/ShadowCard";
import { BottomDivider } from "../../defaultComponents/Divider";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "../../defaultComponents/Colors";
import BackHeader from "../../defaultComponents/BackHeader";
import Container from "../../defaultComponents/Container";
import RowView from "../../defaultComponents/RowView";
import { HeaderGradient } from "../../defaultComponents/HeaderGradient";

const CheckOutScreen = ({ navigation }) => {
  return (
    <>
      <BackHeader title="Checkout" />

      <ScrollView>
        <Container pTop={14}>
          <HeaderGradient height={110} radius={6}>
            <View style={styles.banner}>
              <View style={styles.leftIcon}>
                <Image source={require("../../../assets/DoneIcon.png")} />
              </View>
              <View style={styles.rightText}>
                <Text
                  style={{
                    ...styles.redeemText,
                    fontSize: 15,
                    paddingBottom: 11,
                  }}
                >
                  Congratulation!
                </Text>
                <Text
                  style={{ ...styles.redeemText, fontSize: 13, lineHeight: 20 }}
                >
                  You have successfully claimed the offer
                </Text>
              </View>
            </View>
          </HeaderGradient>
          <View style={{ marginTop: 25 }}>
            <Text style={styles.order}>Order Summary</Text>
          </View>

          <ShadowCard mTop={14}>
            <RowView mBot={8}>
              <View style={{ maxWidth: "70%" }}>
                <Text style={styles.productText}>
                  Book My Show-Winpin eVouchers
                </Text>
                <Text style={[styles.productText, { marginBottom: 8 }]}>
                  Rs 1000 (E-voucher)
                </Text>
                <Text style={styles.points}>Points Required: 625</Text>
              </View>
              <View
                style={{
                  maxWidth: "50%",
                  alignItems: "flex-end",
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://d3h2k7ug3o5pb3.cloudfront.net/idoc/xd/2020-07-28/52243f10-d0fa-11ea-b9a5-cffa928fd9b9.png",
                  }}
                  style={{ width: 85, height: 65 }}
                />
              </View>
            </RowView>
            <RowView>
              <View style={{ width: "75%" }}>
                <View style={styles.descriptionText}>
                  <Text style={styles.textDetails}>
                    Voucher type: E-voucher{" "}
                  </Text>
                  <Text style={styles.textDetails}>
                    Voucher validity: 1 year{" "}
                  </Text>
                  <Text style={styles.textDetails}>SKU: 20020157 </Text>
                  <Text style={styles.textDetails}>
                    Category: Online Shopping Vouchers
                  </Text>
                </View>
              </View>
            </RowView>
          </ShadowCard>

          <ShadowCard mTop={14}>
            <Text style={styles.titleText}>Points Details</Text>
            <BottomDivider />
            <RowView mTop={12}>
              <View>
                <Text style={styles.pointsText}>Points (2 Items)</Text>
              </View>
              <View>
                <Text style={styles.pointsText}>1250</Text>
              </View>
            </RowView>
            <RowView mTop={12}>
              <View>
                <Text style={styles.pointsText}>Delivery</Text>
              </View>
              <View>
                <Text style={styles.pointsText}>Free</Text>
              </View>
            </RowView>
            <RowView mTop={12}>
              <View>
                <Text style={styles.pointsTotalText}>Total points</Text>
              </View>
              <View>
                <Text style={styles.pointsTotalText}>1250</Text>
              </View>
            </RowView>
          </ShadowCard>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginVertical: 30,
            }}
          >
            <ButtonFill
              onPress={() => navigation.navigate("Rewards")}
              self={"center"}
            >
              <Text style={styles.redeemText}>Go to Reward</Text>
            </ButtonFill>
          </View>
        </Container>
      </ScrollView>
    </>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  order: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.grey2,
    fontFamily: "roboto-medium",
    lineHeight: 24,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.grey2,
    fontFamily: "roboto-medium",
    lineHeight: 24,
    paddingVertical: 9,
  },

  deliverText: {
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: "400",
    color: Colors.grey2,
    fontFamily: "roboto-regular",
    lineHeight: 16,
  },
  nameText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black4,
    fontFamily: "roboto-medium",
    lineHeight: 17,
  },
  descriptionText: {
    fontSize: 11,
    fontWeight: "400",
    color: Colors.black4,
    fontFamily: "roboto-regular",
    lineHeight: 17,
    paddingBottom: 16,
  },
  btnText: {
    fontSize: 11,
    fontWeight: "400",
    color: Colors.white,
    fontFamily: "roboto-regular",
  },
  points: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.voilet1,
    fontFamily: "roboto-medium",
  },
  redeemText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.white,
    fontFamily: "roboto-regular",
  },
  banner: {
    flexDirection: "row",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  leftIcon: {
    justifyContent: "center",
    marginRight: 20,
  },
  rightText: {
    width: "54%",

    justifyContent: "center",
  },
  textDetails: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
  },
  productText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
  },
  pointsTotalText: {
    fontSize: 13,
    lineHeight: 24,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
  },
  pointsText: {
    fontSize: 13,
    lineHeight: 24,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey9,
  },
});
