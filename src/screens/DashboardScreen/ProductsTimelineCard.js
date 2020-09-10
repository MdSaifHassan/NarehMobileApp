import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../../defaultComponents/Colors";

const ProductsTimelineCard = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          title: props.title,
          url: props.title,
          subject: props.info,
          message: props.title + " | | " + props.info,
          // message: props.info,
          // "React Native | A framework for building native apps using React",
        },
        {
          excludedActivityTypes: [
            // "com.apple.UIKit.activity.PostToWeibo",
            // "com.apple.UIKit.activity.Print",
            // "com.apple.UIKit.activity.CopyToPasteboard",
            // "com.apple.UIKit.activity.AssignToContact",
            // "com.apple.UIKit.activity.SaveToCameraRoll",
            // "com.apple.UIKit.activity.AddToReadingList",
            // "com.apple.UIKit.activity.PostToFlickr",
            // "com.apple.UIKit.activity.PostToVimeo",
            // "com.apple.UIKit.activity.PostToTencentWeibo",
            // "com.apple.UIKit.activity.AirDrop",
            // "com.apple.UIKit.activity.OpenInIBooks",
            // "com.apple.UIKit.activity.MarkupAsPDF",
            // "com.apple.reminders.RemindersEditorExtension",
            // "com.apple.mobilenotes.SharingExtension",
            // "com.apple.mobileslideshow.StreamShareService",
            // "com.linkedin.LinkedIn.ShareExtension",
            // "pinterest.ShareExtension",
            // "com.google.GooglePlus.ShareExtension",
            // "com.tumblr.tumblr.Share-With-Tumblr",
            // "net.whatsapp.WhatsApp.ShareExtension",
          ],
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // alert("shared with " + result.activityType);
          // shared with activity type of result.activityType
        } else {
          // alert("shared not sure");
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // alert("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.referTitleContainer}>
      <TouchableOpacity onPress={props.productPage} style={styles.subContainer}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={styles.iconImage}>
            {props.imageURL ? (
              <Image style={styles.smallImage} source={props.imageURL} />
            ) : (
              <MaterialIcons
                name="broken-image"
                size={24}
                color={Colors.voilet5}
              />
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}> {props.title} </Text>
            {/* <Text style={styles.title}>Product Name </Text> */}
            {/* <Text style={styles.time}> 1h ago </Text> */}
          </View>
        </View>

        <Text style={styles.paragraph}>{props.info}</Text>
        {/* <Text style={styles.paragraph}> Lorem ipsum </Text> */}
        <TouchableOpacity onPress={props.onPress}>
          <Image
            style={styles.image}
            // source={require("../../../assets/ios1x_NoPath8.png")}
            source={props.imageURL}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBox} onPress={onShare}>
          <Text style={styles.shareText}> Share</Text>
          <Image
            style={styles.shareIcon}
            source={require("../../../assets/ios2x_share.png")}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  referTitleContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
  },
  subContainer: {
    width: "91.46%",
    alignSelf: "center",
  },
  iconImage: {
    backgroundColor: Colors.grey7,
    borderRadius: 40 / 2,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  smallImage: {
    borderRadius: 40 / 2,
    height: 40,
    width: 40,
    resizeMode: "contain",
  },

  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 13,
    color: Colors.grey2,
    // marginBottom: 5,
  },
  time: {
    fontFamily: "roboto-medium",
    fontSize: 11,
    color: Colors.grey2,
    // marginBottom: 15,
  },
  paragraph: {
    fontFamily: "roboto-medium",
    fontSize: 12,
    color: Colors.grey2,
    marginBottom: 20,
  },
  image: {
    marginBottom: 10,
    height: 200,
    resizeMode: "contain",
    width: "100%",
  },
  shareBox: {
    flexDirection: "row",
  },
  shareText: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    color: Colors.voilet1,
  },
  shareIcon: {
    height: 14,
    width: 14,
    marginLeft: 5,
  },
});

export default ProductsTimelineCard;
