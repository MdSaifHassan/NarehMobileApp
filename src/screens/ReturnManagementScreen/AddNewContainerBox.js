import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ShadowCard } from "../../defaultComponents/ShadowCard";
import ClientTypeP from "./AddNewContainerPicker";

const AddNewContainerBox = () => {
  return (
    <View>
      <ShadowCard mTop={20}>
        <ClientTypeP />
      </ShadowCard>
    </View>
  );
};

export default AddNewContainerBox;

const styles = StyleSheet.create({});
