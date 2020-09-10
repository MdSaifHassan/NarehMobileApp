import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import BackHeader from "../../defaultComponents/BackHeader";
import { Colors } from "../../defaultComponents/Colors";
import Dropdwon from "./ProfileCard/ProfileEditCard/DropDwon";
import Marital_status from "./ProfileCard/ProfileEditCard/Marital_status";
import MapContainer_2 from "./ProfileCard/ProfileEditCard/MapContainer_2";
import MapContainer from "./ProfileCard/MapCard";
import { tokenApi } from "../../api/nsl";
import KidsCard from "./ProfileCard/KidsCard";
import { emailRE, mobileNumberRE } from "../../components/RegExValidations";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
const ProfileEdit = ({ navigation, route }) => {
  // const { member, address, family } = route.params;

  // const { name, mobile, store_name, marital_status, email, dob, doa } = member;
  const [loading, setLoading] = useState(false);
  const [Nname, setName] = useState();
  const [Nmobile, setMobile] = useState();
  const [Nstore_name, setStore_name] = useState();
  const [Nmarital_status, setMarital_status] = useState();
  const [Nemail, setEmail] = useState();
  const [Ndob, setDob] = useState();
  const [Ndoa, setDoa] = useState();

  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [address3, setAddress3] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [state1, setState1] = useState();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [fName, setFname] = useState();
  const [fRelation, setFrelation] = useState();
  const [fID, setFID] = useState();
  const [fGender, setFgender] = useState();
  const [fDOB, setFdob] = useState();

  const changeHandlerEmail = (email) => {
    setEmail(email);
    setIsValidEmail(emailRE(email));
  };

  const changeHandlerMobile = (phoneNumber) => {
    setMobile(phoneNumber);
    setIsValidMobile(mobileNumberRE(phoneNumber));
  };

  const saveHandler = () => {
    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v1/members/updateProfile", {
          member: {
            name: Nname,
            email: Nemail,
            mobile: Nmobile,
            store_name: Nstore_name,
            dob: Ndob,
            doa: Ndoa,
            //mbrId: member.mbrId,
            marital_status: Nmarital_status,
            //  total_kids: length,
          },
          address: {
            address1,
            address2,
            address3,
            pincode,
            city,
            state: state1,
          },
          family: [
            {
              familyName: fName,
              familyRelationship: "spouse",
            },
            {
              familyName: fName,
              familyGender: fGender,
              familyRelationship: "kid",
              familyDOB: fDOB,
            },
          ],
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data.response, "llll");
          navigation.navigate("Dashboard");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
          alert(
            "Some fields are missing. Please enter the required fields and then submit"
          );
        })
    );
  };

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  return (
    <View style={styles.MainContainer}>
      <BackHeader title="Profile" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.BodyWrapper}>
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                  onChangeText={(text) => setName(text)}
                  value={Nname}
                  style={styles.SmallTextInput}
                />
              </View>
            </View>
            {/* //////////////////////// */}
            <View style={styles.NameWrapper_2}>
              <View style={styles.LeftWrapper_2}>
                <Text style={styles.text}>Registered Mobile # *</Text>
                <TextInput
                  style={{
                    ...styles.SmallTextInput,
                    color: isValidMobile ? Colors.black1 : Colors.red1,
                  }}
                  onChangeText={changeHandlerMobile}
                  value={Nmobile}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                {!isValidMobile ? (
                  <Text style={styles.errorMsg}>
                    Enter correct mobile number
                  </Text>
                ) : null}
              </View>
              <View style={styles.RightWrapper_2}>
                <Text style={styles.text}>Store name</Text>
                <TextInput
                  style={styles.SmallTextInput}
                  onChangeText={(text) => setStore_name(text)}
                  value={Nstore_name}
                />
              </View>
            </View>

            {/* /////////////////////////// */}
            <View style={styles.NameWrapper_2}>
              <View style={{ width: "100%" }}>
                <Text style={styles.text}>Email*</Text>
                <TextInput
                  style={{
                    ...styles.SmallTextInput,
                    color: isValidEmail ? Colors.black1 : Colors.red1,
                  }}
                  onChangeText={changeHandlerEmail}
                  value={Nemail}
                />
                {!isValidEmail ? (
                  <Text style={styles.errorMsg}>Enter correct Email</Text>
                ) : null}
              </View>
            </View>

            {/* //////////////////// */}
            <View style={styles.NameWrapper}>
              <View style={{ width: "100%" }}>
                <Text style={styles.text}>Birth Date</Text>
                <TextInput
                  style={styles.SmallTextInput}
                  onChangeText={(text) => setDob(text)}
                  value={new Date(Ndob)
                    .toDateString()
                    .slice(4)
                    .split(" ")
                    .join(" ")}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              height: 6,
              width: "100%",
              backgroundColor: Colors.voilet3,
            }}
          />
          {loadingScreen}
          {/* ////////////////Next Conatiner */}
          <View style={styles.BodyWrapper}>
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text}>Address line 1 </Text>
                <TextInput
                  style={styles.SmallTextInput}
                  onChangeText={(text) => setAddress1(text)}
                  value={address1}
                />
              </View>
            </View>
            {/* //////////////////////// */}
            <View style={styles.NameWrapper}>
              <View style={styles.LeftWrapper}>
                <Text style={styles.text}>Address line 2 </Text>
                <TextInput
                  style={styles.SmallTextInput}
                  onChangeText={(text) => setAddress2(text)}
                  value={address2}
                />
              </View>
            </View>
            {/* /////////////////////////// */}
            <View style={styles.NameWrapper}>
              <View style={{ width: "100%" }}>
                <Text style={styles.text}>Landmark</Text>
                <TextInput
                  style={styles.SmallTextInput}
                  onChangeText={(text) => setAddress3(text)}
                  value={address3}
                />
              </View>
            </View>
            {/* //////////////////// */}

            <View>
              <Dropdwon city={city} state={state1} />
            </View>
            <View style={[styles.NameWrapper_2, { marginBottom: 20 }]}>
              <View style={styles.RightWrapper_2}>
                <View style={styles.TextWrapper}>
                  <Text style={styles.text}>Pin code </Text>
                  <Text style={{ color: "#F26F25" }}>*</Text>
                </View>
                <TextInput
                  style={styles.SmallTextInput}
                  onChangeText={(text) => setPincode(text)}
                  value={pincode}
                />
              </View>
            </View>
            <MapContainer />
          </View>
          <View
            style={{
              height: 6,
              width: "100%",
              backgroundColor: Colors.voilet3,
            }}
          />
          {/* <Marital_status
            family={family}
            member={member}
            onPress={saveHandler}
            onChangeText1={(text) => setDoa(text)}
            value1={Ndoa}
            onChangeText2={(text) => setFname(text)}
            value2={fName}
            onChangeTextName={(text) => setFname(text)}
            onChangeTextGender={(text) => setFgender(text)}
            onChangeTextBirth={(text) => setFdob(text)}
            valueName={fName}
            valueBirth={fDOB}
            valueGender={fGender}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 100,
  },
  container: {
    //flex: 1,
    alignItems: "center",
  },
  BodyWrapper: {
    width: "91.46%",
    paddingBottom: 10,
    paddingTop: 10,
  },
  NameWrapper: {
    width: "100%",
    // borderBottomWidth: 1,
    // borderColor: Colors.grey2,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 16,
  },
  NameWrapper_2: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },
  RightWrapper: {
    width: "100%",
  },
  LeftWrapper: {
    width: "100%",
  },
  LeftWrapper_2: {
    width: "48%",
  },
  RightWrapper_2: {
    width: "48%",
  },
  text: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
  },
  text_bottom: {
    opacity: 0.8,
    fontSize: 13,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    textAlign: "left",
    color: Colors.grey2,
    marginTop: 10,
    marginBottom: 5,
  },
  errorMsg: {
    marginTop: 4,
    fontSize: 10,
    color: Colors.red1,
  },
  TextWrapper: {
    width: 152,
    flexDirection: "row",
  },
  TextInput: {
    borderBottomWidth: 1,
    borderColor: Colors.grey2,
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
  },
  SmallTextInput: {
    width: "100%",
    borderBottomWidth: 0.7,
    borderColor: Colors.grey2,
    marginTop: 10,
    paddingBottom: 5,
  },
});
