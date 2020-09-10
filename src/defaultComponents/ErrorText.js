import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorText = ({ visible, children }) => {
  return (
    <View>
      <HelperText type="error" visible={visible}>
        {children}
      </HelperText>
    </View>
  );
};

export default ErrorText;
