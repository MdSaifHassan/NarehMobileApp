import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BackHeader from "../../defaultComponents/BackHeader";
import Container from "../../defaultComponents/Container";
import {
  OrderCardHeader,
  OrderDetailsCard,
} from "./RedemptionHistoryComponents";
import { Colors } from "../../defaultComponents/Colors";

const RedemptionsDetails = () => {
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <BackHeader title="Order Details" />

      <Container>
        <OrderCardHeader
          orderId="Order Id"
          orderDate="29 May 2020"
          orderPoints={1160}
          quantity={3}
        />

        <OrderDetailsCard
          itemName="Item name 1"
          itemStatus="Item status"
          shipmentStatus="Dispatch"
          courierName="Xbee courier services ltd"
          awbNo="asdsd14513251321"
          dispatchDate="12 Jun 2020"
          deliveryDate="25 Jun 2020"
        />
        <OrderDetailsCard
          itemName="Item name 1"
          itemStatus="Item status"
          shipmentStatus="Dispatch"
          courierName="Xbee courier services ltd"
          awbNo="asdsd14513251321"
          dispatchDate="12 Jun 2020"
          deliveryDate="25 Jun 2020"
        />
        <OrderDetailsCard
          itemName="Item name 1"
          itemStatus="Item status"
          shipmentStatus="Dispatch"
          courierName="Xbee courier services ltd"
          awbNo="asdsd14513251321"
          dispatchDate="12 Jun 2020"
          deliveryDate="25 Jun 2020"
        />
      </Container>
    </View>
  );
};

export default RedemptionsDetails;

const styles = StyleSheet.create({});
