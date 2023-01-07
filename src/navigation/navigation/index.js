import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AuthScreen from "../../screens/auth";
import { NavigationContainer } from "@react-navigation/native";

import { userAuthStateListener } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import PickerScreen from "../../screens/picker";
import childScreen from "../../screens/child";
export default function MainNavigator() {
  const Stack = createStackNavigator();
  const currentUserObj = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  const EmptyScreen = () => {
    return <View></View>;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PickerScreen"
          component={PickerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="childHome"
          component={childScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="parentHome"
          component={EmptyScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
