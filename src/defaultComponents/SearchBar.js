import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "./Colors";

const SearchBar = ({ onChangeText, value, onPress }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="rgba(2,2,29,0.42)"
        style={styles.search}
        onChangeText={onChangeText}
        value={value}
      />

      <TouchableOpacity style={styles.searchIcon} onPress={onPress}>
        <Feather name="search" size={16} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 35,
    //width: "66%",
  },
  search: {
    paddingVertical: 11,
    paddingLeft: 20,
    borderColor: Colors.grey3,
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    fontSize: 12,
    fontWeight: "400",
    flex: 1,
  },
  searchIcon: {
    backgroundColor: Colors.voilet1,
    width: 48,
    height: 35,
    paddingVertical: 10,
    paddingLeft: 17,
    paddingRight: 15,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: "center",
  },
});
