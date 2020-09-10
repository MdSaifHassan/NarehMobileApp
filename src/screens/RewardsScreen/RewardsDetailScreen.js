import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  ShadowCard,
  ShadowCardWithoutPadding,
} from "../../defaultComponents/ShadowCard";
import { BottomDivider } from "../../defaultComponents/Divider";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "../../defaultComponents/Colors";
import BackHeader from "../../defaultComponents/BackHeader";
import Container from "../../defaultComponents/Container";
import RowView from "../../defaultComponents/RowView";
import RewardsCard from "./RewardsCard";
import Counter from "../../defaultComponents/Counter";
import Header from "../../components/Header";
import { useScrollToTop } from "@react-navigation/native";
import ModalContent from "../../defaultComponents/ModalFolder/Modal";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { tokenApi } from "../../api/nsl";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";
import { AuthContext } from "../../contexts/AuthContext";

const RewardsDetailScreen = ({ navigation, route }) => {
  const ref = React.useRef(null);
  const scroll = React.createRef();
  // useScrollToTop(ref);
  const item = route.params ? route.params.item : null;
  const CARDS = route.params ? route.params.data : null;

  const { apiState } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [modal1, setModal1] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // const item = data && data.find((each) => each.id === id);

  const cartAddHandler = () => {
    const id = item.rewardID;
    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v1/rewards/addToCart", {
          rewardID: id,
          quantity,
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data.response, "ADDEDTOCART");
          setModal1(true);
          // setData(response.data.response);
        })
        .catch((err) => {
          setLoading(false);
          setModal(true);
          console.log(err.response.data);
        })
    );
  };

  const countHandlerMinus = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(0);
    }
  };
  const countHandlerPlus = () => {
    setQuantity((prev) => prev + 1);
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  return (
    <>
      <BackHeader title="Rewards" />
      <ScrollView ref={scroll}>
        <Container pTop={20} pBottom={20}>
          {item && (
            <ShadowCardWithoutPadding>
              <View style={{ marginBottom: 11 }}>
                <Image
                  source={{
                    uri: item.fullImageURL && item.fullImageURL,
                  }}
                  style={{ height: 192, resizeMode: "contain" }}
                />
              </View>
              <Container pBottom={25}>
                <View>
                  <Text style={[styles.productText, { marginBottom: 8 }]}>
                    {item.rewardDescription}
                  </Text>
                  <Text style={styles.points}>
                    Points Required: {item.rewardPoints}
                  </Text>
                </View>

                <View>
                  <View style={styles.descriptionText}>
                    <Text style={styles.textDetails}>
                      Voucher type: E-voucher
                    </Text>
                    <Text style={styles.text_bottom}>
                      (To be sent to registered email ID)
                    </Text>
                    <Text style={styles.textDetails}>
                      Voucher validity: 1 year
                    </Text>
                    <Text style={styles.textDetails}>
                      SKU: {item.rewardSKU}{" "}
                    </Text>
                    <Text style={styles.textDetails}>
                      Category: {item.rewardCategory}
                    </Text>
                  </View>
                </View>
                {/* <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text>Qty: </Text>
                  <Counter
                    width={24}
                    height={24}
                    radius={24 / 2}
                    minWidth={90}
                    // count={(num) => setQuantity(num)}
                    num={quantity}
                    countHandlerMinus={() => countHandlerMinus()}
                    countHandlerPlus={() => countHandlerPlus()}
                  />
                </View> */}
                <View style={{ marginTop: 22 }}>
                  <Text style={styles.titleTerms}>Terms and Conditions</Text>
                  <Text style={styles.titleTermsC}>{item.rewardTnC}</Text>
                </View>
              </Container>
            </ShadowCardWithoutPadding>
          )}
          {apiState.permissions.cart ? (
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <ButtonFill
                  // onPress={() => navigation.navigate("Cart")}
                  // onPress={() => cartAddHandler()}
                  self="center"
                  width="80%"
                  bgColor={Colors.green1}
                >
                  <Text style={styles.redeemText}>Add to Cart</Text>
                </ButtonFill>
              </View>

              <View style={{ flex: 1 }}>
                <ButtonFill
                  // onPress={() => navigation.navigate("Cart")}
                  self="center"
                  width="80%"
                >
                  <Text style={styles.redeemText}>Redeem</Text>
                </ButtonFill>
              </View>
            </View>
          ) : null}
          {modal1 ? (
            <ModalContent
              visible={modal1}
              onDismiss={() => setModal1(false)}
              name="Book My Show-Winpin"
              footerName="eVouchers Added in your cart"
              btnText="Done"
            />
          ) : modal ? (
            <ModalFailure
              visible={modal}
              onDismiss={() => setModal(false)}
              name="Insufficient balance points to add to cart."
              footerName="You have only 10368 points"
            />
          ) : null}
          {/* <Text style={styles.titleText}>More Reward</Text> */}
          {/* <View>
            <FlatList
              keyExtractor={(item) => item.rewardID}
              data={CARDS}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RewardsDetails", { item });
                    scroll.current.scrollTo({ x: 0, y: 0, animated: true });
                  }}
                >
                  <View
                    style={{ width: 150, marginBottom: 10, marginRight: 10 }}
                  >
                    <RewardsCard
                      smallImageURL={{
                        uri: item.smallImageURL ? item.smallImageURL : null,
                      }}
                      rewardName={item.rewardName}
                      rewardPoints={item.rewardPoints}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View> */}
        </Container>
      </ScrollView>
    </>
  );
};

export default RewardsDetailScreen;

const styles = StyleSheet.create({
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
    paddingBottom: 20,
  },

  points: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.voilet1,
    fontFamily: "roboto-medium",
    paddingBottom: 13,
  },
  redeemText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.white,
    fontFamily: "roboto-regular",
  },
  textDetails: {
    fontSize: 13,
    lineHeight: 23,
    fontFamily: "roboto-bold",
    fontWeight: "400",
    color: Colors.grey2,
  },
  productText: {
    fontSize: 15,
    lineHeight: 21,
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
  pointsTotalText: {
    fontSize: 13,
    lineHeight: 24,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
  },
  text_bottom: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
    marginBottom: 5,
    // lineHeight: 23,
  },
  titleTerms: {
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
  },
  titleTermsC: {
    marginTop: 10,
    fontSize: 11,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
    lineHeight: 20,
  },
});
