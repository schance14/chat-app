import { useEffect, useState } from "react";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  orderBy,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, backgroundColor, id } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("chat", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // called when network connection is false
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("chat")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  useEffect(() => {
    navigation.setOptions({ title: name, color: backgroundColor });
  }, []);

  //used to change to color of the chat bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // checks if the currentMessage contains location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // component to view chat room
  return (
    <View
      style={[
        styles.outerView,
        { backgroundColor: route.params.backgroundColor },
      ]}
    >
      <GiftedChat
        style={styles.container}
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: id,
          name: name,
        }}
      />
      {/* to fix the keyboard from covering the message input field \*/}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerView: {
    flex: 1,
  },
});

export default Chat;
