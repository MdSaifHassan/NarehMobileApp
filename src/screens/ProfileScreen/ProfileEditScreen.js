import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Container from "../../defaultComponents/Container";
import { Colors } from "../../defaultComponents/Colors";
import {
  Type1Text,
  DividerColor,
  RowConatiner,
} from "./ProfileEditScreenCards/ProfileDefaultComponents/ProfileEditText";
import BackHeader from "../../defaultComponents/BackHeader";
import NameCard from "./ProfileEditScreenCards/NameCard";
import AddressCard from "./ProfileEditScreenCards/AddressCard";
import MaritalStatusCard from "./ProfileEditScreenCards/MaritalStatusCard";
import KidsComponentCard from "./ProfileEditScreenCards/KidsComponentCard";
import { ButtonFill } from "../../defaultComponents/Button";
import { tokenApi } from "../../api/nsl";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import dateFormat from "dateformat";
import { ModalFailure } from "../../defaultComponents/ModalFolder/ContentModal";
import { emailRE, mobileNumberRE } from "../../components/RegExValidations";
import { RadioButton } from "react-native-paper";

const ProfileEditScreen = ({ navigation, route }) => {
  const { member, address, family } = route.params;
  let findSpouse = family
    ? family.find((fam) => fam.familyRelationship === "spouse")
    : null;
  let spouseName = findSpouse ? findSpouse.familyName : null;
  let spouseBirth = findSpouse ? findSpouse.familyDOB : null;
  let spouseId = findSpouse ? findSpouse.familyId : null;

  let kids = family.filter((fam) => fam.familyRelationship === "kid");

  // console.log("KIDS", kids);
  const [pressed, setPressed] = useState(false);
  const [kidsDataa, setKidsDataa] = useState([...kids]);
  const { name, mobile, store_name, N, email, dob, doa } = member;
  const [loading, setLoading] = useState(false);
  const [Nname, setName] = useState(name);
  const [Nmobile, setMobile] = useState(mobile);
  const [Nstore_name, setStore_name] = useState(store_name);
  const [Nemail, setEmail] = useState(email);
  const [Ndob, setDob] = useState(member && member.dob);
  const [Ndoa, setDoa] = useState(member && member.doa);
  const [status, setStatus] = useState(
    member.marital_status === "married" ? true : false
  );
  const [address1, setAddress1] = useState(address.address1);
  const [address2, setAddress2] = useState(address.address2);
  const [address3, setAddress3] = useState(address.address3);
  const [city, setCity] = useState(address.city);
  const [pincode, setPincode] = useState(address.pincode);
  const [state1, setState1] = useState(address.state);

  const [fNameSpouse, setFnameSpouse] = useState(spouseName);
  const [fDOBSpouse, setFdobSpouse] = useState(spouseBirth);
  const [Nmarital_status, setMaritalStatus] = useState(
    member && member.marital_status
  );
  const [kidsArray, setKidsArray] = useState([...kids]);

  const [modalF, setModalF] = useState(false);

  const kidsData = () => {
    let i = 0;
    let temp = [];
    while (i < kidsArray.length) {
      temp.push({
        name: kidsArray[i].familyName,
        familyId: kidsArray[i].familyId,
        gender:
          kidsArray[i].familyGender === "Male"
            ? "M"
            : kidsArray[i].familyGender === "Female"
            ? "F"
            : kidsArray[i].familyGender,
        relationship: "kid",
        dob:
          kidsArray[i].familyDOB !== "0000-00-00"
            ? dateFormat(kidsArray[i].familyDOB, "dd-mm-yyyy")
            : "",
      });
      i++;
    }
    return temp;
  };

  const spouseData = () => {
    if (Nmarital_status === "married") {
      return {
        name: fNameSpouse,
        relationship: "spouse",
        familyId: spouseId,
        dob: fDOBSpouse ? dateFormat(fDOBSpouse, "dd-mm-yyyy") : "",
      };
    }
    return {
      name: "",
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
            marital_status: Nmarital_status,
            dob: Ndob ? dateFormat(Ndob, "dd-mm-yyyy") : "",
            doa: Ndoa ? dateFormat(Ndoa, "dd-mm-yyyy") : "",
            mbrID: member.mbrID,

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
          family: [spouseObj, ...tempObj],
        })
        .then((res) => {
          navigation.goBack();
        })
        .catch((err) => {
          setPressed(false);
          console.log(err.response.data);
          // alert(
          //   "Some fields are missing. Please enter the required fields and then submit"
          // );
          setModalF(true);
        })
    );
  };

  console.log(status, "----");

  // const kidNameChangeHandler = (text, index) => {
  //   console.log(kids[index], "KIDNUMBER ", index);
  //   kids[index].familyName = text;
  //   setKidsDataa([...kids]);
  // };
  // const kidGenderChangeHandler = (text, index) => {
  //   kids[index].familyGender = text;
  //   setKidsDataa([...kids]);
  // };
  // const kidBirthChangeHandler = (text, index) => {
  //   kids[index].familyDOB = text;
  //   setKidsDataa([...kids]);
  // };
  const kidNameChangeHandler = (text, index) => {
    kidsArray[index].familyName = text;
    setKidsArray([...kidsArray]);
  };
  const kidGenderChangeHandler = (text, index) => {
    kidsArray[index].familyGender = text;
    setKidsArray([...kidsArray]);
  };
  const kidBirthChangeHandler = (text, index) => {
    kidsArray[index].familyDOB = text;
    setKidsArray([...kidsArray]);
  };

  const kidAddHandler = () => {
    setKidsArray((prevKid) => [
      ...prevKid,
      {
        familyName: "",
        familyGender: "",
        familyDOB: "",
        familyId: 0,
      },
    ]);
  };

  const deleteHandler = (index) => {
    setKidsArray((prev) => prev.filter((kid, i) => i !== index));
  };

  console.log(kidsArray, "kidsArray");
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.MainContainer}>
      <BackHeader title="Edit Profile" />

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
            inputDate={member.dob && member.dob}
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
                    Nmarital_status === "married" ? "checked" : "unchecked"
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
                    Nmarital_status === "unmarried" ? "checked" : "unchecked"
                  }
                  onPress={() => setMaritalStatus("unmarried")}
                  color={Colors.voilet1}
                />
              </View>
            </View>
          </Container>

          {Nmarital_status === "married" && (
            <>
              <MaritalStatusCard
                calDataAnni={(CalIn) => {
                  console.log(CalIn, "Input cal");
                  setDoa(CalIn);
                }}
                inputDateAnni={member.doa && member.doa}
                onChangeTextNameSpouse={(text) => setFnameSpouse(text)}
                valueNameSpouse={fNameSpouse}
                spouseBirthIn={(CalIn) => {
                  console.log(CalIn, "Input cal");
                  setFdobSpouse(CalIn);
                }}
                inputDate={spouseBirth && spouseBirth}
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
                      <View key={index}>
                        <Container>
                          <ButtonFill onPress={() => deleteHandler(index)}>
                            <Text style={{ color: Colors.white }}>Delete</Text>
                          </ButtonFill>
                        </Container>
                        <KidsComponentCard
                          num={index + 1}
                          onChangeTextKidName={(text) =>
                            kidNameChangeHandler(text, index)
                          }
                          valueKidName={kid.familyName}
                          onChangeTextKidGender={(text) =>
                            kidGenderChangeHandler(text, index)
                          }
                          valueKidGender={kid.familyGender}
                          onChangeTextCBirth={(text) =>
                            kidBirthChangeHandler(text, index)
                          }
                          valueCBirth={kid.familyDOB}
                          defaultValueCBirth={kidsArray[index].familyDOB}

                          // calData={(CalIn) => {
                          //   console.log(CalIn, "Input cal");
                          //   kidBirthChangeHandler(CalIn, index);
                          // }}
                          // inputDate={kid.familyDOB && kid.familyDOB}
                        />
                      </View>
                    );
                  })
                : null}
              {/* {kidsDataa &&
                kidsDataa.map((kid, index) => {
                  return (
                    <KidsComponentCard
                      key={index}
                      num={index + 1}
                      onChangeTextKidName={(text) =>
                        kidNameChangeHandler(text, index)
                      }
                      defaultValueKidName={kid.familyName}
                      valueKidName={kid.familyName}
                      defaultValueKidGender={
                        kid.familyGender === "M"
                          ? "Male"
                          : kid.familyGender === "F"
                          ? "Female"
                          : null
                      }
                      onChangeTextKidGender={(text) =>
                        kidGenderChangeHandler(text, index)
                      }
                      valueKidGender={kid.familyGender}
                      defaultValueCBirth={kid.familyDOB}
                      // calData={(CalIn) => {
                      //   console.log(CalIn, "Input cal");
                      //   kidBirthChangeHandler(CalIn, index);
                      // }}
                      // inputDate={kid.familyDOB && kid.familyDOB}
                      onChangeTextCBirth={(text) =>
                        kidBirthChangeHandler(text, index)
                      }
                      valueCBirth={kid.familyDOB}
                    />
                  );
                })} */}
            </>
          )}
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
        </View>
      </ScrollView>
      {modalF ? (
        <ModalFailure
          visible={modalF}
          Icon="error"
          name="Some fields are missing"
          footerName="Please enter the required fields and then submit"
          onDismiss={() => {
            // setDisable(false);
            setModalF(false);
          }}
        />
      ) : null}
    </View>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
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
  radioButton: {
    // backgroundColor: "red",
    // height: 30,
    // width: 30,
    borderWidth: Platform.OS === "ios" ? 0.3 : 0,
    marginTop: 5,
    borderRadius: Platform.OS === "ios" ? 50 : 0,
    marginRight: 20,
  },
});
{
  /* <KidsComponentCard
                num={1}
                onChangeTextKidName={(text) => setKid1Name(text)}
                valueKidName={kid1Name}
                onChangeTextKidGender={(text) => setKid1Gender(text)}
                valueKidGender={
                  kid1Gender === "M"
                    ? "Male"
                    : kid1Gender === "F"
                    ? "Female"
                    : null
                }
                onChangeTextCBirth={(text) => setKid1Birth(text)}
                valueCBirth={kid1Birth}
              />
              <KidsComponentCard
                num={2}
                onChangeTextKidName={(text) => setKid2Name(text)}
                valueKidName={kid2Name}
                onChangeTextKidGender={(text) => setKid2Gender(text)}
                valueKidGender={
                  kid2Gender === "M"
                    ? "Male"
                    : kid2Gender === "F"
                    ? "Female"
                    : null
                }
                onChangeTextCBirth={(text) => setKid2Birth(text)}
                valueCBirth={kid2Birth}
              />
              <KidsComponentCard
                num={3}
                onChangeTextKidName={(text) => setKid3Name(text)}
                valueKidName={kid3Name}
                onChangeTextKidGender={(text) => setKid3Gender(text)}
                valueKidGender={
                  kid3Gender === "M"
                    ? "Male"
                    : kid3Gender === "F"
                    ? "Female"
                    : null
                }
                onChangeTextCBirth={(text) => setKid3Birth(text)}
                valueCBirth={kid3Birth}
              />
            </>
          ) : (
            <Container pTop={10}>
              <Text style={styles.title}>Marital Status</Text>
              <TouchableOpacity
                onPress={() => setStatus((prevStatus) => !prevStatus)}
                style={styles.btn}
              >
                <Text style={styles.btn_text}>Unmarried</Text>
              </TouchableOpacity>
            </Container>
          )} */
}
