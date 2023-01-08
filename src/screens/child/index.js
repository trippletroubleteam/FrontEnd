import React, { useState, useCallback, useEffect } from "react";

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
import { GiftedChat } from "react-native-gifted-chat";

import { getMyUid, getParent } from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
export default function ChildScreen() {
  const [userId, setUserid] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasParent, setHasParent] = useState(false);
  const [q, setQ] = useState(false);
  const [botResponse, setBotResponse] = useState("");
  const dispatch = useDispatch();
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyOWFiYzE5YmUyN2ZiNDE1MWFhNDMxZTk0ZmEzNjgwYWU0NThkYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1Nzc0MDkwNTA4Mzg2ODQ5NTQzIiwiZW1haWwiOiJ0YW51anNpcmlwdXJhcHVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJPWGNES3F4aTlKU2lSRDdqNmEwRUJRIiwiaWF0IjoxNjczMTQ0NzQ3LCJleHAiOjE2NzMxNDgzNDcsImp0aSI6IjZkYTcyOGJmMmUwNjZhZDM1ZjUzMmFmYWMwZmNhODMyNjcyMTZjODEifQ.SS8f261On5vHH7v1rD2JbuaUr0Jgx9OGy-WTL5UwyVO9XpEaUkUmXj5j6aRwDNslZe0y3-jphqJK2c5RG4EUYh2u0LKamkjpDRBo2V6Bcq7Zlc1T_KxzkaYMfTjTr6tHifI8wwkY8pOlrHyZh174454rsM1F01_UUG85Km9uY1ALmvmiafbGHnc1FOB2JqKWMcrBdWC-vcx00C2JyHVXJSjxig9ix3c8AUCv1NqTnXeelp6q4bEfEfDxE7huU6J7hiKejSj09jJn-vCQYaaSeVlB7R9Cv8Lm1NJNtnJ6adiYm4yiBndgA7RdSkxJp4CxjxP6tWpDTjYDpwHeIrZN4Q",
  };
  const getDataUsingGet = (userMessge) => {
    //GET request
    fetch(
      "https://us-central1-unison-3ae0e.cloudfunctions.net/olivia?message=" +
        userMessge,
      { headers }
    )
      .then((response) => response.text())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
        setBotResponse(JSON.stringify(responseJson));
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: 3,
          text: botResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Olivia",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ])
    );
  };
  const messageSent = (userMessge) => {
    console.log("In side message sent, trying to get a response");
    fetch(
      "https://us-central1-unison-3ae0e.cloudfunctions.net/olivia?message=" +
        userMessge,
      { headers }
    )
      .then((response) => response.json())
      .then((data) =>
        console.log(
          data +
            "that ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssswas the response "
        )
      );
  };

  useEffect(() => {
    console.log(messages);
    setMessages([
      {
        _id: 1,
        text: "In 5 scentences or more, tell me how your day has been.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Olivia",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  useEffect(() => {
    getParent().then(function (result) {
      setHasParent(result);
      console.log(hasParent + " QQQQQQQQQQQQ");
    });
  }, []);
  const handleReload = () => {
    getParent().then(function (result) {
      setHasParent(result);
      console.log(hasParent + " QQQQQQQQQQQQ");
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const userId = getMyUid();

      setUserid(userId);

      console.log(userId);
    };
    fetchData().catch(console.error);
  }, []);

  const bg_image =
    "https://w0.peakpx.com/wallpaper/223/131/HD-wallpaper-watercolor-bright-colors-paint-splash-texture-thumbnail.jpg";
  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text + " Those are the message they sent");
    getDataUsingGet(messages[0].text);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {!hasParent && (
        <View style={{ flex: 1 }}>
          <Image
            style={StyleSheet.absoluteFillObject}
            source={{ uri: bg_image }}
          />
          <View style={styles.headerText}>
            <Text style={{ fontSize: 30, fontWeight: "500" }}>
              Share this code with your parents to get started!
            </Text>
          </View>
          <View style={styles.idContainer}>
            <View style={styles.singleContainer}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setStringAsync(userId);
                }}
              >
                <Feather
                  name="clipboard"
                  size={30}
                  color="black"
                  style={{ marginTop: 9, marginHorizontal: 10 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.singleContainer}>
              <TouchableOpacity
                onPress={() => {
                  handleReload();
                }}
              >
                <Feather
                  name="refresh-cw"
                  size={30}
                  color="black"
                  style={{ marginTop: 9, marginHorizontal: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 30,
                  fontWeight: "500",
                  backgroundColor: "white",
                  borderRadius: 10,
                  borderColor: "black",
                  borderWidth: 1,
                }}
              >
                {userId.substring(1, 12)}...
              </Text>
            </View>
          </View>
        </View>
      )}

      {hasParent && (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      )}
    </View>
  );
}
