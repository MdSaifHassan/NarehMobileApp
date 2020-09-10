import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../defaultComponents/Colors";
import { ButtonOutline } from "../../defaultComponents/Button";
import GeneralCard from "./ProfileCard/GeneralCard";
import Address from "./ProfileCard/AdsressCard";
import Family from "./ProfileCard/FmilyCrad";
import Container from "../../defaultComponents/Container";
import { tokenApi } from "../../api/nsl";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import dateFormat from "dateformat";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const { apiState, apiContext } = React.useContext(AuthContext);

  const [member, setMember] = useState(null);
  const [address, setAddress] = useState(null);
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    tokenApi().then((res) =>
      res
        .post("/v1/members/getProfile")
        .then((response) => {
          setLoading(false);
          console.log(response.data.response, "FamilyProfile");
          console.log(response.data.response.address, "Address");
          setMember(response.data.response.member);
          setAddress(response.data.response.address);
          setFamily(response.data.response.family);
        })
        .catch((error) => {
          setLoading(false);
          apiContext.failure(error);
        })
    );
  }, [isFocused]);

  console.log(family, "setFamily");
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ScrollView style={styles.ScrollView}>
        <View style={styles.ButtonView}>
          <ButtonOutline
            // onPress={() => navigation.push("Edit", { member, address, family })}
            onPress={() =>
              navigation.push("EditScreen", { member, address, family })
            }
          >
            <Text style={styles.EditText}>Edit</Text>
          </ButtonOutline>
        </View>
        <Container>
          <GeneralCard
            name={member ? member.name : ""}
            mobile={member ? member.mobile : ""}
            storeName={member ? member.store_name : ""}
            email={member ? member.email : ""}
            //dob={member ? dateFormat(member.dob, "dd mmm yyyy") : ""}
            dob={member ? member.dob : ""}
          />
          <Address
            address1={address ? address.address1 : ""}
            address2={address ? address.address2 : ""}
            city={address ? address.city : ""}
            state={address ? address.state : ""}
            pincode={address ? address.pincode : ""}
          />

          {family !== [] ? (
            <Family family={family} doa={member ? member.doa : ""} />
          ) : null}
        </Container>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ButtonView: {
    width: "17%",
    height: 60,
    justifyContent: "center",
    alignSelf: "center",
    //backgroundColor: "yellow",
  },
  EditText: {
    color: Colors.grey2,
    fontSize: 12,
    fontFamily: "roboto-regular",
    //backgroundColor: "green",
    width: "100%",
    textAlign: "center",
  },
});
