import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: name, color: backgroundColor });
  }, []);

  // component to view user name and specified color
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text>Chat here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
