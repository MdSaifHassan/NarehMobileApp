import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
//import { HeaderGradient } from "../defaultComponents/GradientColors";
import BackHeader from "../../defaultComponents/BackHeader";
import Container from "../../defaultComponents/Container";
//import { ShadowCardWithoutPadding } from "../defaultComponents/ShadowCard";
import { Colors } from "../../defaultComponents/Colors";
import RoundedDiv from "../../defaultComponents/RoundedDiv";
const PromotionsDetailScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <BackHeader title="Promotions" />
      <ScrollView>
        <Container pTop={20}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item.smallImageURL,
              }}
              style={styles.image}
            />
          </View>

          <View
            style={{
              paddingTop: 12,
              paddingBottom: 15,
              paddingLeft: 4,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.text}>{item.promotionDescription}</Text>
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
                Start: {dateFormat(item.promotionStartDate, "dd mmm")} to End:{" "}
                {dateFormat(item.promotionEndDate, "dd mmm")}
              </Text>
            </RoundedDiv>
            <View style={{ paddingTop: 15 }}>
              <Text style={styles.text1}>{item.promotionDescription}</Text>
            </View>
          </View>
        </Container>
      </ScrollView>
    </View>
  );
};

export default PromotionsDetailScreen;

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
    color: Colors.voilet4,
    fontFamily: "roboto-medium",
    lineHeight: 19,
  },
  text1: {
    fontSize: 13,
    fontWeight: "400",
    color: Colors.grey2,
    fontFamily: "roboto-regular",
    lineHeight: 23,
  },
});
