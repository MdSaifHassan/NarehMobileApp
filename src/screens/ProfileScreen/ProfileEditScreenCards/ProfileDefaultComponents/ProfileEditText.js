import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import InputWithTtitle, {
  InputWithTtitleR,
  CalendarWithTitle,
} from "../../../../components/inputText/InputWithTitle";
import { Colors } from "../../../../defaultComponents/Colors";

// import MapmyIndiaGL from "mapmyindia-map-react-native-beta";
// import MapboxGL from "@mapbox/react-native-mapbox-gl";

// const apikey = Mapmyindia.setRestApiKey("94ztc3d8hfoobxlgh2sntt5wxhvcfe4n");
// const setclientid = Mapmyindia.setClientId("94ztc3d8hfoobxlgh2sntt5wxhvcfe4n");
// const setclientsecret = Mapmyindia.setClientSecret(
//   "ebEc8GH231e6KsxXJVilNqzOEzFALuKGxsa41s4br2308Iv1aPgkL0MNXwvY4B-oSLAuroIKubi-ju2n8olF3A8_4ls2SsuU"
// );

// MapmyIndiaGL.setMapSDKKey("MapSDKKey");
// MapmyIndiaGL.setRestAPIKey("94ztc3d8hfoobxlgh2sntt5wxhvcfe4n");
// MapmyIndiaGL.setAtlasClientId(
//   "sUd3WtLwoUXVfNEy_is8JIAPhftbrqctXaIT-2Z-YVhXUHRsUtIVo22FWOfjlWu4Xr35cKBP1ulHT2rTi-cX_g=="
// );
// MapmyIndiaGL.setAtlasClientSecret("94ztc3d8hfoobxlgh2sntt5wxhvcfe4n");
// MapmyIndiaGL.setAtlasGrantType("GrantType");

export const DividerColor = () => {
  return (
    <View
      style={{
        height: 6,
        width: "100%",
        backgroundColor: Colors.voilet3,
        marginVertical: 10,
      }}
    />
  );
};

export const RowConatiner = (props) => {
  return <View style={styles.rowContainer}>{props.children}</View>;
};

export const HalfConatiner = (props) => {
  return <View style={styles.halfContainer}>{props.children}</View>;
};

export const ErrorText = (props) => {
  return <Text style={styles.errorMsg}>{props.children}</Text>;
};

export const Type1Text = (props) => {
  return (
    <InputWithTtitle
      opacity={0.8}
      fontSize={12}
      fontFamily="roboto-regular"
      fontWeight={400}
      color={Colors.grey8}
      inputTitle={props.inputTitle}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      defaultValue={props.defaultValue}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
    />
  );
};
export const Type3Text = (props) => {
  return (
    <CalendarWithTitle
      opacity={0.8}
      fontSize={12}
      fontFamily="roboto-regular"
      fontWeight={400}
      color={Colors.grey8}
      inputTitle={props.inputTitle}
      inputDate={props.inputDate}
      calData={props.calData}
    />
  );
};

export const Type2Text = (props) => {
  return (
    <InputWithTtitleR
      opacity={0.8}
      fontSize={12}
      fontFamily="roboto-regular"
      fontWeight={400}
      color={Colors.grey8}
      inputTitle={props.inputTitle}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      defaultValue={props.defaultValue}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
    />
  );
};

export const MapContainer = () => {
  // const mapmyindia=
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.mapText}>
        Map{"  "}
        <Text style={styles.mapSubText}>(you can drag and drop the pin)</Text>
      </Text>
      <View style={styles.MapBox}>
        {/* <MapmyIndiaGL.MapView
        // style={{ flex: 1 }}
        // styleURL={MapboxGL.StyleURL.Street}
        >
          <MapmyIndiaGL.FillLayer
            ref={(c) => (this.camera = c)}
            zoomLevel={12}
            minZoomLevel={4}
            maxZoomLevel={22}
            centerCoordinate={[77.231409, 28.6162]}
            styleURL={MapboxGL.StyleURL.Street}
          />
        </MapmyIndiaGL.MapView> */}

        <Text style={{ color: Colors.white }}>Map Container</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  halfContainer: {
    width: "48%",
  },
  errorMsg: {
    fontSize: 10,
    color: Colors.red1,
    marginBottom: 10,
  },
  mapText: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    fontWeight: "500",
    color: Colors.voilet1,
    marginTop: 16,
  },
  mapSubText: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    color: Colors.grey8,
  },
  MapBox: {
    width: "100%",
    height: 145,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c1a6cd",
    marginBottom: 21,
    marginTop: 16,
  },
});
