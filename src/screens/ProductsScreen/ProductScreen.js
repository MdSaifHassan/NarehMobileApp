import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ShadowCard } from "../../defaultComponents/ShadowCard";
import { Colors } from "../../defaultComponents/Colors";
import Header from "../../components/Header";
import Container from "../../defaultComponents/Container";
import { ModalCenter } from "../../defaultComponents/ModalFolder/Modal";
import { Button } from "react-native-paper";
import { ProductImageModal } from "../../defaultComponents/ModalFolder/ContentModal";
import { tokenApi } from "../../api/nsl";
import VioletDiv from "../../defaultComponents/VioletDiv";
import { set } from "react-native-reanimated";
import LoadingScreen from "../../defaultComponents/LoadingScreen";

import HTMLView from "react-native-htmlview";
// import SvgImageView from "react-native-svg-img";

const ProductScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    tokenApi().then((resp) =>
      resp
        .post("/v1/products/getAll")
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

  const openProduct = (item) => {
    setCurrentItem(item);
    setModal(true);
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  return (
    <>
      <Header title="Our Products" />
      {/* <SvgImageView
        width={200}
        height={200}
        source={require("../../assets/ColorsOfRajasthan.svg")}
      /> */}
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/ColorsOfRajasthan.png")}
          />
        </View>
        <Container>
          <Text style={styles.title}>Our Products</Text>
          {loadingScreen}
          {data ? (
            <SectionList
              sections={data}
              keyExtractor={(item, index) => item.productId}
              renderItem={({ item }) => {
                return (
                  <View style={{ width: "48%", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => openProduct(item)}>
                      <ShadowCard>
                        <Image
                          style={{ height: 150 }}
                          source={{ uri: item.imageURL }}
                        />
                      </ShadowCard>
                    </TouchableOpacity>
                  </View>
                );
              }}
              renderSectionHeader={({ section }) => (
                <View style={{ marginBottom: 15 }}>
                  <VioletDiv> {section.category} </VioletDiv>
                </View>
              )}
            />
          ) : null}

          {/* <FlatList
            data={res.data}
            keyExtractor={(item) => item.productID}
            renderItem={({ item }) => (
              <View style={{ width: "50%", alignSelf: "center" }}>
                <ShadowCard>
                  <Image style={{ height: 100 }} source={{ uri: item.img }} />
                </ShadowCard>
              </View>
            )}
          /> */}
        </Container>
        {modal ? (
          <ProductImageModal
            visible={modal}
            onDismiss={() => {
              setCurrentItem();
              setModal(false);
            }}
          >
            <Image
              style={{ width: 100, height: 100, alignSelf: "center" }}
              source={{ uri: currentItem.smallImageURL }}
            />

            <Text style={styles.ModalTitle}>{currentItem.productTitle}</Text>
            {/* <Text style={styles.Description}>
              {currentItem.productDescription}
            </Text> */}
            <HTMLView
              value={currentItem.productDescription}
              stylesheet={styles}
            />
          </ProductImageModal>
        ) : null}
      </View>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 199,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.grey2,
    marginBottom: 16,
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
});
