import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleSignout } from "../../services/firebase/firebaseConfig";
import firebase from "firebase";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>{firebase.auth().currentUser.email}</Text>

      <Pressable
        style={styles.button}
        onPress={() => {
         console.log('sign out')
        }}
      >
        <Text>sign out</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    top: 25,
    backgroundColor: "#11DDAA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 55,
    width: 55,
  },
});
