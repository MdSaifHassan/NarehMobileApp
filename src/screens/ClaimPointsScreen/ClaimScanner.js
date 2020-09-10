import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ActivityIndicator } from "react-native-paper";

const ClaimScanner = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //API call
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (data) {
      navigation.navigate("Claims", { data });
    }
  };

  if (hasPermission === null) {
    return <ActivityIndicator size="large" justifyContent="center" />;
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: 50,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )} */}
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ClaimScanner;
