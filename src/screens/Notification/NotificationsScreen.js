import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { Button } from "react-native-paper";
import BackHeader from "../../defaultComponents/BackHeader";
import NotificationComponent from "./NotificationComponent";
import { Colors } from "../../defaultComponents/Colors";

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <BackHeader title="Notifications" />
      <ScrollView style={{ backgroundColor: Colors.white, flex: 1 }}>
        <View style={styles.notificationContainer}>
          <NotificationComponent
            iconName="broken-image"
            title="Product Name"
            time="1h ago "
            paragraph="Product Discription - Lorem ipsum dolor sit amet, consectetur adipisicing elit"
          />
        </View>
      </ScrollView>
      {/* <Button
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Dashboard",
          })
        }
      >
        Home
      </Button> */}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  notificationContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.grey3,
    minHeight: 50,
    justifyContent: "flex-start",
  },
});
