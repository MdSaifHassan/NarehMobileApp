import React from "react";
import { StyleSheet, View } from "react-native";
import ExpandList from "./ExpandList";
import Header from "../../components/Header";
import { HeaderGradient } from "../../defaultComponents/HeaderGradient";

const FaqScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Header title="FAQ" />
      </View>

      <ExpandList />
    </>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
