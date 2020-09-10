import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SectionList,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";

import Header from "../../components/Header";
import { Colors } from "../../defaultComponents/Colors";
import { Item } from "../../components/card/RewardsRedemtionCard";

import BannerCarousel from "./BannerCarousel";
import FourBoxCard from "./FourBoxCard";
import DashboardReferCard from "./DashboardReferCard";
import RewardsRedemtionCard from "../../components/card/RewardsRedemtionCard";
import ProductsTimelineCard from "./ProductsTimelineCard";
import { ProductImageModal } from "../../defaultComponents/ModalFolder/ContentModal";
import { tokenApi } from "../../api/nsl";
import { AuthContext } from "../../contexts/AuthContext";
import { AsyncStorage } from "react-native";

import HTMLView from "react-native-htmlview";

import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { ButtonFill } from "../../defaultComponents/Button";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useIsFocused } from "@react-navigation/native";
import { ShadowCardWithoutPadding } from "../../defaultComponents/ShadowCard";
import RoundedDiv from "../../defaultComponents/RoundedDiv";
import dateFormat from "dateformat";

const DashboardScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [modal, setModal] = useState(false);
  const [banners, setBanners] = useState(null);
  const { loginState, apiContext, apiState } = React.useContext(AuthContext);
  const [currentItem, setCurrentItem] = useState();
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [address_required, setAddressRequired] = useState();

  const isfocused = useIsFocused();

  // useEffect(() => {
  //   if (route.params?.address) {
  //     console.log(route.params?.address);
  //     setAddressRequired(true);
  //   }
  // }, [isfocused]);

  useEffect(() => {
    apiContext.request();
    tokenApi()
      .then((res) =>
        res
          .post("/v1/members/dashboard")
          .then((response) => {
            setAddressRequired(response.data.response.address_required);
            if (address_required) {
              return navigation.navigate("Create");
            }
            console.log(response.data.response);
            setData(response.data.response);
            setBanners(response.data.response.banners);
            setProducts(response.data.response.products);
            setRewards(response.data.response.rewards);
            setPromotions(response.data.response.promotions);
            apiContext.success(response.data.response.permissions);
            // setPermissions(response.data.response.permissions);
          })
          .catch((err) => {
            console.log(err.response.data);
            apiContext.failure(err);
          })
      )
      .catch((err) => console.log(err));
  }, [isfocused]);
  //console.log("BANNERS", banners);
  const arrow = "\u003E";
  let button = null;
  if (data && data.totalMembers) {
    button = (
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "92%",
          marginBottom: 20,
          backgroundColor: Colors.grey11,
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontFamily: "roboto-bold",
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          Get your member list:
        </Text>
        <ButtonFill
          radius={3}
          onPress={() => navigation.navigate("MembersList")}
        >
          <Text style={{ color: Colors.white }}>Members</Text>
        </ButtonFill>
      </View>
    );
  }
  if (apiState.loading) {
    return <LoadingScreen />;
  } else
    return (
      <View style={styles.container}>
        <Header
          title={
            loginState.userName !== null ? `Hi ${loginState.userName}` : "Hi"
          }
        />

        <ScrollView>
          {banners && banners.length > 0 ? (
            <BannerCarousel
              link={(banner_link, banner_type) => {
                banner_type === "internal"
                  ? navigation.navigate(banner_link)
                  : Linking.openURL(banner_link);
              }}
              banner={banners && banners}
            />
          ) : null}

          <View
            style={{
              ...styles.fourBoxCardContainer,
              marginTop: banners && banners.length === 0 ? 20 : -30,
            }}
          >
            {!apiState.permissions.members ? (
              <FourBoxCard
                eligiblePoints={data ? data.eligible_points : "0"}
                actualPoints={data ? data.earn_points : "0"}
                redeemPoints={data ? data.redeem_points : "0"}
                cartPoints={data ? data.cart_points : "0"}
              />
            ) : (
              <FourBoxCard
                totalMembers={data ? data.totalMembers : "0"}
                eligiblePoints={data ? data.eligible_points : "0"}
                redeemPoints={data ? data.redeem_points : "0"}
                actualPoints={data ? data.earn_points : "0"}
              />
            )}
          </View>

          <View style={styles.referCard}>
            <DashboardReferCard onPress={() => navigation.navigate("Refer")} />
          </View>

          {data && rewards != [] ? (
            // <RewardsRedemtionCard
            //   title="Rewards Redemption"
            //   rightTitle="View all"
            //   onPress={() => navigation.navigate("Rewards")}
            //   onPress1={() => navigation.navigate("Redemptions")}
            // />
            <View style={styles.rewardsContainer}>
              <View style={styles.titleContainer}>
                <View>
                  <Text style={styles.title}>Rewards</Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Rewards")}
                  style={styles.viewButton}
                >
                  <Text style={styles.view}>View all {arrow}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={rewards}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          const id = item.rewardID;
                          const data = rewards;
                          // setcurrentId(id);
                          console.log("REWARDID", id);
                          navigation.navigate("RewardsDetails", {
                            item,
                            data,
                          });
                        }}
                      >
                        <Item
                          image={item.smallImageURL}
                          title={item.rewardName}
                          //price={item.price}
                          points={item.rewardPoints}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.rewardID}
                  horizontal
                />
              </View>
            </View>
          ) : (
            <View style={{ height: 40 }}></View>
          )}

          {data && products !== []
            ? products.map((item, index) => (
                <View key={index} style={styles.productsTimeline}>
                  <ProductsTimelineCard
                    title={item.productTitle}
                    info={item.productInfo}
                    imageURL={{ uri: item.imageURL }}
                    onPress={() => {
                      setCurrentItem(index);
                      setModal(true);
                    }}
                    productPage={() => navigation.navigate("Products")}
                  />
                </View>
              ))
            : null}
          {data && promotions !== []
            ? promotions.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PromoDetails", {
                        item,
                      })
                    }
                  >
                    <ShadowCardWithoutPadding mTop={20}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{
                            uri: item.imageURL,
                          }}
                          style={styles.image}
                        />
                      </View>

                      <View
                        style={{
                          paddingTop: 12,
                          paddingBottom: 18,
                          paddingLeft: 16,
                        }}
                      >
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.text}>
                            {item.promotionDescription}
                          </Text>
                        </View>
                        <RoundedDiv width="50%">
                          <Text
                            style={{
                              ...styles.text,
                              color: Colors.voilet4,
                              fontSize: 11,
                              textAlign: "center",
                            }}
                          >
                            Start:
                            {dateFormat(item.promotionStartDate, "dd mmm")} to
                            End: {dateFormat(item.promotionEndDate, "dd mmm")}
                          </Text>
                        </RoundedDiv>
                      </View>
                    </ShadowCardWithoutPadding>
                  </TouchableOpacity>
                </View>
              ))
            : null}

          {/* <View style={styles.productTitleContainer}>
            <Text style={styles.productMainTitle}>Products</Text>
          </View>
          {data && products ? (
            <View style={styles.productsTimeline}>
              <ProductsTimelineCard
                title={products[0].productTitle}
                info={products[0].productInfo}
                imageURL={{ uri: products[0].imageURL }}
                productPage={() => navigation.navigate("Products")}
                onPress={() => setModal(true)}
              />
            </View>
          ) : null} */}
          {/* {data && promotions !== [] ? (
            <>
            <View style={styles.productTitleContainer}>
            <Text style={styles.productMainTitle}>Promotions</Text>
          </View>
            <View style={styles.productsTimeline}>
              <ProductsTimelineCard
                title={promotions[0].productTitle}
                info={promotions[0].productInfo}
                imageURL={{ uri: promotions[0].imageURL }}
                productPage={() => navigation.navigate("Promotions")}
                onPress={() => setModal(true)}
              />
            </View>
            </>
          ) : (
            <Text>No promotions</Text>
          )} */}
        </ScrollView>
        {modal ? (
          <ProductImageModal
            visible={modal}
            onDismiss={() => {
              setCurrentItem();
              setModal(false);
            }}
          >
            {/* <Image
              style={{ alignSelf: "center", maxWidth: "95%" }}
              source={require("../../../assets/ios1x_NoPath8.png")}
            /> */}
            <Image
              //style={{ alignSelf: "center", maxWidth: "95%" }}
              style={{ width: 100, height: 100, alignSelf: "center" }}
              source={{ uri: products[currentItem].smallImageURL }}
            />

            {/* <Text style={styles.ModalTitle}> Product Name </Text> */}
            <Text style={styles.ModalTitle}>
              {products[currentItem].productTitle}
            </Text>
            {/* <Text style={styles.Description}> */}
            {/* Lorem ipsum dolor sit amet, consetetur */}
            {/* {products[0].productDescription} */}
            {/* </Text> */}
            <HTMLView
              value={products[currentItem].productDescription}
              stylesheet={styles}
            />
          </ProductImageModal>
        ) : null}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fourBoxCardContainer: {
    alignItems: "center",
  },
  referCard: {
    marginTop: 20,
  },
  productTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "91.46%",
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  productMainTitle: {
    fontFamily: "roboto-medium",
    fontSize: 14,
    color: Colors.grey2,
  },
  ModalTitle: {
    fontSize: 16,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.voilet1,
    marginTop: 16,
    alignSelf: "center",
  },
  Description: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
    lineHeight: 18,
    marginTop: 16,
    alignSelf: "center",
    textAlign: "center",
  },
  li: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey2,
    lineHeight: 18,
    // marginTop: 16,
    // alignSelf: "center",
    // textAlign: "left",
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

    justifyContent: "space-between",
    flexDirection: "column-reverse",
  },
  image: {
    height: 80,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "91.46%",
    marginTop: 30,
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
  rewardsContainer: {
    // marginTop: 20,
  },
});

export default DashboardScreen;
