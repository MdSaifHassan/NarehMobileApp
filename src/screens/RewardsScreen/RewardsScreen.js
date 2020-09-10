import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BackHeader from "../../defaultComponents/BackHeader";
import SortButton from "../../defaultComponents/SortButton";
import Container from "../../defaultComponents/Container";
import {
  ShadowCard,
  ShadowCardWithoutPadding,
} from "../../defaultComponents/ShadowCard";
import RowView from "../../defaultComponents/RowView";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "../../defaultComponents/Colors";
//import { ModalCenter } from "../defaultComponents/Modal";
import SortModalContent from "../../defaultComponents/SortModal";
import ModalContent from "../../defaultComponents/ModalFolder/Modal";
import { SortModal } from "../../defaultComponents/ModalFolder/sortModal";
import Header from "../../components/Header";
import { tokenApi } from "../../api/nsl";
import RewardsCard from "./RewardsCard";
import LoadingScreen from "../../defaultComponents/LoadingScreen";

const RewardsScreen = ({ navigation, route }) => {
  const [modal1, setModal1] = useState(false);
  const [option, setOption] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // loading = true
  const [currentId, setcurrentId] = useState();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    tokenApi().then((res) =>
      res
        .post("/v1/rewards/getAll")
        .then((response) => {
          setLoading(false); //loading = false
          console.log(response.data.response);
          setData(response.data.response); // data = res.data.res
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
        })
    );
  }, []);

  const pressHandler = (item) => {
    const id = item.rewardID;
    // setcurrentId(id);
    console.log("REWARDID", id, data);
    navigation.push("RewardsDetails", {
      item,
      data,
    });
  };

  const cartAddHandler = (item) => {
    const id = item.rewardID;
    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v1/rewards/addToCart", {
          rewardID: id,
          quantity: 1,
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data.response);
          setModal1(true);
          // setData(response.data.response);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
        })
    );
  };
  const openModal = () => {
    setModal(!modal);
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Header title="Rewards" />

      <View style={styles.container}>
        <Container>
          {/* <View style={styles.sortWapper}>
            <TouchableOpacity style={styles.sort} onPress={openModal}>
              <Image
                source={require("../../../assets/sort.png")}
                style={styles.arrow}
              />
              <Text>Sort</Text>
            </TouchableOpacity>
          </View> */}

          {data ? (
            <FlatList
              keyExtractor={(item, index) => item.rewardID}
              data={data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => pressHandler(item)}
                    style={{ width: "48%", marginBottom: 10 }}
                  >
                    {item.smallImageURL ? (
                      <RewardsCard
                        smallImageURL={{
                          uri: item.smallImageURL,
                        }}
                        rewardName={item.rewardName}
                        rewardPoints={item.rewardPoints}
                        onPress={() => {
                          cartAddHandler(item);
                        }}
                      />
                    ) : (
                      <RewardsCard
                        rewardName={item.rewardName}
                        rewardPoints={item.rewardPoints}
                        onPress={() => {
                          cartAddHandler(item);
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          ) : (
            <Text>No rewards to show</Text>
          )}
        </Container>
      </View>

      {modal1 ? (
        <ModalContent
          visible={modal1}
          onDismiss={() => setModal1(false)}
          name="Book My Show-Winpin"
          footerName="eVouchers Added in your cart"
          btnText="Done"
        />
      ) : null}
      {/* {modal ? (
        <SortModal
          button={(value) => setRadioValue(value)}
          visible={modal}
          onDismiss={() => {
            setLoading(true);
            apiCall();
            setModal(false);
          }}
        />
      ) : null} */}
    </>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    //backgroundColor: "blue",
  },
  sort: {
    alignItems: "flex-end",
    //backgroundColor: "yellow",
  },
  image: {
    minHeight: 220,
    width: 100,
  },
  cardList: {
    flex: 1,
  },
  btnText: {
    color: Colors.white,
    fontSize: 11,
    fontFamily: "roboto-regular",
    fontWeight: "400",
  },
  image: {
    height: 80,
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
  sortWapper: {
    width: "23%",
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    marginBottom: 10,
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
});
{
  /* <View style={styles.sort}>
            <SortButton onPress={openModal} />
          </View> */
}
{
  /* <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <RowView mTop={15}>
                <ShadowCardWithoutPadding width="48%">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RewardsDetails");
                    }}
                  >
                    <View
                      style={
                        {
                          // backgroundColor: "yellow",
                        }
                      }
                    >
                      <Image
                        style={{ height: 100 }}
                        source={{
                          uri:
                            "https://d3h2k7ug3o5pb3.cloudfront.net/idoc/xd/2020-07-28/4fec5070-d0fa-11ea-b9a5-cffa928fd9b9.png",
                        }}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.boxTitle}>
                          Book My Show-Winpin eVouchers
                        </Text>
                        <Text style={styles.price}>Rs 1500 (E-Voucher)</Text>
                        <Text style={styles.points}>
                          Points Required: 2,000
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignSelf: "center", marginTop: 15 }}>
                    <ButtonFill
                      onPress={() => {
                        setModal1(true);
                      }}
                    >
                      <Text style={styles.btnText}>ADD TO CART</Text>
                    </ButtonFill>
                  </View>
                </ShadowCardWithoutPadding>

                <ShadowCardWithoutPadding width="48%">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RewardsDetails");
                    }}
                  >
                    <Image
                      style={{ height: 100 }}
                      source={{
                        uri:
                          "https://d3h2k7ug3o5pb3.cloudfront.net/idoc/xd/2020-07-28/4fec5070-d0fa-11ea-b9a5-cffa928fd9b9.png",
                      }}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.boxTitle}>
                        Book My Show-Winpin eVouchers
                      </Text>
                      <Text style={styles.price}>Rs 1500 (E-Voucher)</Text>
                      <Text style={styles.points}>Points Required: 2,000</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignSelf: "center", marginTop: 15 }}>
                    <ButtonFill
                      onPress={() => {
                        setModal1(true);
                      }}
                    >
                      <Text style={styles.btnText}>ADD TO CART</Text>
                    </ButtonFill>
                  </View>
                </ShadowCardWithoutPadding>
              </RowView>
              <RowView mTop={15}>
                <ShadowCardWithoutPadding width="48%">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RewardsDetails");
                    }}
                  >
                    <Image
                      style={{ height: 100 }}
                      source={{
                        uri:
                          "https://d3h2k7ug3o5pb3.cloudfront.net/idoc/xd/2020-07-28/4fec5070-d0fa-11ea-b9a5-cffa928fd9b9.png",
                      }}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.boxTitle}>
                        Book My Show-Winpin eVouchers
                      </Text>
                      <Text style={styles.price}>Rs 1500 (E-Voucher)</Text>
                      <Text style={styles.points}>Points Required: 2,000</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignSelf: "center", marginTop: 15 }}>
                    <ButtonFill
                      onPress={() => {
                        setModal1(true);
                      }}
                    >
                      <Text style={styles.btnText}>ADD TO CART</Text>
                    </ButtonFill>
                  </View>
                </ShadowCardWithoutPadding>
                <ShadowCardWithoutPadding width="48%">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RewardsDetails");
                    }}
                  >
                    <Image
                      style={{ height: 100 }}
                      source={{
                        uri:
                          "https://d3h2k7ug3o5pb3.cloudfront.net/idoc/xd/2020-07-28/4fec5070-d0fa-11ea-b9a5-cffa928fd9b9.png",
                      }}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.boxTitle}>
                        Book My Show-Winpin eVouchers
                      </Text>
                      <Text style={styles.price}>Rs 1500 (E-Voucher)</Text>
                      <Text style={styles.points}>Points Required: 2,000</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignSelf: "center", marginTop: 15 }}>
                    <ButtonFill
                      onPress={() => {
                        setModal1(true);
                      }}
                    >
                      <Text style={styles.btnText}>ADD TO CART</Text>
                    </ButtonFill>
                  </View>
                </ShadowCardWithoutPadding>
              </RowView>
            </View> */
}

{
  /* {modal ? (
        <SortModal
          button={(value) => setOption(value)}
          visible={modal}
          onDismiss={() => setModal(false)}
        />
      ) : null} */
}
