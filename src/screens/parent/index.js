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
import SmileDisplay from "../../components/smileyFaceDisplay";
import * as Progress from "react-native-progress";
import Svg, { Ellipse, ClipPath } from "react-native-svg";
import * as Clipboard from "expo-clipboard";
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
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { createChildArray, setHasParent } from "../../redux/actions";
import { getMyUid, getParent, getMyChildren } from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
export default function ParentScreen() {
  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [childrenArray, setChildrenArray] = useState([]);

  const ITEM_SIZE = 20;
  const dispatch = useDispatch();
  useEffect(() => {
    getMyChildren().then(function (result) {
      if (result) {
        setChildrenArray(result);
      }

      console.log(childrenArray + "   qqqQQQQQQQQQQQQ");
    });
  }, []);

  const handleInviteUser = () => {
    createChildArray(childrenArray, userId, userName);
    setHasParent(userId);
  };

  const bg_image =
    "https://w0.peakpx.com/wallpaper/223/491/HD-wallpaper-watercolors-abstract-art-artistic-colorful-colors-paint-water.jpg";
  const Item = ({ item }) => (
    <View style={styles.flatList}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <TouchableOpacity style={styles.flatListButtonContainer} onPress={null}>
          <SmileDisplay smile={4.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderItem = ({ item }) => <Item item={item} />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 0.8,
          backgroundColor: "rgb(17, 51, 46)",
          borderRadius: 40,
        }}
      >
        <View
          style={{
            flex: 1,
            borderColor: "rgb(237, 229, 204)",
            borderRadius: 40,
            borderWidth: 1,
          }}
        >
          <FlatList
            keyExtractor={(item) => item.id}
            data={childrenArray}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];
              return (
                <Animated.View entering={SlideInLeft} style={styles.flatList}>
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <TouchableOpacity style={styles.flatListButtonContainer}>
                      <Text
                        style={{
                          fontSize: 25,
                          color: "rgb(17, 51, 46)",
                        }}
                      >
                        {console.log(item)}
                        {item.name}
                      </Text>
                      <Text style={styles.subHeader}></Text>
                      <Text style={styles.dubHeader}>{item.suggestion}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Text> </Text>
                        <Text style={styles.dubHeader}>Health Rating : </Text>
                        <Text style={styles.dubHeader}>{item[2]}</Text>
                        <Progress.Bar
                          progress={item[0]}
                          width={200}
                          height={20}
                          unfilledColor={"#90EE90"}
                          borderColor={"#000000"}
                          color={"#a83232"}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            }}
          />
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                flex: 1,
              }}
            >
              <Text style={styles.header}>Enter Code Here</Text>
              <View style={{ opacity: 1 }}>
                <TextInput
                  placeholderTextColor={"rgb(17, 51, 46)"}
                  placeholder={"User ID"}
                  style={styles.inputContainer}
                  onChangeText={(value) => setUserid(value)}
                />
              </View>
              <Text style={styles.header}>Enter Child's name Here</Text>
              <View style={{ opacity: 1 }}>
                <TextInput
                  placeholderTextColor={"rgb(17, 51, 46)"}
                  placeholder={"Username"}
                  style={styles.inputContainer}
                  onChangeText={(value) => setUserName(value)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleInviteUser();
                    handleModal;
                  }}
                >
                  <Text style={styles.circleText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleModal}>
                  <Text style={styles.circleText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <TouchableOpacity
        onPress={setIsModalVisible}
        style={{
          backgroundColor: "rgb(237, 229, 204)",
          borderRadius: 10,
          borderWidth: 4,
          padding: 15,
          marginHorizontal: 100,
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "800" }}>
          Add A Child
        </Text>
      </TouchableOpacity>
    </View>
  );
}
