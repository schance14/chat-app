import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  return (
    <ImageBackground
      source={require("../img/background_image.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <Text style={styles.appTitle}>ChatMe</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <View style={styles.chooseColorBackground}>
          <Text style={styles.chooseColorText}>Choose Background Color:</Text>
          <View style={styles.chooseBackgroundContainer}>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#090C08" },
                backgroundColor === "#090C08" && styles.selectedColor,
              ]}
              onPress={() => setBackgroundColor("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#474056" },
                backgroundColor === "#474056" && styles.selectedColor,
              ]}
              onPress={() => setBackgroundColor("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#8A95A5" },
                backgroundColor === "#8A95A5" && styles.selectedColor,
              ]}
              onPress={() => setBackgroundColor("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseColor,
                { backgroundColor: "#B9C6AE" },
                backgroundColor === "#B9C6AE" && styles.selectedColor,
              ]}
              onPress={() => setBackgroundColor("#B9C6AE")}
            ></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          //navigation function to handle user name and color selection into the next screen
          onPress={() =>
            navigation.navigate("Chat", {
              name: name,
              backgroundColor: backgroundColor,
            })
          }
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "space-evenly",
    backgroundColor: "white",
    alignItems: "center",
    width: "88%",
    height: "44%",
    justifyContent: "space-evenly",
    flex: 1,
    marginBottom: 50,
  },
  textInput: {
    width: "88%",
    padding: 20,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginTop: 90,
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    alignSelf: "flex-start",
    textAlign: "left",
    marginBottom: 15,
  },
  chooseColorBackground: {
    width: "88%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  chooseBackgroundContainer: {
    flexDirection: "row",
  },
  chooseColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderColor: "white",
  },
  selectedColor: {
    borderColor: "gray",
    borderWidth: 3,
  },
  button: {
    width: "88%",
    backgroundColor: "#757083",
    alignItems: "center",
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
