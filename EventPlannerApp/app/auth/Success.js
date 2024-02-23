import React from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Success = ({ isRegister, navigation }) => {

  const navigateEvents = () => {
    navigation.navigate("HomeMainScreen");
    const fetchData = async () => {
      const allData = await getAllEvent();
      await setData(allData);
    };
  };

  return (
    <SafeAreaView style={successStyles.safeArea}>
    <View style={successStyles.successContainer}>
      <FontAwesome
        name="check-circle"
        size={150}
        color="#256fbe"
        style={successStyles.icon}
      />
      <Text style={successStyles.successText}>
        {isRegister
          ? "Successfully Registered To Our App. Welcome!"
          : "Successfully Signed In!"}
      </Text>
      <TouchableOpacity style={successStyles.button} onPress={navigateEvents}>
        <Text style={successStyles.buttonText}>Explore Events</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Success;

export const successStyles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  successContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 200,
    marginBottom: 200 // Set your desired background color
  },
  icon: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#256fbe",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#256fbe",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});