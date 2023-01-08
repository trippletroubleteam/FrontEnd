import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import Svg, { Ellipse, ClipPath } from "react-native-svg";

import { Feather } from "@expo/vector-icons";
import * as Device from "expo-device";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../redux/actions/auth";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  SlideInDown,
  SlidenInUp,
  SlideInLeft,
  SlideInRight,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  SlideOutUp,
  SlideOutDown,
  Transition,
} from "react-native-reanimated";
import {
  setParentOrChild,
  getUsersExpoToken,
  updateUsersExpoToken,
} from "../../redux/actions/auth";
import { useEffect } from "react";
export default function PickerScreen() {
  async function registerForPushNotificationsAsync() {
    console.log("GET AT OKEN");
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
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

    return token;
  }
  const navigation = useNavigation();
  const bg_image =
    "https://w0.peakpx.com/wallpaper/13/361/HD-wallpaper-watercolor-bright-colors-paint-splash-texture.jpg";

  useEffect(() => {
    let expoToken = getUsersExpoToken();
    console.log(expoToken + " wassssssssssssss");
    if (!expoToken) {
      // we need to get a fresh token and set it.
      registerForPushNotificationsAsync().then((token) => {
        updateUsersExpoToken(token);
      });
    }
  }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}
    >
      <View
        style={{
          flex: 0.9,
          borderWidth: 1,
          borderColor: "rgb(237, 229, 204)",
          borderRadius: 40,
          backgroundColor: "rgb(17, 51, 46)",
        }}
      >
        <View
          style={{
            backgroundColor: "rgb(17, 51, 46)",
            flex: 0.8,
            margin: 20,
            borderRadius: 40,
          }}
        >
          <Animated.View
            delay={500}
            entering={SlidenInUp}
            exiting={SlideOutDown}
            style={styles.headerText}
          >
            <Text
              style={{
                color: "rgb(237, 229, 204)",
                fontSize: 28,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Are You A Parent Or A Child?
            </Text>
          </Animated.View>
          <View style={styles.buttonsContainers}>
            <Animated.View
              entering={SlideInLeft}
              exiting={LightSpeedOutLeft}
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                onPress={() => {
                  setParentOrChild("parent");
                  navigation.navigate("parentHome");
                }}
              >
                <Feather
                  name="sun"
                  size={80}
                  color="rgb(237, 229, 204)"
                  style={{ marginTop: 9, marginHorizontal: 10 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "700",
                    color: "rgb(237, 229, 204)",
                  }}
                >
                  Parent
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={styles.buttonContainer}
              entering={SlideInRight}
              exiting={LightSpeedOutRight}
            >
              <TouchableOpacity
                onPress={() => {
                  setParentOrChild("child");
                  navigation.navigate("childHome");
                }}
              >
                <Feather
                  name="sunrise"
                  size={80}
                  color="rgb(237, 229, 204)"
                  style={{ marginTop: 9, marginHorizontal: 10 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "700",
                    color: "rgb(237, 229, 204)",
                  }}
                >
                  Child
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}
