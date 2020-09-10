import React from "react";

import { Divider } from "react-native-elements";
import { Colors } from "./Colors";

export const BottomDivider = ({ style }) => {
  return <Divider style={style} />;
};

export const VerticalDivider = () => {
  return <View style={{ borderLeftColor: Colors.voilet3 }}></View>;
};
