import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../defaultComponents/Colors";
import Header from "../components/Header";
import { tokenApi } from "../api/nsl";
import LoadingScreen from "../defaultComponents/LoadingScreen";

const ContactScreen = () => {
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tokenApi()
      .then((res) =>
        res
          .post("/v1/lookup/contactus")
          .then((response) => {
            setLoading(false);
            console.log(response.data.response);
            setEmail(response.data.response.email);
            setPhone(response.data.response.phone);
            setAddress(response.data.response.address);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
          })
      )
      .catch((err) => console.log(err.message));
  });

  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  // let loadingScreen = null;
  if (loading) {
    return <LoadingScreen />;
  } else
    return (
      <>
        <Header title="Contact Us" />

        <View style={styles.container}>
          <View style={styles.callCenter}>
            <View style={styles.image}>
              <Image
                style={{ height: 60, width: 42 }}
                source={require("../../assets/HelpIcons/call-center.png")}
              />
            </View>
            <View style={styles.toolTip}>
              <Text style={styles.toolText}>Mon to Sat (9 AM to 6 PM)</Text>
            </View>
          </View>

          <View style={styles.middleDiv}>
            {phone !== "" ? (
              <View style={styles.tel}>
                <TouchableOpacity onPress={openDial}>
                  <View style={styles.telImage}>
                    <Image
                      style={{ height: 24, width: 24 }}
                      source={require("../../assets/HelpIcons/Phone.png")}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <Text stlye={styles.textTel}>{phone}</Text>
                </View>
              </View>
            ) : null}

            {email !== "" ? (
              <View style={styles.email}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`mailto:${email}`);
                  }}
                >
                  <View style={styles.emailImage}>
                    <Image
                      style={{ height: 24, width: 32 }}
                      source={require("../../assets/HelpIcons/email.png")}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <Text style={styles.emailText}>{email}</Text>
                </View>
              </View>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#FAFAFA",
              paddingHorizontal: "9%",
            }}
          >
            {address !== "" ? (
              <View style={styles.address}>
                <Text style={styles.addTitle}>Address:</Text>
                <Text style={styles.addText}>
                  Shatula manashi 5th floor, 1st cross, 3rd main road, Bangalore
                  560000, Karnataka
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  callCenter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "91.64%",
    marginVertical: 20,
    alignSelf: "center",
  },
  image: {
    // maxWidth: 70,
    width: "11%",
    minHeight: 90,
    marginHorizontal: "4%",
  },
  toolTip: {
    minWidth: 180,
    height: 32,
    backgroundColor: Colors.voilet5,
    //paddingVertical: 8,
    //paddingHorizontal: 16,
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 4,
  },
  toolText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    alignSelf: "center",
    lineHeight: 20,
  },
  middleDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "72%",
    alignSelf: "center",
    //height: 100,
    paddingBottom: 20,
  },
  tel: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  telImage: {
    width: 40,
    height: 40,
  },
  textTel: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    lineHeight: 20,
  },
  email: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  emailImage: {
    width: 40,
    height: 40,
  },
  emailText: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    lineHeight: 20,
  },
  address: {
    width: "65%",
    justifyContent: "space-around",

    paddingVertical: 30,
  },
  addTitle: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 13,
  },
  addText: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    lineHeight: 21,
  },
});
