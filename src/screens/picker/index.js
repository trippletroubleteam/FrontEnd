null;
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
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
import { login, register, createUser } from "../../redux/actions/auth";
export default function PickerScreen() {
  return (
    <View>
      <View style={styles.headerText}>
        <Text style={{ fontSize: 30 }}>Are you a parent or a child?</Text>
      </View>

      <View style={styles.buttonsContainers}>
        <View style={buttonContainer}>
          <TouchableOpacity>
            <Feather
              name="heart"
              size={60}
              color="black"
              style={{ marginTop: 9, marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={buttonContainer}>
          <TouchableOpacity>
            <Feather
              name="heart"
              size={60}
              color="black"
              style={{ marginTop: 9, marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
