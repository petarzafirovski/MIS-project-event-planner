import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleSignIn } from "../../services/Firebase";
import Success from "./Success";

const SignIn = ({ navigation, title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisibility] = React.useState({ name: "eye-off" });
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const ToggleVisibilty = () => {
    if (visible.name === "eye") {
      setVisibility({ name: "eye-off" });
    } else {
      setVisibility({ name: "eye" });
    }
  };

  const secureTextEntry = () => {
    if (visible.name === "eye") {
      return false;
    } else if (visible.name === "eye-off") {
      return true;
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignInClick = async () => {
    setSignInError("");
    if (email === "" || password === "") {
      setSignInError("Invalid Credentials");
    } else {
      try {
        const response = await handleSignIn(email, password);

        if (response) {
          setIsSignIn(true);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setSignInError(error.message);
        setIsSignIn(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            top: "40%",
            paddingVertical: 200,
          }}
        >
          <View>
            <ActivityIndicator size="large" color="#256fbe" />
          </View>
        </View>
      ) : !loading && isSignIn ? (
        <View>
          <Success isRegister={false} navigation={navigation}></Success>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text
              style={{
                fontSize: 40,
                //fontFamily: "QuicksandBold",
                color: "#256fbe",
              }}
            >
              Sign in
            </Text>
            <Image
              source={require("EventPlannerApp/assets/signin.jpg")}
              style={{
                height: 30,
                width: 50,
                top: 9,
                transform: [{ rotate: "-10deg" }],
              }}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.email}
              defaultValue={email}
              onChangeText={handleEmailChange}
              textContentType="emailAddress"
              placeholder="Email Address"
              placeholderTextColor="grey"
              returnKeyType="next"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.password}
                defaultValue={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter Password"
                placeholderTextColor="grey"
                returnKeyType="go"
                secureTextEntry={secureTextEntry()}
                textContentType="password"
                keyboardType="default"
                autoCorrect={false}
              />
              <Ionicons
                name={visible.name}
                size={24}
                color="#256fbe"
                style={styles.eyeContainer}
                onPress={ToggleVisibilty}
              />
            </View>
            <Pressable style={styles.forgotContainer}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </Pressable>
            <View>
              {signInError !== "" && (
                <Text style={styles.error}>{signInError}</Text>
              )}
            </View>
            <Pressable style={styles.button} onPress={handleSignInClick}>
              <Text
                style={{
                  //fontFamily: "QuicksandBold",
                  fontSize: 20,
                  color: "white"
                }}
              >
                SIGN IN
              </Text>
            </Pressable>
            <Pressable
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: "50%",
                height: 30,
              }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  //fontFamily: 'QuicksandBold',
                  fontSize: 16,
                  color: "#256fbe",
                }}
              >
                {" "}
                Do not have an account? Register
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    marginBottom: 40,
    top: -20,
  },
  form: {
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: -40,
  },
  email: {
    width: "100%",
    height: 60,
    backgroundColor: "#0ff0",
    borderRadius: 5,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    //fontFamily: "QuicksandBold",
    color: "#256fbe",
  },
  password: {
    width: "85%",
    height: 60,
    borderRadius: 5,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    //fontFamily: "QuicksandBold",
    color: "#256fbe",
  },

  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    backgroundColor: "#0ff0",
    borderRadius: 5,
    marginBottom: 35,
  },
  eyeContainer: {
    position: "absolute",
    right: 10,
    top: 20,
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#256fbe",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    padding: 10,
  },

  forgot: {
    //fontFamily: "QuicksandBold",
    color: "#256fbe",
    fontSize: 18,
  },

  forgotContainer: {
    top: -20,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  error: {
    color: "red",
    marginVertical: 8,
    fontSize: 15,
  },
});
