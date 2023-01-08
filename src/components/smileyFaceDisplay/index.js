import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles from "./styles";
import Svg, { Ellipse, ClipPath } from "react-native-svg";
import * as Clipboard from "expo-clipboard";
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
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
export default function SmileDisplay(smile) {
  const [smileCount, SetSmileCount] = useState("");
  const [color, SetColor] = useState("");
  const [greySmile, setGreySmile] = useState(false);
  var payments = [];

  useEffect(() => {
    SetSmileCount(smile.smile);

    if (smileCount % 1) {
      setGreySmile(true);
    }
    if (smileCount == 5) {
      SetColor("#90EE90");
    } else if (smileCount > 4) {
      SetColor("green");
    } else if (smileCount > 3) {
      SetColor("yellow");
    } else if (smileCount > 2) {
      SetColor("orange");
    } else if (smileCount > 1) {
      SetColor("red");
    }

    for (let i = 0; i < smileCount - 1; i++) {
      payments.push(
        <Feather
          name="smile"
          size={60}
          color={color}
          style={{ marginTop: 9, marginHorizontal: 10 }}
        />
      );
    }
    if (smileCount % 1) {
      payments.push(
        <Feather
          name="smile"
          size={60}
          color={"grey"}
          style={{ marginTop: 9, marginHorizontal: 10 }}
        />
      );
    }
    console.log(JSON.stringify(payments));
  }, []);
  return (
    <View>
      <Text>{payments}</Text>
    </View>
  );
}
