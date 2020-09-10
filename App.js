import "react-native-gesture-handler";
// import { registerRootComponent } from "expo";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import * as Font from "expo-font";
// import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";

import { AuthContext } from "./src/contexts/AuthContext";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import RootStackScreen from "./src/StackScreens/RootStackScreen";
import { Colors } from "./src/defaultComponents/Colors";
import { tokenApi } from "./src/api/nsl";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const getToken = async () => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    const deviceToken = await AsyncStorage.setItem(
      "deviceToken",
      expoPushToken
    );
    return deviceToken;
  };

  useEffect(() => {
    getToken();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken,
        userName,
        role,
        role_selected,
        deviceToken,
        totalEarnPoints;
      userToken = null;
      userName = "";
      role = [];
      role_selected = "";
      deviceToken = null;
      totalEarnPoints = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        deviceToken = await AsyncStorage.getItem("deviceToken");
        userName = await AsyncStorage.getItem("userName");
        role = await AsyncStorage.getItem("role");
        role_selected = await AsyncStorage.getItem("RoleSelected");
        totalEarnPoints = await AsyncStorage.getItem("earnPoints");
      } catch (e) {
        console.log(e.response.data);
      }
      // console.log('user token: ', userToken);
      dispatch({
        type: "RETRIEVE_TOKEN",
        token: userToken,
        userName,
        role,
        role_selected,
        deviceToken,
      });
      dispatch1({ type: "RETRIEVE_POINTS", payload: totalEarnPoints });
    }, 1000);
  }, []);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    permissions: {},
    role: [],
    member_type: "",
    role_selected: "",
    deviceToken: null,
  };
  const initialApiState = {
    isLoading: false,
    permissions: {},
    earnPoints: null,
    error: "",
  };

  const apiReducer = (prevState, action) => {
    switch (action.type) {
      case "LOADING":
        return {
          ...prevState,
          loading: true,
        };
      case "SUCCESS":
        return {
          ...prevState,
          loading: false,
          permissions: action.payload,
          error: "",
        };
      case "FAILURE":
        return {
          ...prevState,
          loading: false,
          permissions: {},
          error: action.payload,
        };
      case "EARN_POINTS":
        return {
          ...prevState,
          loading: false,
          earnPoints: action.payload,
          error: "",
        };
      case "RETRIEVE_POINTS":
        return {
          ...prevState,
          loading: false,
          earnPoints: action.payload,
          error: "",
        };
      default:
        return prevState;
    }
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          userName: action.userName,
          deviceToken: action.deviceToken,
          role: action.role,
          isLoading: false,
          role_selected: action.role_selected,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.name,
          userToken: action.token,
          isLoading: false,
          role: action.role,
          member_type: action.member_type,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
          member_type: "",
          role_selected: "",
          role: [],
        };
      case "ROLE":
        return {
          ...prevState,
          //userToken: action.token,
          userName: action.name,
          role: action.role,
          isLoading: false,
        };
      case "ROLE_SELECTED":
        return {
          ...prevState,
          userToken: action.token,
          role_selected: action.role_selected,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const [apiState, dispatch1] = React.useReducer(apiReducer, initialApiState);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data, "DATA");
        const userToken = data.token;
        const userName = data.name;
        const role = data.role;
        const member_type = data.member_type;
        console.log(userName);
        console.log(userToken);

        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userName", userName);
          await AsyncStorage.setItem("role", JSON.stringify(role));
          await AsyncStorage.setItem("member", member_type);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({
          type: "LOGIN",
          name: userName,
          token: userToken,
          role,
          member_type,
          // deviceToken: expoPushToken
        });
      },
      roleSelect: async (data) => {
        const userToken = data.token;
        console.log("1st Response data--roleSelect", data);
        const userName = data.name;
        const role = data.role;
        console.log("...roleSelectConsole", role);
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userName", userName);
          await AsyncStorage.setItem("role", JSON.stringify(role));
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "ROLE", role, name: userName });
      },
      roleSelect1: async (roleSelected) => {
        console.log(roleSelected, "---ROLESELECT1");
        const role_selection = roleSelected;
        const tokenResponse = await AsyncStorage.getItem("userToken");
        try {
          await AsyncStorage.setItem("RoleSelected", role_selection);
          //await AsyncStorage.setItem("userToken", tokenResponse);
        } catch (e) {
          console.log(e.response.data);
        }
        dispatch({
          type: "ROLE_SELECTED",
          role_selected: role_selection,
          token: tokenResponse,
        });
      },
      signOut: async () => {
        try {
          const res = await tokenApi();
          const response = await res.post("/v1/auth/logout");
          console.log(response.data.response);
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userName");
          await AsyncStorage.removeItem("role");
          await AsyncStorage.removeItem("RoleSelected");
          await AsyncStorage.removeItem("member");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );
  const apiContext = React.useMemo(
    () => ({
      request: () => {
        dispatch1({ type: "LOADING" });
      },
      success: async (data) => {
        console.log(data, "data_apiState");
        try {
          dispatch1({ type: "SUCCESS", payload: data });
        } catch (e) {
          console.log(e);
        }
      },
      failure: async (error) => {
        try {
          dispatch1({ type: "FAILURE", payload: error });
        } catch (e) {
          console.log(e);
        }
      },
      totalPoints: async (points) => {
        try {
          await AsyncStorage.setItem("earnPoints", points);
          dispatch1({ type: "EARN_POINTS", payload: points });
        } catch (e) {
          console.log(e);
        }
      },
    }),
    []
  );

  // if (loginState.isLoading) {
  // return (
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <ActivityIndicator size="large" />
  //   </View>
  // );
  // }

  let [fontsLoaded] = useFonts({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadImageContainer}>
        <Image
          style={styles.loadingImage}
          source={require("./assets/logo.png")}
        />
        <ActivityIndicator size="large" color={Colors.voilet1} />
      </View>
    );
  } else if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{ loginState, authContext, apiState, apiContext }}
      >
        <NavigationContainer>
          <RootStackScreen userToken={loginState.userToken} />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  loadImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingImage: {
    marginBottom: 10,
  },
});
