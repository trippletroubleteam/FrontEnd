import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AuthScreen from "../../screens/auth";
import { NavigationContainer } from "@react-navigation/native";

import { userAuthStateListener } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "../navigation";
import PickerScreen from "../../screens/picker";
export default function Route() {
  const Stack = createStackNavigator();
  const currentUserObj = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" FUCKKKKK " + currentUserObj.currentUser);
    dispatch(userAuthStateListener());
  }, []);

  const EmptyScreen = () => {
    return <View></View>;
  };
  if (!currentUserObj.loaded) {
    return <View></View>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj.currentUser == null ? (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Navigator"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
