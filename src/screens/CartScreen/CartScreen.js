import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import BackHeader from "../../defaultComponents/BackHeader";
import Container from "../../defaultComponents/Container";
import RowView from "../../defaultComponents/RowView";
import { Modal_3 } from "../../defaultComponents/ModalFolder/BottomModal";
import { ShadowCard } from "../../defaultComponents/ShadowCard";
import { BottomDivider } from "../../defaultComponents/Divider";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "../../defaultComponents/Colors";
import Counter from "../../defaultComponents/Counter";
import { tokenApi } from "../../api/nsl";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";
//import { ModalCenter } from "../defaultComponents/Modal";

const CartScreen = ({ navigation }) => {
  const { apiState } = useContext(AuthContext);
  const [num, setNum] = useState(1);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  //const [newData, setNewData] = useState([])

  const [loading, setLoading] = useState(false);
  const [totalCartValue, setTotalCartValue] = useState(null);

  useEffect(() => {
    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v1/rewards/cartItems")
        .then((response) => {
          setLoading(false);
          setData(response.data.response.items);

          setTotalCartValue(response.data.response.cartTotal);
          console.log(response.data.response, "CARTITEMS");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
        })
    );
  }, []);

  let dataCopy = [];
  if (data !== []) {
    dataCopy = data.map((each) => ({ ...each, items: 1 }));
  }

  const name = <Text style={styles.nameText}>John Doe </Text>;
  let quantity = 1;

  console.log("DataCopy", dataCopy);
  const countHandlerMinus = (index) => {
    console.log(dataCopy[index], "Current data");
    if (num > 0) {
      dataCopy[index].items--;
      setNum((prevNum) => prevNum - 1);
    } else {
      setNum(0);
    }
  };
  const countHandlerPlus = (index) => {
    console.log(dataCopy[index].items, "----INDEX");
    console.log(dataCopy);
    dataCopy[index].items = dataCopy[index].items + 1;
    dataCopy = [...dataCopy];
  };

  const pressHandler = () => {
    let availBalance = eval(
      parseFloat(apiState.earnPoints) - parseFloat(totalCartValue)
    );
    console.log(availBalance, "NetPoints");
    if (totalCartValue < availBalance) {
      navigation.navigate("CheckOut");
    } else {
      setModal1(true);
    }
  };

  const RenderItem = ({ item, index }) => {
    return (
      <ShadowCard mTop={14}>
        <RowView mBot={8}>
          <View style={{ maxWidth: "70%" }}>
            <Text style={styles.productText}>{item.rewardName}</Text>
            {/* <Text style={[styles.productText, { marginBottom: 8 }]}>
                  Rs 1000 (E-voucher)
                </Text> */}
            <Text style={styles.points}>
              Points Required: {item.rewardPoints}{" "}
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
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
          <View
            style={{
              maxWidth: "70%",
              paddingRight: 5,
            }}
          >
            <View style={styles.descriptionText}>
              <Text style={styles.textDetails}>Voucher type: E-voucher</Text>
              <Text style={styles.text_bottom}>
                (To be sent to registered email ID)
              </Text>
              <Text style={styles.textDetails}>Voucher validity: 1 year</Text>
              <Text style={styles.textDetails}>SKU: {item.rewardSKU} </Text>
              <Text style={styles.textDetails}>
                Category: {item.rewardCategory}
              </Text>
            </View>
          </View>

          <View
            style={{
              minWidth: 85,
              alignSelf: "center",
              minHeight: 55,
              justifyContent: "space-between",
            }}
          >
            <Text>Qty:</Text>
            <Counter
              countHandlerMinus={() => countHandlerMinus(index)}
              countHandlerPlus={() => countHandlerPlus(index)}
              num={item.items}
            />
          </View>
        </RowView>
        <Text>Total Item(s): {num} </Text>
        <Text>Total Points: {eval(parseFloat(item.cartValue) * num)} </Text>
      </ShadowCard>
    );
  };

  const colorSelect = () => {
    let balancePoints = eval(
      parseFloat(apiState.earnPoints) - parseFloat(totalCartValue)
    );
    if (balancePoints > 0) {
      return Colors.grey2;
    } else {
      return Colors.red1;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (apiState.earnPoints) {
    console.log(apiState.earnPoints, "APICONTEXT");
  }

  return (
    <>
      <BackHeader title="Cart" />

      <ScrollView>
        <Container>
          <ShadowCard mTop={14}>
            <Text style={styles.titleText}>Delivery Address</Text>
            <BottomDivider />
            <Text style={styles.deliverText}>Deliver to {name} </Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt .... labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </Text>
            <ButtonFill onPress={() => setModal(true)}>
              <Text style={styles.btnText}>Change or Add Address</Text>
            </ButtonFill>
          </ShadowCard>

          {/* {data ? (
            <FlatList
              keyExtractor={(item) => item.rewardID}
              data={data}
              renderItem={renderItem}
            />
          ) : null} */}
          {data
            ? dataCopy.map((item, index) => (
                <RenderItem index={index} item={item} key={item.rewardID} />
              ))
            : null}

          <ShadowCard mTop={14} mBot={14}>
            <RowView aItems="center">
              {apiState.earnPoints && totalCartValue ? (
                <Text style={{ ...styles.productText, color: colorSelect() }}>
                  Balance Points:{" "}
                  {eval(
                    parseFloat(apiState.earnPoints) - parseFloat(totalCartValue)
                  )}{" "}
                </Text>
              ) : null}
              <ButtonFill onPress={pressHandler}>
                <Text style={styles.redeemText}>Redeem</Text>
              </ButtonFill>
            </RowView>
          </ShadowCard>
          {modal1 ? (
            <ModalFailure
              visible={modal1}
              onDismiss={() => setModal1(false)}
              name="You have insufficent balance."
              footerName="Claim points to redeem"
            />
          ) : null}
        </Container>
      </ScrollView>
      {modal ? (
        <Modal_3
          visible={modal}
          onDismiss={() => setModal(false)}
          onPress={() => setModal(false)}
          navigation={navigation}
        />
      ) : null}
    </>
  );
};

export default CartScreen;

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
  text_bottom: {
    fontSize: 10,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey1,
    marginBottom: 5,
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
});

{
  /* <ShadowCard mTop={14}>
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
          </ShadowCard> */
}
