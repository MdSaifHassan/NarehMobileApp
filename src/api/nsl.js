import axios from "axios";
import { api_key } from "../config/apiKey";
import { AsyncStorage } from "react-native";

// const token = "a016249b-e914-45f2-bd5e-ba2c05ed8321";
// const token1 = "1d4fd382-f063-4577-a368-e3a277709e68";

// export const tokenStorage = async () => {
//   return await AsyncStorage.getItem("userToken").then((token) => {
//     console.log(token, "----token");
//     return token;
//   });
// };

export const tokenApi = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return axios.create({
    baseURL: "https://nslloyalty.elevatozrewards.co.in/wp-json/el",
    headers: {
      "Content-Type": "application/json",
      "api-key": api_key,
      token: token,
    },
  });
};

// export const nslTokenApi = axios.create({
//   baseURL: "https://nslloyalty.elevatozrewards.co.in/wp-json/el",
//   headers: {
//     "Content-Type": "application/json",
//     "api-key": api_key,
//   },
// });

// export const nslToken = axios.create({
//   baseURL: "https://nslloyalty.elevatozrewards.co.in/wp-json/el",
//   headers: {
//     "Content Type": "application/json",
//     token: tokenFetchFromStorage(),
//   },
// });

export const nslApi_key = axios.create({
  baseURL: "https://nslloyalty.elevatozrewards.co.in/wp-json/el",
  headers: {
    "Content-Type": "application/json",
    "api-key": api_key,
  },
});
