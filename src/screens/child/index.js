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
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import {
  getMyUid,
  getParent,
  setDepressionAndSuggestion,
} from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
export default function ChildScreen() {
  const [userId, setUserid] = useState("");
  const dialogflowConfig = {
    type: "xxxx",
    project_id: "xxxx",
    private_key_id: "xxxx",
    private_key: "xxxx",
    client_email: "xxxx",
    client_id: "xxxx",
    auth_uri: "xxxx",
    token_uri: "xxxx",
    auth_provider_x509_cert_url: "xxxx",
    client_x509_cert_url: "xxxx",
  };
  const botAvatar = require("../../../assets/image.png");
  const BOT = {
    _id: 2,
    name: "Olivia",
    avatar: botAvatar,
  };

  var id = 0;
  const [depressionPercent, setDepressionPercent] = useState();
  const [suggestion, setSuggestion] = useState();
  const [response, setResponse] = useState();
  const [messages, setMessages] = useState([]);
  const [hasParent, setHasParent] = useState(false);
  const [q, setQ] = useState(false);
  const [botResponse, setBotResponse] = useState();
  const dispatch = useDispatch();
  var eagle = "";
  const headers = {
    Authorization: "Bearer http://147.182.252.239:5000/olivia?message=",
  };
  const getDataUsingGet = async (userMessge) => {
    await fetch("http://147.182.252.239:5000/olivia?message=" + userMessge)
      .then((response) => response.json())
      .then((responseJson) => {
        id++;
        console.log(JSON.stringify(responseJson.olivia) + "QQQQQQQQQ");
        setBotResponse(responseJson);
        setSuggestion(JSON.stringify(responseJson.suggestion));
        setDepressionPercent(JSON.stringify(responseJson.depression_score));
        setResponse(JSON.stringify(responseJson.olivia));
        setResponse(JSON.stringify(responseJson.olivia));
        eagle = responseJson.olivia;
        setDepressionAndSuggestion(depressionPercent, suggestion);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: previousMessages.length + 1,
          text: eagle,
          createdAt: new Date().getTime() + 10000,
          user: BOT,
        },
      ])
    );
  };

  useEffect(() => {
    console.log(messages);
    setMessages([
      {
        _id: 1,
        text: "How has your day been?",
        createdAt: new Date().getTime(),
        user: BOT,
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
    id++;
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    console.log(messages[0].text + " Those are the message they sent");
    getDataUsingGet(messages[0].text);
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
                {userId.substring(0, 12)}...
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
