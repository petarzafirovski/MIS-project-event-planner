import { StyleSheet, Text, View,  TouchableOpacity} from "react-native";
import HomeScreen from "./app/Home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Search from "./app/Search/Search";
import Categories from "./app/Categories/Categories";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SignIn from "./app/auth/SignIn";
import SignOut from "./app/auth/SignOut";

const Tab = createBottomTabNavigator();
export default function App() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [])

  const handleSignOut = async () => {
    console.log(user.uid)
    await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
      });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 5,
            left: 20,
            right: 20,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 70,
            ...styles.shadow,
          },

          tabBarShowLabel: false,
        }}
      >
         <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="home"
                  size={24}
                  color={focused ? "#256fbe" : "#748c94"}
                />
                <Text
                  style={{
                    color: focused ? "#256fbe" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        >
          {() => <HomeScreen user={user} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="search"
                  size={18}
                  color={focused ? "#256fbe" : "#748c94"}
                />
                <Text
                  style={{
                    color: focused ? "#256fbe" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Search
                </Text>
              </View>
            ),
          }}
        />
       <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="bars"
                  size={18}
                  color={focused ? "#256fbe" : "#748c94"}
                />
                <Text
                  style={{
                    color: focused ? "#256fbe" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Categories
                </Text>
              </View>
            ),
          }}
        />
     <Tab.Screen
  name="Sign"
  component={user ? SignOut : SignIn}
  options={{
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome
          name={user ? "sign-out" : "sign-in"}
          size={18}
          color={focused ? "#256fbe" : "#748c94"}
        />
        <Text
          style={{
            color: focused ? "#256fbe" : "#748c94",
            fontSize: 12,
          }}
        >
          {user ? "Sign Out" : "Sign In"}
        </Text>
      </View>
    ),
  }}
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();

      if (user) {
        handleSignOut();
        navigation.navigate("SignIn");
      } else {
        navigation.navigate("SignIn");
      }
    },
  })}
/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
