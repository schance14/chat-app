import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import the screens we want to navigate
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// initialize connection for Firestore
import Start from "./components/Start";
import Chat from "./components/Chat";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  //Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDqNpeQFV0rCjRC-dcOgNqvXS07u9gGx60",
    authDomain: "chat-app-f5880.firebaseapp.com",
    projectId: "chat-app-f5880",
    storageBucket: "chat-app-f5880.appspot.com",
    messagingSenderId: "527924331872",
    appId: "1:527924331872:web:0d123b55d3fb06062f8a05",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
