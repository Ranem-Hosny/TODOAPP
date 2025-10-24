import { StyleSheet, Text, View } from "react-native";
import Home from "./src/Home";

export default function App() {
  return (
    <View style={style.container}>
      <Home />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
});
