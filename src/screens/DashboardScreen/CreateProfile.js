import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import NameCard from "../ProfileScreen/ProfileEditScreenCards/NameCard";
import {
  DividerColor,
  RowConatiner,
} from "../ProfileScreen/ProfileEditScreenCards/ProfileDefaultComponents/ProfileEditText";
import AddressCard from "../ProfileScreen/ProfileEditScreenCards/AddressCard";
import Container from "../../defaultComponents/Container";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "../../defaultComponents/Colors";
import MaritalStatusCard from "../ProfileScreen/ProfileEditScreenCards/MaritalStatusCard";
import KidsComponentCard from "../ProfileScreen/ProfileEditScreenCards/KidsComponentCard";
import dateFormat from "dateformat";
import { tokenApi } from "../../api/nsl";

const CreateProfile = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);
  const [member, setMember] = useState();
  const [address, setAddress] = useState();
  const [family, setFamily] = useState();
  const [Nname, setName] = useState("");
  const [Nmobile, setMobile] = useState("");
  const [Nstore_name, setStore_name] = useState();
  const [Nemail, setEmail] = useState();
  const [Ndob, setDob] = useState();
  const [Ndoa, setDoa] = useState();
  const [status, setStatus] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [address3, setAddress3] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [state1, setState1] = useState();
  const [pressed, setPressed] = useState(false);
  const [fNameSpouse, setFnameSpouse] = useState();
  const [fDOBSpouse, setFdobSpouse] = useState();
  //const [show, setShow] = useState(false);
  const [kidsArray, setKidsArray] = useState([]);
  const [marital_status, setMaritalStatus] = useState();
  const [mbrID, setMemberID] = useState();

  useEffect(() => {
    tokenApi().then((res) =>
      res.post("/v1/members/getProfile").then((response) => {
        console.log(response.data.response);
        setData(response.data.response);
        setMember(response.data.response.member);
        setName(response.data.response.member.name);
        setMobile(response.data.response.member.mobile);
        setStore_name(response.data.response.member.store_name);
        setMaritalStatus(response.data.response.member.marital_status);
        setEmail(response.data.response.member.email);
        setDob(response.data.response.member.dob);
        setAddress1(response.data.response.address.address1);
        setAddress2(response.data.response.address.address2);
        setAddress3(response.data.response.address.address3);
        setCity(response.data.response.address.city);
        setState1(response.data.response.address.state);
        setPincode(response.data.response.address.pincode);
        setFamily(response.data.response.family);
        setMemberID(response.data.response.member.mbrID);
      })
    );
  }, []);
  //console.log(member.name, "DATA1");

  console.log(member, address, family, "DATA");

  console.log(kidsArray.length, "lllll");
  const kidsData = () => {
    let i = 0;
    let temp = [];
    while (i < kidsArray.length) {
      temp.push({
        name: kidsArray[i].name,
        familyId: 0,
        gender:
          kidsArray[i].gender === "Male"
            ? "M"
            : kidsArray[i].gender === "Female"
            ? "F"
            : kidsArray[i].gender,
        relationship: "kid",
        dob: dateFormat(kidsArray[i].birth, "dd-mm-yyyy"),
      });
      i++;
    }
    return temp;
  };

  const spouseData = () => {
    if (marital_status === "married") {
      return {
        name: fNameSpouse,
        relationship: "spouse",
        familyId: 0,
        dob: dateFormat(fDOBSpouse, "dd-mm-yyyy"),
      };
    }
    return {
      name: "",
      relationship: "",
    };
  };

  const saveHandler = () => {
    setPressed(true);
    let tempObj = kidsData();
    let spouseObj = spouseData();

    tokenApi().then((res) =>
      res
        .post("/v1/members/updateProfile", {
          member: {
            name: Nname,
            email: Nemail,
            mobile: Nmobile,
            store_name: Nstore_name,
            dob: dateFormat(Ndob, "dd-mm-yyyy"),
            doa: dateFormat(Ndoa, "dd-mm-yyyy"),
            mbrID,
            marital_status,
            total_kids: kidsArray.length,
          },
          address: {
            address1,
            address2,
            address3,
            pincode,
            city,
            state: state1,
          },
          family: [spouseObj, ...tempObj],
        })
        .then((response) => {
          console.log(response.data.response, "Data");
          navigation.navigate("Home");
        })
        .catch((err) => {
          setPressed(false);
          console.log(err.response, "Error");
          // alert(
          //   "Some fields are missing. Please enter the required fields and then submit"
          // );
          //setModalF(true);
        })
    );
  };

  const kidNameChangeHandler = (text, index) => {
    kidsArray[index].name = text;
    setKidsArray([...kidsArray]);
  };
  const kidGenderChangeHandler = (text, index) => {
    kidsArray[index].gender = text;
    setKidsArray([...kidsArray]);
  };
  const kidBirthChangeHandler = (CalIn, index) => {
    kidsArray[index].birth = CalIn;
    setKidsArray([...kidsArray]);
  };

  const kidAddHandler = () => {
    setKidsArray((prevKid) => [
      ...prevKid,
      {
        name: "",
        gender: "",
        birth: "",
      },
    ]);
  };

  const deleteHandler = (index) => {
    setKidsArray((prev) => prev.filter((kid, i) => i !== index));
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <NameCard
            onChangeTextName={(text) => setName(text)}
            valueName={Nname}
            onChangeTextMobile={(text) => setMobile(text)}
            valueMobile={Nmobile}
            onChangeTextStore={(text) => setStore_name(text)}
            valueStore={Nstore_name}
            onChangeTextEmail={(text) => setEmail(text)}
            valueEmail={Nemail}
            // onChangeTextBirth={(text) => setDob(text)}
            // valueBirth={Ndob}
            calData={(CalIn) => {
              console.log(CalIn, "Input cal");
              setDob(CalIn);
            }}
            inputDate={Ndob}
          />
          <DividerColor />
          <AddressCard
            onChangeTextAddress1={(text) => setAddress1(text)}
            valueAddress1={address1}
            onChangeTextAddress2={(text) => setAddress2(text)}
            valueAddress2={address2}
            onChangeTextLandmark={(text) => setAddress3(text)}
            valueLandmark={address3}
            onChangeTextCity={(text) => setCity(text)}
            valueCity={city}
            onChangeTextPin={(text) => setPincode(text)}
            valuePin={pincode}
            state1={state1}
            transferStatetoParent={(selectedState) => setState1(selectedState)}
          />
          <DividerColor />
          <Container pTop={10}>
            <Text style={styles.title}>Marital Status</Text>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <Text style={{ alignSelf: "center" }}>Married </Text>
              <View style={styles.radioButton}>
                <RadioButton
                  value="married"
                  status={
                    marital_status === "married" ? "checked" : "unchecked"
                  }
                  onPress={() => setMaritalStatus("married")}
                  color={Colors.voilet1}
                />
              </View>
              <Text style={{ alignSelf: "center" }}> Unmarried </Text>
              <View style={styles.radioButton}>
                <RadioButton
                  value="unmarried"
                  status={
                    marital_status === "unmarried" ? "checked" : "unchecked"
                  }
                  onPress={() => setMaritalStatus("unmarried")}
                  color={Colors.voilet1}
                />
              </View>
            </View>
          </Container>

          {marital_status === "married" && (
            <>
              <MaritalStatusCard
                calData={(CalIn) => {
                  console.log(CalIn, "Input cal");
                  setDoa(CalIn);
                }}
                inputDate={member.dob && member.dob}
                onChangeTextNameSpouse={(text) => setFnameSpouse(text)}
                valueNameSpouse={fNameSpouse}
                spouseBirthIn={(CalIn) => {
                  console.log(CalIn, "Input cal");
                  setFdobSpouse(CalIn);
                }}
              />

              <DividerColor />
              <Container>
                <RowConatiner>
                  <Text style={{ color: Colors.black1, fontSize: 16 }}>
                    Add Kid Details
                  </Text>

                  <ButtonFill onPress={kidAddHandler}>
                    <Text style={{ color: Colors.white, fontSize: 19 }}>+</Text>
                  </ButtonFill>
                </RowConatiner>
              </Container>

              {kidsArray !== []
                ? kidsArray.map((kid, index) => {
                    return (
                      <>
                        <Container key={index + 1}>
                          <ButtonFill onPress={() => deleteHandler(index)}>
                            <Text style={{ color: Colors.white }}>Delete</Text>
                          </ButtonFill>
                        </Container>
                        <KidsComponentCard
                          key={index}
                          num={index + 1}
                          onChangeTextKidName={(text) =>
                            kidNameChangeHandler(text, index)
                          }
                          valueKidName={kid.name}
                          onChangeTextKidGender={(text) =>
                            kidGenderChangeHandler(text, index)
                          }
                          valueKidGender={kid.gender}
                          onChangeTextCBirth={(text) =>
                            kidBirthChangeHandler(text, index)
                          }
                          valueCBirth={kid.birth}
                          // calData={(CalIn) => {
                          //   console.log(CalIn, "Input cal");
                          //   kidBirthChangeHandler(CalIn, index);
                          // }}
                          // inputDate={kid.familyDOB && kid.familyDOB}
                        />
                      </>
                    );
                  })
                : null}
            </>
          )}
        </View>

        <Container pTop={50} pBottom={35}>
          <ButtonFill
            disabled={pressed}
            bgColor={pressed && Colors.grey11}
            onPress={saveHandler}
            self="center"
            width="60%"
          >
            <Text style={styles.saveText}>Save Changes</Text>
          </ButtonFill>
        </Container>
      </ScrollView>
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: 50,
  },
  container: {
    flex: 1,
  },

  saveText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
  },
  btn: {
    width: 80,
    height: 30,
    backgroundColor: Colors.voilet1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  btn_text: {
    fontSize: 12,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.white,
    textTransform: "capitalize",
  },
  title: {
    fontSize: 14,
    fontFamily: "roboto-bold",
    color: Colors.grey2,
  },
});
