import React, { useState, useEffect } from "react";
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

import { getMyUid, getParent } from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
export default function ChildScreen() {
  const [userId, setUserid] = useState("");
  const [hasParent, setHasParent] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const parentBool = getParent();
      console.log(getParent());
      const userId = getMyUid();
      console.log(parentBool);
      setUserid(userId);
      //   setHasParent(parentBool);
      console.log(hasParent);
      console.log(userId);
    };
    fetchData().catch(console.error);
  }, []);

  const bg_image =
    "https://w0.peakpx.com/wallpaper/223/131/HD-wallpaper-watercolor-bright-colors-paint-splash-texture-thumbnail.jpg";

  return (
    <View style={{ flex: 1 }}>
      {hasParent && (
        <View style={{ flex: 1 }}>
          <Image
            style={StyleSheet.absoluteFillObject}
            source={{ uri: bg_image }}
          />
        </View>
      )}
    </View>
  );
}
