import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BannerCarousel = ({ banner, link }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  // const navigation = useNavigation();

  const { width: windowWidth } = useWindowDimensions();

  const linkHandler = (bannerI) => {
    let { banner_link, banner_type } = bannerI;

    if (banner_link !== "") {
      link(banner_link, banner_type);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.scrollViewStyle}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={1}
          >
            {banner &&
              banner.map((bannerI, imageIndex) => {
                return (
                  <TouchableOpacity
                    key={bannerI.bannerID}
                    onPress={() => linkHandler(bannerI)}
                  >
                    <View
                      style={{
                        width: windowWidth,
                        maxHeight: 250,
                        flex: 1,
                      }}
                    >
                      <Image
                        source={{ uri: bannerI.bannerImage }}
                        style={styles.card}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        <View style={styles.indicatorContainer}>
          {banner &&
            banner.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { width }]}
                />
              );
            })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "33%",
    maxHeight: 250,
  },
  scrollContainer: {
    maxHeight: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewStyle: {},
  card: {
    flex: 1,
    // marginVertical: 4,
    // marginHorizontal: 16,
    // borderRadius: 5,
    // overflow: "hidden",
    resizeMode: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
    position: "relative",
    bottom: 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BannerCarousel;
