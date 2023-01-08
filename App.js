import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Route from "./src/navigation/login";
import React, { useState, useRef, useEffect } from "react";
import { Provider } from "react-redux";
import rootReducer from "./src/redux/reducers";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import * as Notifications from "expo-notifications";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBAvklA0kVwSCzTFatsbacj3DFLs66pVbw",
    authDomain: "unison-3ae0e.firebaseapp.com",
    projectId: "unison-3ae0e",
    storageBucket: "unison-3ae0e.appspot.com",
    messagingSenderId: "1015650977026",
    appId: "1:1015650977026:web:4e9cc08c3405c0b80c2e1b",
    measurementId: "G-N43F0EBXNQ",
  };
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      console.log("srt inside setNotificationHandler");
      return {
        shouldPlaySound: true,
        shouldShowAlert: true,
        shouldSetBadge: true,
      };
    },
  });
  const store = createStore(rootReducer, applyMiddleware(thunk));
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  /// qqqq
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
});
