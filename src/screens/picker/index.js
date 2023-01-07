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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../redux/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { setParentOrChild } from "../../redux/actions/auth";
export default function PickerScreen() {
  const navigation = useNavigation();
  const bg_image =
    "https://w0.peakpx.com/wallpaper/13/361/HD-wallpaper-watercolor-bright-colors-paint-splash-texture.jpg";

  return (
    <View style={{ flex: 1 }}>
      <Image style={StyleSheet.absoluteFillObject} source={{ uri: bg_image }} />
      <View style={styles.headerText}>
        <Text style={{ fontSize: 28, fontWeight: "500" }}>
          Are You A Parent Or A Child?
        </Text>
      </View>

      <View style={styles.buttonsContainers}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setParentOrChild("parent")}>
            <Feather
              name="sun"
              size={80}
              color="black"
              style={{ marginTop: 9, marginHorizontal: 10 }}
            />
            <Text
              style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}
            >
              Parent
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setParentOrChild("child");
              navigation.navigate("childHome");
            }}
          >
            <Feather
              name="sunrise"
              size={80}
              color="black"
              style={{ marginTop: 9, marginHorizontal: 10 }}
            />
            <Text
              style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}
            >
              Child
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
