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
import { useDispatch, useSelector } from "react-redux";
import { updateUserName, setLoaded } from "../../redux/actions/auth";

import { useNavigation } from "@react-navigation/native";
import { login, register, createUser } from "../../redux/actions/auth";
import PickerScreen from "../picker";
export default function AuthScreen() {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const currentUserObj = useSelector((state) => state.auth);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };
  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };
  const handleButtonPress = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      handleLogin();
    } else {
      handleRegister();
    }
  };
  const handleLogin = () => {
    dispatch(login(emailAddress, password))
      .then(() => {
        console.log("login successful");
      })
      .catch((e) => {
        alert(e);
      });
    navigation.navigate("PickerScreen");
  };

  const handleRegister = () => {
    dispatch(register(emailAddress, password))
      .then(() => {
        console.log("register successful");
        console.log(" SRTTTTT " + JSON.stringify(currentUserObj));

        setLoaded();
      })
      .catch((e) => {
        alert(e);
      });
    navigation.navigate("PickerScreen");
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>

          <Image
            href={
              "https://images.unsplash.com/photo-1588979355313-6711a095465f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFwcHklMjBmYW1pbHl8ZW58MHx8MHx8&w=1000&q=80"
            }
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 180,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(17, 51, 46)",
                opacity: 0.8,
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: 30,
                borderWidth: 3,
                borderColor: "grey",
              }}
            >
              <Feather
                name="heart"
                size={60}
                color="rgb(237, 229, 204)"
                style={{ marginTop: 9, marginHorizontal: 10 }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  color: "white",
                  fontSize: 60,
                  fontStyle: "sans-serif",
                }}
              >
                Unison
              </Text>
            </View>
          </View>
        </Svg>
        <Animated.View
          style={[
            styles.closeButtonContainer,
            closeButtonContainerStyle,
            {
              borderTopColor: "rgb(237, 229, 204)",
              borderRightColor: "rgb(237, 229, 204)",
              borderLeftColor: "rgb(237, 229, 204)",
            },
          ]}
        >
          <Text
            style={{ color: "rgb(237, 229, 204)" }}
            onPress={() => (imagePosition.value = 1)}
          >
            X
          </Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <TouchableOpacity style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <TouchableOpacity style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgb(237, 229, 204)"
            style={styles.textInput}
            onChangeText={(text) => setEmailAddress(text)}
          />
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="rgb(237, 229, 204)"
              style={styles.textInput}
              onChangeText={(text) => setName(text)}
            />
          )}
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="rgb(237, 229, 204)"
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <TouchableOpacity
              onPress={() => {
                formButtonScale.value = withSequence(
                  withSpring(1.5),
                  withSpring(1)
                );
                handleButtonPress();
              }}
            >
              <Text style={styles.buttonText}>
                {isRegistering ? "REGISTER" : "LOG IN"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
