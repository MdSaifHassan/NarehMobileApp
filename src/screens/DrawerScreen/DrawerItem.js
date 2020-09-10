import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { Colors } from "../../defaultComponents/Colors";

const Item = ({ label, onPress, iconImage }) => {
  return (
    <View style={{}}>
      <DrawerItem
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 30 },
        }}
        icon={({ color, size }) => (
          <Image
            style={{ tintColor: color, width: 20, height: 20 }}
            source={iconImage ? iconImage : null}
          />
        )}
        label={label}
        onPress={onPress}
      />
    </View>
  );
};

export default Item;
