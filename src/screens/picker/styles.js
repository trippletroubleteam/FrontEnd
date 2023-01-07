import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonsContainers: {
    flexDirection: "row",
  },
  buttonContainer: {
    backgroundColor: "grey",
  },
  headerText: {
    marginTop: height / 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
