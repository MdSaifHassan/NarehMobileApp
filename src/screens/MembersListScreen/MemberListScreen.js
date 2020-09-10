import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/Header";
import Container from "../../defaultComponents/Container";
import { MemberContainer } from "./MemberListComponents";
import { tokenApi } from "../../api/nsl";

const MemberListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    tokenApi().then((res) =>
      res
        .post("/v1/members/membersList", {
          page: 1,
          perPage: 10,
        })
        .then((response) => {
          setData(response.data.response);
        })
        .catch((err) => console.log(err.response.data))
    );
  }, []);

  console.log(data, "members response check 2");
  return (
    <View>
      <Header title="Members" />
      <Container>
        {data ? (
          <FlatList
            keyExtractor={(item) => item.mbrID}
            data={data}
            renderItem={({ item }) => (
              <MemberContainer
                memberName={item.memberName}
                companyName={item.storeName}
                phoneNumber={item.memberMobile}
                onPress={() => navigation.navigate("SalesMembers", { item })}
              />
            )}
          />
        ) : null}
      </Container>
    </View>
  );
};

export default MemberListScreen;

const styles = StyleSheet.create({});
