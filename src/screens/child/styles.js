import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonsContainers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonContainer: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 20,
    margin: 30,
    marginTop: 20,
    padding: 10,
    backgroundOpacity: 0.1,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  headerText: {
    marginTop: height / 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  idContainer: { flexDirection: "row", margin: 10 },
  singleContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default styles;
