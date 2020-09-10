import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SectionList, FlatList } from "react-native";

import { Colors } from "../../defaultComponents/Colors";
import VioletDiv from "../../defaultComponents/VioletDiv";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { ShadowCard } from "../../defaultComponents/ShadowCard";
import Container from "../../defaultComponents/Container";
import { tokenApi } from "../../api/nsl";
import LoadingScreen from "../../defaultComponents/LoadingScreen";
import { set } from "react-native-reanimated";
import HTMLView from "react-native-htmlview";

const ExpandedList = () => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tokenApi().then((res) =>
      res
        .post("/v1/faq/getAll")
        .then((response) => {
          setLoading(false);
          setData(response.data.response.data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
    );
  }, []);

  let loadingScreen = null;
  if (loading) {
    loadingScreen = <LoadingScreen />;
  }

  const renderItem = ({ item, stylesheet }) => (
    <Container>
      <ShadowCard pVertical={0} mBot={16}>
        <ListItem
          subtitleStyle={{
            paddingTop: 12,
            fontSize: 11,
            fontFamily: "roboto-regular",
            fontWeight: "400",
            lineHeight: 18,
          }}
          titleStyle={{
            color: item.show ? Colors.voilet1 : Colors.grey2,
            fontSize: 13,
            fontFamily: "roboto-regular",
            fontWeight: "400",
            lineHeight: 22,
            marginLeft: -15,
          }}
          title={item.question}
          subtitle={null}
          onPress={() => pressHandler(item)}
          rightIcon={
            <View style={styles.rightIcon}>
              <MaterialIcons
                name={item.show ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color={Colors.voilet1}
              />
            </View>
          }
        />
        {item.show ? (
          <HTMLView
            // value={item.show ? item.answer : ""}r
            value={item.answer}
            stylesheet={styles}
          />
        ) : null}
      </ShadowCard>
    </Container>
  );

  const pressHandler = (item) => {
    item.show = !item.show;
    setExpanded(!expanded);
  };

  // if (data !== {}) {
  //   console.log(data);
  // }

  return (
    <>
      {loadingScreen}
      {data ? (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item.faq_id}
          renderItem={renderItem}
          stylesheet={styles.li}
          renderSectionHeader={({ section }) => (
            <View style={{ marginBottom: 15 }}>
              <VioletDiv> {section.title} </VioletDiv>
            </View>
          )}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  rightIcon: {
    backgroundColor: Colors.voilet3,
    alignSelf: "flex-start",
    borderRadius: 24 / 2,
    marginRight: -15,
  },
  li: {
    paddingTop: 12,
    fontSize: 11,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    lineHeight: 18,
  },
  ol: {
    paddingTop: 12,
    fontSize: 11,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    lineHeight: 18,
  },
  strong: {
    paddingTop: 12,
    fontSize: 11,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    lineHeight: 18,
  },
});

export default ExpandedList;

// import React, { useState } from "react";
// import { FlatList, StyleSheet, View } from "react-native";

// const list = [
//   {
//     name: "How do I sign up?",
//     subtitle:
//       "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
//     topic: "Topic 1 ",
//     show: false,
//   },
//   {
//     name: "How do I sign up?",
//     subtitle:
//       "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
//     show: false,
//   },
//   {
//     name: "How do I sign up?",
//     subtitle:
//       "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
//     show: false,
//   },
//   {
//     name: "How do I sign up?",
//     subtitle:
//       "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
//     show: false,
//   },
// ];

// export default ExpandList = () => {
//   //const [currIndex, setCurrIndex] = useState(null);
//   const [expanded, setExpanded] = useState(false);

//   const keyExtractor = (item, index) => index.toString();

//   const pressHandler = (index) => {
//     const newList = list;
//     newList[index]["show"] = !newList[index]["show"];
//     setExpanded(!expanded);
//   };

//   const renderItem = ({ item, index }) => (
//     <ShadowCard pVertical={0} mBot={16}>
//       <ListItem
//         subtitleStyle={{
//           paddingTop: 12,
//           //height: item.show ? 60 : 0,
//         }}
//         title={item.name}
//         subtitle={item.show ? item.subtitle : null}
//         onPress={() => pressHandler(index)}
//         rightIcon={
//           <View style={styles.rightIcon}>
//             <MaterialIcons
//               style={{}}
//               name={item.show ? "keyboard-arrow-up" : "keyboard-arrow-down"}
//               size={24}
//               color="black"
//             />
//           </View>
//         }
//       />
//     </ShadowCard>
//   );

//   return (
//     <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
//   );
// };

// const styles = StyleSheet.create({
//   rightIcon: {
//     backgroundColor: Colors.voilet3,
//     alignSelf: "flex-start",
//     borderRadius: 24 / 2,
//   },
// });
