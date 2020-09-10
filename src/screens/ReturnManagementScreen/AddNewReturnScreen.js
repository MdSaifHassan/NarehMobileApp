import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { ReturnListDelete } from "./ReturnList";
import { ButtonFill } from "../../defaultComponents/Button";
import { Colors } from "../../defaultComponents/Colors";
import Header from "../../defaultComponents/BackHeader";
import Container from "../../defaultComponents/Container";
import AddNewContainer from "./AddNewContainer";
import dateFormat from "dateformat";
import {
  ModalDelete,
  ModalFailure,
  ModalSucess,
  Sucess,
} from "../../defaultComponents/ModalFolder/ContentModal";
import { tokenApi } from "../../api/nsl";

const AddNewReturnScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [add, setAdd] = useState(true);
  const [returnList, setReturnList] = useState([]);
  const [quantity, setQuantity] = useState();
  const [newState, setNewState] = useState();
  const [prod, setProd] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [client, setClient] = useState();
  const [unclaimQuantity, setUnclaimQuantity] = useState();
  const [currentClient, setCurrentClient] = useState(null);
  const [show, setShow] = useState(true);

  const submitHandler = () => {
    tokenApi().then((res) =>
      res
        .post("/v2/members/addReturns", [...returnList])
        .then((response) => {
          console.log(response.data.message);
          //setModal(true);
        })
        .catch((err) => console.log(err.response))
    );

    navigation.navigate("Return");
  };

  console.log("Cl+Unc", quantity, "--", unclaimQuantity);
  console.log("Product", prod);
  console.log("Client", client);

  const addHandler = () => {
    if (!prod || !client) {
      return alert("Client type and Product field is required");
    }
    // if (quantity < 0 && unclaimQuantity < 0) {
    //   return alert("Negative quantities are not accepted");
    // }
    // if (quantity > 0 && unclaimQuantity < 0) {
    //   return alert("Negative quantities are not accepted");
    // }
    // if (quantity < 0 && unclaimQuantity > 0) {
    //   return alert("Negative quantities are not accepted");
    // }
    // if (quantity < 0 || unclaimQuantity < 0) {
    //   return alert("Negative quantities are not accepted");
    // }

    if (parseFloat(quantity) === 0 && parseFloat(unclaimQuantity) === 0) {
      return alert("Both quantities cannot be 0");
    }

    if (!quantity && !unclaimQuantity) {
      return alert("Enter either claimed or unclaimed quantity");
    }

    tokenApi().then((res) =>
      res
        .post("/v1/members/verifyReturns", {
          productCode: prod,
          quantity: quantity ? quantity : 0,
          returnDate: dateFormat(newState, "dd-mm-yyyy"),
          unclaimedQuantity: unclaimQuantity,
          claimType: client,
        })
        .then((response) => {
          console.log(response.data.response, "Response");
          setReturnList((prev) => [
            ...prev,
            {
              productCode: prod,
              quantity: quantity ? quantity : 0,
              returnDate: dateFormat(newState, "dd-mm-yyyy"),
              unclaimedQuantity: unclaimQuantity,
              claimType: client,
            },
          ]);
        })
        .catch((err) => console.log(err.response.data, "Error"))
    );
  };
  const modalOpener = (index) => {
    console.log(index);
    setCurrentIndex(index);
    setModal(true);
  };

  const deleteHandler = () => {
    setReturnList((prev) => prev.filter((list, i) => i !== currentIndex));
    setCurrentIndex();
    setModal(false);
  };

  console.log([...returnList], "LISTReturn");

  return (
    <View style={styles.container}>
      <Header title="Add New Return" />
      <Container flex={1}>
        <ScrollView>
          <AddNewContainer
            product={(selectedProduct) => setProd(selectedProduct)}
            onPress={addHandler}
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            cData={(CalIn) => setNewState(CalIn)}
            transferStatetoParent={(selectedState) => {
              console.log(selectedState, "currentClient");
              setClient(selectedState);
              setCurrentClient(selectedState);
            }}
            valueUnclaim={unclaimQuantity}
            onChangeTextUnclaim={(text) => setUnclaimQuantity(text)}
            disabled={unclaimQuantity < 0 || quantity < 0}
            show={currentClient === "Distributor" ? false : true}
          />
        </ScrollView>
        {returnList !== [] ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={returnList}
            renderItem={({ item, index }) => {
              return (
                <ReturnListDelete
                  onPress={() => modalOpener(index)}
                  productName={item.productCode}
                  quantity={!show ? item.quantity : 0}
                  valueUnclaim={
                    item.unclaimedQuantity ? item.unclaimedQuantity : 0
                  }
                  clientType={item.claimType}
                />
              );
            }}
          />
        ) : null}

        {/* <ReturnListDelete
            onPress={() => setModal(true)}
            productName="NYM6001GHK004"
            quantity={197}
          />
          <ReturnListDelete
            onPress={() => setModal(true)}
            productName="NYM6001GHK004"
            quantity={197}
          />
          <ReturnListDelete
            onPress={() => setModal(true)}
            productName="NYM6001GHK004"
            quantity={197}
          /> */}

        <View style={styles.btnContainer}>
          <ButtonFill
            bgColor={returnList.length < 1 ? Colors.grey11 : Colors.voilet1}
            disabled={returnList.length < 1}
            self="center"
            onPress={submitHandler}
          >
            <Text style={styles.submit}> Submit</Text>
          </ButtonFill>
        </View>
      </Container>
      {modal ? (
        <ModalDelete
          visible={modal}
          onDismiss={() => setModal(false)}
          name="Are you sure?"
          footerName="Do you want to delete it?"
          btn1="Cancel"
          btn2="Yes, Delete"
          Icon="error"
          delete={deleteHandler}
        />
      ) : null}
    </View>
  );
};

export default AddNewReturnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    alignSelf: "baseline",
    // flex: 1,
    width: "100%",
    flexDirection: "column-reverse",
    paddingBottom: 10,
  },
  submit: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.white,
  },
});
