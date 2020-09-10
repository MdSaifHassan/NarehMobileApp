import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SectionList,
} from "react-native";
import Header from "../../components/Header";
import Container from "../../defaultComponents/Container";
import { ShadowCardWithoutPadding } from "../../defaultComponents/ShadowCard";
import { Colors } from "../../defaultComponents/Colors";
import RoundedDiv from "../../defaultComponents/RoundedDiv";
import { tokenApi } from "../../api/nsl";
import dateFormat from "dateformat";
import VioletDiv from "../../defaultComponents/VioletDiv";
import LoadingScreen from "../../defaultComponents/LoadingScreen";

const PromotionsScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tokenApi().then((resp) =>
      resp
        .post("/v1/promotions/getAll", {})
        .then((res) => {
          setLoading(false);
          console.log(res.data.response.data);
          setData(res.data.response.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
    );
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else
    return (
      <View style={styles.container}>
        <Header title="Promotions" />

        <Container>
          <View>
            {data ? (
              <SectionList
                sections={data}
                keyExtractor={(item, index) => item.promotionId}
                renderItem={({ item }) => {
                  return (
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
                  );
                }}
                renderSectionHeader={({ section }) => (
                  <VioletDiv>{section.category}</VioletDiv>
                )}
              />
            ) : null}
          </View>

          {/* <View style={styles.imageContainer}>
                <Image
                  source={{
                      
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
                    Lorem ipsum dolor sit amet, consetetur
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
                    Start: 22 May to End: 31 July
                  </Text>
                </RoundedDiv>
              </View>
           
          <TouchableOpacity onPress={() => navigation.navigate("PromoDetails")}>
            <ShadowCardWithoutPadding mTop={20}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      "https://d3h2k7ug3o5pb3.cloudfront.net/idoc/xd/2020-07-28/e21d4840-d0fb-11ea-b9a5-cffa928fd9b9.png",
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
                  <Text style={styles.text}>Lorem ipsum dolor sit amet,</Text>
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
                    Start: 22 May to End: 31 July
                  </Text>
                </RoundedDiv>
              </View>
            </ShadowCardWithoutPadding>
          </TouchableOpacity> */}
        </Container>
      </View>
    );
};

export default PromotionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: 180,
    //backgroundColor: "yellow",
  },
  image: {
    height: "100%",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.grey2,
    fontFamily: "roboto-medium",
    lineHeight: 23,
    overflow: "hidden",
    // height: 30,
  },
});
